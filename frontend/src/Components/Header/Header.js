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
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#171723] h-screen w-[200px] flex-col px-10 justify-between">

            <button className="mt-10 text-white text-2xl font-bold items-center"> <a href='/'>E-learning platform</a> </button>

            <div className="mt-20 flex flex-col gap-4 items-center text-white">
                <a href="/viewProfile" className="font-semibold">{user?.firstName} {user?.lastName} </a>
                <a href="/assignments" > Assignments </a>
                <a href="/courses"> Courses </a>
                {user.role === 'Student'&& (
                    <a href="/grades"> Marks </a>
                )}
                
                <button className="text-white rounded-md px-2 py-2 bg-[#581c87] hover:bg-[#1c092a]" onClick={handleLogout}> Sign out </button>
            </div>
                    
        </div>
    )
}

export default Header