import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Header = (props) => {

    const { user } = useSelector((state) => state.user)
    const location = useLocation?.pathname

    function handleLogout() {
        localStorage.clear("token");
        window.location.href='/';
    }

    useEffect(() => {

    }, [])

    return(
        <div className="bg-[#171723] w-full h-20 flex items-center px-10 justify-between">

            <button className="text-white text-2xl font-bold "> <a href='/'>E-learning platform</a> </button>

            <div>
                {user ?
                    <div className="flex flex-row gap-4 items-center">
                        <span className="text-white">Hello, {user?.firstName} </span>
                        <button className="text-white rounded-md px-2 py-2 bg-[#581c87]" onClick={handleLogout}> Logout </button>
                    </div>
                    : 
                    <div className="flex flex-col gap-1 text-white text-md">
                        <span>You are not logged in </span>
                        <span><a className="font-bold" href="/login">login</a> or <a className="font-bold" href="/signup">signup</a></span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header