import { useNavigate, useParams } from "react-router-dom";
import Main from "../../Containers/Main/Main";
import { useSelector } from "react-redux";
import { useState } from "react";
import { createModule } from "../../utils/requests";


const initialData = {

    title:"",
    content:""
}

const CreateModule = () => {

    const {user} = useSelector((state) => state.user);
    const [create ,setCreate] = useState(initialData);
    const [errors, setErrors] = useState([]);
    const {course_id} = useParams();

    const navigate = useNavigate();

    const cancel = () => {
        navigate(`/viewCourse/${course_id}`);
    }

    const handleCreate =  async () => {

        const response = await createModule(course_id, create);
        if(response && response.data) {

            setCreate(initialData);
            setErrors({});
            return window.location.href=`/viewCourse/${course_id}`;
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

    if(user.role !== "Teacher") return window.location.ref = "/"

    return(

        <Main>
            <div className="relative flex flex-col justify-center items-center pt-5">
                <label htmlFor="title" className="font-bold text-2xl pb-5"> Title </label>
                <input id="title" value={create.title || ''} onChange={(e) => {setCreate({...create,title: e.target.value})}}
                type="text" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" placeholder="i.e First lecture"/>
                {errors.title && <span className="text-red-500 block mb-4">{errors.title}</span>}

                <label htmlFor="description" className="relative font-bold text-2xl pb-5"> Description </label>
                <textarea id="description" value={create.description || ''} onChange={(e) => {setCreate({...create,description: e.target.value})}}
                type="text" className="outline-none border border-gray-400 caret-black-400 rounded-md p-2 mb-4 text-black w-1/3" placeholder="i.e In this module we will learn about.."/>
                {errors.description && <span className="text-red-500 block mb-4">{errors.description}</span>}

                <label htmlFor="content" className="relative font-bold text-2xl pb-5"> Content </label>
                <textarea id="content" value={create.content || ''} onChange={(e) => {setCreate({...create,content: e.target.value})}}
                type="text" className="outline-none border border-gray-400 caret-black-400 rounded-md p-2 mb-4 text-black w-1/3" placeholder="i.e Content of the lecture"/>
                {errors.content && <span className="text-red-500 block mb-4">{errors.content}</span>}

                <div className="w-1/3"> 
                    <div className="flex justify-around"> 
                        <button onClick={handleCreate} className="bg-[#581c87] hover:bg-[#1c092a] text-white p-2 rounded-md">Create</button>
                        <button onClick={cancel} className="bg-[#581c87] hover:bg-[#1c092a] text-white p-2 rounded-md">Cancel</button>
                    </div>
                </div>


            </div>

        </Main>
    )


}



export default CreateModule;