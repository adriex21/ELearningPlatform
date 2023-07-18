import React, { useState } from 'react';
import { Login } from '../../utils/requests';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/pictures/background.gif'

const LoginPage = (props) => {

    const navigate = useNavigate();

    const signup = () => {
        
        navigate('/signup');
    }


    const initialData = {
        email: '',
        password: ''
    };

    const [loginData, setLoginData] = useState(initialData);
    const [errors, setErrors] = useState([]);

    const handleLogin = async () => {
        // Client-side validation
        if (loginData.email.trim() === '' || loginData.password.trim() === '') {
            setErrors(['Please enter your email and password']);
            return;
        }

        const response = await Login(loginData);
        console.log(response); // Check the response

        if (response && response.ok) {
            // If login is successful, handle it here
            setLoginData(initialData);
            setErrors([]);
            navigate('/dashboard');
        } else if (response && response.message) {
            // If there's an error, set the error message
            setErrors([response.message]);
        } else {
            // If there's an unknown error, set a generic error message
            setErrors(['Something went wrong']);
        }
    };

    return (

        <div className="flex flex-col justify-center items-center h-screen " style={{backgroundImage:`url(${background})`, backgroundSize: 'cover'}}>
            <form onSubmit={e => e.preventDefault()} className="p-6 rounded-md shadow-xl w-1/3">
                {errors.map(error => (
                    <span key={error} className="text-red-500 block mb-4">{error}</span>
                ))}

                <label htmlFor="email" className="text-white block">Email</label>
                <input
                    id="email"
                    value={loginData.email}
                    onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                    type="text"
                    className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"
                />

                <label htmlFor="password" className="block text-white">Password</label>
                <input
                    id="password"
                    value={loginData.password}
                    onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                    type="password"
                    className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"
                />

                <div className="flex justify-center mt-4">
                    <button onClick={handleLogin} className="bg-[#581c87] hover:bg-[#1c092a] text-white p-2 rounded-md" >Login</button>
                </div>

                <div className="text-white text-center mt-4">
                    <p>Don't have an account?</p>
                    <button className="text-[#581c87] underline hover:text-[#1c092a]" onClick={signup}>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>

    );
};

export default LoginPage;
