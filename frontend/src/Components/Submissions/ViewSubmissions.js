import { useSelector } from "react-redux";
import Main from "../../Containers/Main/Main"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubmissions } from "../../utils/requests";



const ViewSubmissions = () => {

    const { user } = useSelector((state) => state.user)
    const [data, setData] = useState();
    const {assignment_id} = useParams();

    useEffect(() => {
        const getData = async () => {
            const data = await getSubmissions(assignment_id);
            if(data) setData(data);
        }
        getData()
    }, [])

    return(

        <Main>
             <div className="pt-20 pl-20">
      {data?.length > 0 ? (
        <>
          {data.map((submission) => (
            <ul key={submission._id}>
              
              <a href={`/grade/${submission._id}`} className="relative border border-gray-300 rounded-md p-4 mb-4 bg-gray-100 flex flex-row gap-10">

                <div> {submission.submittedBy.firstName} {submission.submittedBy.lastName} </div>
                <div> {new Date(submission.submittedAt).toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"})} </div>
                {submission.grade  ? (<> Grade : {submission.grade} </>) : (<div> Not graded yet</div>)} 
                <div> </div>
                
              </a>
            </ul>
          ))}
        </>
      ) : (
        <div>No submissions yet!</div>
      )}
    </div>


        </Main>
    )
} 

export default ViewSubmissions