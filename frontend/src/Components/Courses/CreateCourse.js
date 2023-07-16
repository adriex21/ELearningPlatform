import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Main from "../../Containers/Main/Main";
import { createCourse } from "../../utils/requests";

const initialData = {
    name:'',
    description:''
}

const CreateCourse = () => {

    const {user} = useSelector((state) => state.user);
    const [create, setCreate] = useState(initialData);
    const [errors, setErrors] = useState([])

    const navigate = useNavigate();

    const cancel = () => {
        navigate("/courses")
    }

    const handleCreate = async() => {

        const response = await createCourse(create);
        if(response && response.data) {

            setCreate(initialData);
            setErrors({});
            return window.location.href='/courses';
        } else {
            // If there's an error, set the error messages
            // Ensure errors is always an object
            if (response && typeof response.message === 'string') {
                const errorMessages = response.message.split(', ');
                const errorObj = {};
                errorMessages.forEach(errMsg => {
                    let field;

                        field = errMsg.split(' ')[0].replace(/"/g, '');
                    
                    errorObj[field] = errMsg;
                });
                setErrors(errorObj);
            } else {
                setErrors({ general: response });
            }
        }
    }

    if (user.role !== 'Teacher') return window.location.href='/courses'

    return(

       <Main>
            <div className="relative flex flex-col justify-center items-center pt-5"> 
                <label htmlFor="name" className="font-bold text-2xl pb-5"> Name </label>
                <input id="name" value={create.name || ''} onChange={(e)=> {setCreate({...create, name:e.target.value})}}
                type="text" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" placeholder="i.e Name of the course"/> 
                {errors.name && <span className="text-red-500 block mb-4">{errors.name}</span>}
                <label htmlFor="description" className="font-bold text-2xl pb-5"> Description </label>
                <input id="description" value={create.description || ''} onChange={(e)=> {setCreate({...create, description:e.target.value})}}
                type="text" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" placeholder="i.e Information about the course"/>
                <div className="w-1/3"> 
                    <div className="flex justify-around"> 
                        <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded-md">Create</button>
                        <button onClick={cancel} className="bg-blue-500 text-white p-2 rounded-md">Cancel</button>
                    </div>
                </div>
            </div>

       </Main>
    )

}

export default CreateCourse;