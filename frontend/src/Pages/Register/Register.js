import { useState, useEffect } from 'react';
import { SignUp } from '../../utils/requests'
import { useNavigate } from 'react-router-dom';
import background from '../../assets/pictures/background.gif'


const initialData = {
    firstName:'', 
    lastName:'',
    email:'',
    password:'', 
    password_confirmation:'',
    role:'Student'
}

const Register  = () => {

    const navigate = useNavigate();

    const login = () => {
        navigate('/login');
    }

    const [signUp, setSignUp] = useState(initialData)
    const [errors, setErrors] = useState([])

    const handleSignUp = async () => {
        const response = await SignUp(signUp)
        if (response && response.data) {
            // If there's a successful response, handle it here 
            setSignUp(initialData);
            setErrors({});
            return window.location.href = '/';
        } else {
            // If there's an error, set the error messages
            // Ensure errors is always an object
            if (response && typeof response.message === 'string') {
                const errorMessages = response.message.split(', ');
                const errorObj = {};
                errorMessages.forEach(errMsg => {
                    let field;
                    if (errMsg.startsWith('Passwords must match')) {
                        field = 'password_confirmation';
                    } else {
                        field = errMsg.split(' ')[0].replace(/"/g, '');
                    }
                    errorObj[field] = errMsg;
                });
                setErrors(errorObj);
            } else {
                setErrors({ general: response });
            }
        }
    }
    
    
    
    return ( 
        <div className="flex flex-col justify-center items-center h-screen " style={{backgroundImage:`url(${background})`, backgroundSize: 'cover'}}>
    
        <form onSubmit={e => e.preventDefault()} className="p-6 rounded shadow-xl w-1/3">
    
            <label htmlFor="firstName" className="block text-white">First name</label>
            <input id="firstName" value={signUp.firstName || ''} onChange={(e) => {setSignUp({...signUp,firstName: e.target.value})}}
            type="text" className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"/>
            {errors.firstName && <span className="text-red-500 block mb-4">{errors.firstName}</span>}
    
            <label htmlFor="lastName" className="block text-white">Last name</label>
            <input id="lastName" value={signUp.lastName || ''} onChange={(e) => {setSignUp({...signUp,lastName: e.target.value})}}
            type="text" className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"/>
            {errors.lastName && <span className="text-red-500 block mb-4">{errors.lastName}</span>}
    
            <label htmlFor="role" className="block text-white">Role</label>
            <select id="role" value={signUp.role || ''} onChange={(e)=>{setSignUp({...signUp,role:e.target.value})}}
                className="outline-none rounded-md text-black mb-4 p-2 w-full">
                <option value="Student">
                    Student
                </option>
                <option value="Teacher">
                    Teacher
                </option>
            </select>
            {errors.role && <span className="text-red-500 block mb-4">{errors.role}</span>}
    
            <label htmlFor="email" className="block text-white">Email</label>
            <input id="email" value={signUp.email || ''} onChange={(e) => {setSignUp({...signUp,email: e.target.value})}}
            type="text" className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"/>
            {errors.email && <span className="text-red-500 block mb-4">{errors.email}</span>}
    
            <label htmlFor="password" className="block text-white">Password</label>
            <input id="password" type="password" value={signUp.password || ''} onChange={(e) => {setSignUp({...signUp,password: e.target.value})}} 
            className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"/>
            {errors.password && <span className="text-red-500 block mb-4">{errors.password}</span>}
    
            <label htmlFor="password_confirmation" className="block text-white">Confirm password</label>
            <input id="password_confirmation" type="password" value={signUp.password_confirmation || ''} onChange={(e) => {setSignUp({...signUp,password_confirmation: e.target.value})}}
            className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"/>
            {errors.password_confirmation && <span className="text-red-500 block mb-4">{errors.password_confirmation}</span>}
            
            <div className="flex justify-center mt-4">
            <button onClick={handleSignUp} className="bg-[#581c87] hover:bg-[#1c092a] text-white p-2 rounded-md">Sign Up</button>
            </div>
            <div className="text-white text-center mt-4">
                    <p>Already have an account?</p>
                    <button className="text-[#581c87] underline hover:text-[#1c092a] focus:outline-none focus:text-blue-700" onClick={login}>
                        Login
                    </button>
            </div>
        </form>
        </div>
    )
    
}

export default Register

