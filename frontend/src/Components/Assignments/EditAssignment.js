import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editAssignment, getAssignment } from "../../utils/requests";
import Main from "../../Containers/Main/Main";

const EditAssignment = () => {

    const { assignment_id } = useParams();
    const {user} = useSelector((state) => state.user);
    const [edit ,setEdit] = useState({});
    const [errors, setErrors] = useState([]);

    const navigate= useNavigate();
    const cancel = () => {
        navigate(`/view/${assignment_id}`);
    }

    useEffect(()=> {
            const getData = async () => {
                const res = await getAssignment( assignment_id );
                if(res) {
                    setEdit(res.assignment);
                }
            }
            getData()
        },[])


    const handleEdit =  async () => {

        const response = await editAssignment(assignment_id, edit);
        if(response && response.data) {
            
            setErrors({});
            return window.location.href=`/view/${assignment_id}`;

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

    const formattedDueBy = edit.dueBy ? new Date(edit.dueBy).toISOString().slice(0, -8) : '';


    return (

        <Main>
                    <div className="relative flex flex-col justify-center items-center pt-5"> 
                    
                        <label htmlFor="title" className="font-bold text-2xl pb-5"> Title </label>
                        <input id="title" value={edit.title || ''} onChange={(e) => {setEdit({...edit, title: e.target.value})}}
                        type="text" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" placeholder="i.e First homework"/>
                        {errors.title && <span className="text-red-500 block mb-4">{errors.title}</span>}

                        <label htmlFor="description" className="relative font-bold text-2xl pb-5"> Description </label>
                        <textarea id="description" value={edit.description || ''} onChange={(e) => {setEdit({...edit,description: e.target.value})}}
                        type="text" className="outline-none border border-gray-400 caret-black-400 rounded-md mb-4 text-black w-1/3" placeholder="i.e Find the sum of two numbers "/>
                        {errors.description && <span className="text-red-500 block mb-4">{errors.description}</span>}

                        <label htmlFor="type" className="relative font-bold text-2xl pb-5"> Type </label>
                        <select id="type" value={edit.type || ''} onChange={(e)=>{setEdit({...edit,type:e.target.value})}}
                            className="border border-gray-400 rounded-md text-black mb-4 p-2 w-1/3">
                            <option value="homework">
                                Homework
                            </option>
                            <option value="evaluation">
                                Evaluation
                            </option>
                        </select>
                        {errors.type && <span className="text-red-500 block mb-4">{errors.type}</span>}

                        <label htmlFor="maxGrade" className="relative font-bold text-2xl pb-5"> Points </label>
                        <input id="maxGrade" value={edit.maxGrade || ''} onChange={(e) => {setEdit({...edit,maxGrade: e.target.value})}}
                        type="number" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" min='0' max="100" />
                        {errors.maxGrade && <span className="text-red-500 block mb-4">{errors.maxGrade}</span>}

                        <label htmlFor="dueBy" className="relative font-bold text-2xl pb-5"> Deadline </label>
                        <input id="dueBy" value={ formattedDueBy || ''} onChange={(e) => {setEdit({...edit,dueBy: e.target.value})}}
                        type="datetime-local" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" />
                        {errors.dueBy && <span className="text-red-500 block mb-4">{errors.dueBy}</span>}

                        <div className="w-1/3"> 
                            <div className="flex justify-around"> 
                                <button onClick={handleEdit} className="bg-[#581c87] hover:bg-[#1c092a]  text-white p-2 rounded-md">Done</button>
                                <button onClick={cancel} className="bg-[#581c87] hover:bg-[#1c092a]  text-white p-2 rounded-md">Cancel</button>
                            </div>
                        </div>
                    
                    </div>
                </Main>
    )
}

export default EditAssignment;