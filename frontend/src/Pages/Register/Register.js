import { useState, useEffect } from 'react';
import { SignUp } from '../../utils/requests'

const initialData = {
    firstName:'', 
    lastName:'',
    email:'',
    password:'', 
    password_confirmation:'',
    role:''
}

const Register  = () => {

    const [signUp, setSignUp] = useState(initialData)
    const [errors, setErrors] = useState([])

    const handleSignUp = async () => {
        const response = await SignUp(signUp)
        return setErrors(['Something went wrong'])
    }
    
    return ( 
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">

        <form onSubmit={e => e.preventDefault()} className="bg-blue-200 p-6 rounded shadow-md w-1/3">

        {errors.map(error => (
            <span key={error} className="text-red-500 block mb-4">{error}</span>
        ))}

            <label htmlFor="firstName" className="block text-gray-700">First name</label>
            <input id="firstName" value={signUp.firstName || ''} onChange={(e) => {setSignUp({...signUp,firstName: e.target.value})}}
            type="text" className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"/>

            <label htmlFor="lastName" className="block text-gray-700"> Last name</label>
            <input id="lastName" value={signUp.lastName || ''} onChange={(e) => {setSignUp({...signUp,lastName: e.target.value})}}
            type="text" className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"/>

            <label htmlFor="role" className="block text-gray-700"> Role </label>
            <select id="role" value={signUp.role || ''} onChange={(e)=>{setSignUp({...signUp,role:e.target.value})}}
                className="outline-none rounded-md text-black mb-4 p-2 w-full">
                <option value="Student">
                    Student
                </option>
                <option value="Teacher">
                    Teacher
                </option>
            </select>

            <label htmlFor="email" className="block text-gray-700"> Email </label>
            <input id="email" value={signUp.email || ''} onChange={(e) => {setSignUp({...signUp,email: e.target.value})}}
            type="text" className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"/>

            <label htmlFor="password" className="block text-gray-700"> Password </label>
            <input id="password" type="password" value={signUp.password || ''} onChange={(e) => {setSignUp({...signUp,password: e.target.value})}} 
            className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"/>

            <label htmlFor="password_confirmation" className="block text-gray-700"> Confirm password </label>
            <input id="password_confirmation" type="password" value={signUp.password_confirmation || ''} onChange={(e) => {setSignUp({...signUp,password_confirmation: e.target.value})}}
            className="outline-none h-8 rounded-md text-black mb-4 p-2 w-full"/>
            
            <div className="flex justify-center mt-4">
            <button onClick={handleSignUp} className="bg-blue-500 text-white p-2 rounded-md">Sign Up</button>
            </div>
        </form>
        </div>
    )
}

export default Register

