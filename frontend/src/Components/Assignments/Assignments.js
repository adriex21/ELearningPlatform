import { useSelector } from "react-redux";

const Assignments = ({ assignments }) => {

  const { user } = useSelector((state) => state.user);
    if (!assignments) return <span>Loading..</span>;
  
    return (
      <div>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <ul key={assignment._id}>
            
            <div  className="border border-gray-300 rounded-md p-4 mb-4 bg-gray-100" >

            {user?.role === "Teacher" ? (
              <a href={`/view/${assignment._id}`}> {assignment.title}</a>
            ) : (
              <a href={`/submission/${assignment._id}`}> {assignment.title}</a>
            )}
            
            </div>
        
            </ul>
          ))
        ) : (
          <div>No assignments yet ! </div>
        )}
      </div>
    );
  };

export default Assignments;