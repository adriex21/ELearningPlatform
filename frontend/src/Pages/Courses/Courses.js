import { useEffect, useState } from 'react'
import Main from '../../Containers/Main/Main'
import { useSelector } from 'react-redux'
import { getCourses } from '../../utils/requests'
import { useNavigate } from 'react-router-dom'

const Courses = (props) => {

    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    useEffect(()=> {
        const getData = async () => {
            const res = await getCourses();
            if(res) setCourses(res);
        }
        getData()
    },[])

    const createCourse = () => {
        navigate('/createCourse')
    }

    return( 

        <Main>

            <div className="pt-20 pl-20 w-fit"> 
            {user.role === "Teacher" && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-10 py-2 px-4 rounded-full"
                    onClick={createCourse}> Create course </button>
            )}
                {courses.length > 0 ? (
                    <div className="flex flex-row gap-10">
                        {courses.sort(((a,b) => a.name < b.name ? 1 : -1)).map((courses)=> (
                            <ul key={courses._id}>
                                <a href={`/viewCourse/${courses._id}`} className="relative border border-gray-300 rounded-md p-4 mb-4 bg-gray-100 flex flex-col">
                                    <p> COURSE : ({courses.year}) {courses.name} </p>
                                    <p> Instructor : {courses.instructor.firstName} {courses.instructor.lastName} </p>
                                </a>
                            </ul>
                        ))}
                    </div>
                )  : (
                    <div> No courses yet !</div>
                )}
                
            </div>
            
        </Main>
        
    )
}

export default Courses