import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Assignments = ({ assignments }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const createAssignment = () => {
    navigate('/createAssignment');
  }

  if (!assignments) return <span>Loading..</span>;

  return (
    <div className="pt-20 pl-20 w-fit">
      {assignments.length > 0 ? (
        <>
          {assignments.map((assignment) => (
            <ul key={assignment._id}>
              
              <div className="relative border border-gray-300 rounded-md p-4 mb-4 bg-gray-100 ">
                {user?.role === "Teacher" ? (
                  <div className="flex flex-col gap-3">
                    <a href={`/view/${assignment._id}`}>{assignment.title}</a>
                    {assignment.status === 'open' ? (<div className="bg-green-500 w-fit text-white font-bold px-3 rounded-md"> {assignment.status} </div>)
                     : (<div className="bg-red-500 w-fit text-white font-bold px-3 rounded-md">{assignment.status}</div>)}
                     <div> Added : {new Date(assignment.createdAt).toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"})}</div>
                     <div> Due date : {new Date(assignment.dueBy).toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"})}</div>

                  </div>
                  
                ) : (
                  <a href={`/submission/${assignment._id}`}>{assignment.title}</a>
                )}
              </div>
            </ul>
          ))}
          {user?.role === "Teacher" && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={createAssignment}>Create new assignment</button>
          )}
        </>
      ) : (
        <div>No assignments yet!</div>
      )}
    </div>
  );
};

export default Assignments;