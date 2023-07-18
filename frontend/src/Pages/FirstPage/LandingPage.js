
import {useNavigate} from 'react-router-dom';
import background from '../../assets/pictures/background.gif'

const LandingPage = () => {

    const navigate = useNavigate();

    const signup = () => {
        
        navigate('/signup');
    }

    const login = () => {

        navigate('/login');
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-screen" style={{backgroundImage:`url(${background})`, backgroundSize: 'cover'}}>
            <h1 className="text-4xl text-white font-bold mb-4">Welcome to Our E-Learning Platform</h1>
            <p className="mb-8 text-white text-lg">Join us to start your learning journey.</p>
            <div className="flex gap-4">
                <button className="py-2 px-4 bg-[#581c87] hover:bg-[#1c092a] text-white rounded-md" onClick={signup}>Sign Up</button>
                <button className="py-2 px-4 bg-[#581c87] hover:bg-[#1c092a] text-white rounded-md" onClick={login}>Login</button>
            </div>
        </div>
    );
}

export default LandingPage