import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAssignment } from "../../utils/requests";
import Main from "../../Containers/Main/Main";


const initialData = {
    dueBy:'', 
    title:'',
    type:'homework',
    maxGrade:'', 
    description:'',
    timer:0,
}

const CreateAssignment = () => {
    

    const {user} = useSelector((state) => state.user);
    const [create ,setCreate] = useState(initialData);
    const [errors, setErrors] = useState([]);


    const navigate = useNavigate();

    const cancel = () => {
        navigate("/");
    }
    
    const handleCreate =  async () => {

        const response = await createAssignment(create);
        if(response && response.data) {

            setCreate(initialData);
            setErrors({});
            return window.location.href='/';
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

        <div>
                <Main>
                    <div className="relative flex flex-col justify-center items-center pt-5"> 
                    
                        <label htmlFor="title" className="font-bold text-2xl pb-5"> Title </label>
                        <input id="title" value={create.title || ''} onChange={(e) => {setCreate({...create,title: e.target.value})}}
                        type="text" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" placeholder="i.e First homework"/>
                        {errors.title && <span className="text-red-500 block mb-4">{errors.title}</span>}

                        <label htmlFor="description" className="relative font-bold text-2xl pb-5"> Description </label>
                        <textarea id="description" value={create.description || ''} onChange={(e) => {setCreate({...create,description: e.target.value})}}
                        type="text" className="outline-none border border-gray-400 caret-black-400 rounded-md mb-4 text-black w-1/3" placeholder="i.e Find the sum of two numbers "/>
                        {errors.description && <span className="text-red-500 block mb-4">{errors.description}</span>}

                        <label htmlFor="type" className="relative font-bold text-2xl pb-5"> Type </label>
                        <select id="type" value={create.type || ''} onChange={(e)=>{setCreate({...create,type:e.target.value})}}
                            className="border border-gray-400 rounded-md text-black mb-4 p-2 w-1/3">
                            <option value="homework">
                                Homework
                            </option>
                            <option value="evaluation">
                                Evaluation
                            </option>
                        </select>
                        {errors.type && <span className="text-red-500 block mb-4">{errors.type}</span>}

                        {create.type === "evaluation" && ( // Render the timer field only when the evaluation type is selected
                            <>
                            <label htmlFor="timer" className="relative font-bold text-2xl pb-5">Timer (minutes)</label>
                            <input id="timer" value={create.timer || ""} onChange={(e) => { setCreate({ ...create, timer: e.target.value })}} type="number"
                            className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" min="0"/>
                            </>
                        )}

                        <label htmlFor="maxGrade" className="relative font-bold text-2xl pb-5"> Points </label>
                        <input id="maxGrade" value={create.maxGrade || ''} onChange={(e) => {setCreate({...create,maxGrade: e.target.value})}}
                        type="number" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" min='0' max="100" />
                        {errors.maxGrade && <span className="text-red-500 block mb-4">{errors.maxGrade}</span>}

                        <label htmlFor="dueBy" className="relative font-bold text-2xl pb-5"> Deadline </label>
                        <input id="dueBy" value={create.dueBy || ''} onChange={(e) => {setCreate({...create,dueBy: e.target.value})}}
                        type="datetime-local" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" />
                        {errors.dueBy && <span className="text-red-500 block mb-4">{errors.dueBy}</span>}

                        <div className="w-1/3"> 
                            <div className="flex justify-around"> 
                                <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded-md">Create</button>
                                <button onClick={cancel} className="bg-blue-500 text-white p-2 rounded-md">Cancel</button>
                            </div>
                        </div>
                    </div>
                </Main>
        </div>
    )
}

export default CreateAssignment;