import { useSelector } from "react-redux";
import Main from "../../Containers/Main/Main"
import { useEffect, useState } from "react";
import { getCourses } from "../../utils/requests";


const Marks = () => {

    const {user} = useSelector((state)=> state.user)
    const [courses, setCourses] = useState([]);

    useEffect(()=> {
        const getData = async () => {
            const res = await getCourses();
            if(res) setCourses(res);
        }
        getData()
    },[])

    return(

        <Main>

            <div className="pt-10 pl-20 w-full pr-20 mb-5"> 
            <div className="text-3xl font-semibold font-sans mb-10"> Marks </div>
            {courses.length > 0 && (
                    <div className="flex flex-col gap-20">
                        {courses.sort(((a,b) => a.name < b.name ? 1 : -1)).map((course)=> (
                            <ul key={course._id}>
                                <div className="flex flex-col gap-5 border border-gray-300">
                                    <div className=" font-bold text-xl border border-gray-300 p-4 m-3"> ({course.year}) {course.name} </div>
                                    {user.testScores
                                        .map((testScore) => (
                                        <ul key={testScore._id}>
                                            {testScore.course === course._id ? (
                                            <a href={`/submission/${testScore.test?._id}`} className="flex flex-row gap-10 p-4 border border-gray-300 m-3">
                                                <div className="">{testScore.test?.title}</div>
                                                <div> Score obtained : {testScore.score} </div>
                                            </a>
                                            ):(<div className="p-4 m-3"> No assignments taken yet!</div>)}    
                                        </ul>
                                        ))}
                                </div>
                            </ul>
                        ))}
                    </div>
                )}
                
            </div>
            
            
        </Main>
        
    )
}

export default  Marks;