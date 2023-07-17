import { useSelector } from "react-redux"
import Main from "../../Containers/Main/Main"
import { Link, useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { getAssignments, getCourse } from "../../utils/requests"
import Assignments from "../Assignments/Assignments"

const ViewCourse = () => {

    
    const {user} = useSelector((state)=> state.user)
    const {course_id} = useParams();
    const [course, setCourse] = useState();
    const [assignments, setAssigments] = useState([]);

    useEffect(()=> {
        const getData = async () => {
            const res = await getAssignments();
            if(res) {

                const filteredAssignments = res.filter(
                    (assignment) => assignment.course?._id === course_id
                  );
                setAssigments(filteredAssignments);

            }
        }
        getData()
    },[])


    const navigate = useNavigate();

    const createModule = () => {
        navigate(`/createModule/${course_id}`)
    }

    const createAssignment = () => {
        navigate(`/createAssignment/${course_id}`)
    }

    useEffect(()=> {
        const getData = async () => {
            const res = await getCourse(course_id);
            if(res) setCourse(res);
        }
        getData()
    })

    const goToModule = (module) => {

        navigate('/viewModule', {state:{module:module}})

    }

    return (

        <Main>
            
            <div className="mt-10 ml-20 text-3xl font-semibold font-sans"> COURSE: ({course?.year}) {course?.name} </div>
            <div className="border border-gray-300 rounded-md p-4 mb-4 mt-10 ml-20 mr-20">
            {user.role === "Teacher" && (
                <div className="flex flex-row gap-10">
                <button className="bg-[#581c87] hover:bg-[#1c092a] text-white font-bold mb-10 py-2 px-4 rounded-md"
                    onClick={createModule}> Create module </button>
                <button className="bg-[#581c87] hover:bg-[#1c092a] text-white font-bold mb-10 py-2 px-4 rounded-md"
                    onClick={createAssignment}> Create assignment </button>
                </div>
                    
            )}

            <div className="mb-4 bold text-2xl font-semibold p-4 border border-gray-300 "> Course content </div>
                
                {course?.modules.map((module)=> (
                    <div className="border border-gray-300 p-4 mb-5">
                        <ul key={module._id}>
                        <button onClick={()=>goToModule(module)} className="font-semibold text-xl mb-3"> {module.title}</button>
                        <p> {module.description}</p>
                    </ul>

                    </div>
                    
                ))}
            <Assignments assignments={assignments}></Assignments>

            </div>
        
        </Main>
    )

}

export default ViewCourse