import { useSelector } from 'react-redux'
import { useEffect } from 'react';

const Header = (props) => {

    const { user } = useSelector((state) => state.user)

    function handleLogout() {
        localStorage.clear("token");
        window.location.href='/';
    }

    useEffect(() => {

    }, [])

    return(
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#171723] w-full h-20 flex items-center px-10 justify-between">

            <button className="text-white text-2xl font-bold "> <a href='/'>E-learning platform</a> </button>

            <div className="flex flex-row gap-4 items-center">
                <span className="text-white">{user?.firstName} {user?.lastName} </span>
                <button className="text-white rounded-md px-2 py-2 bg-[#581c87]" onClick={handleLogout}> Logout </button>
            </div>
                    
        </div>
    )
}

export default Header