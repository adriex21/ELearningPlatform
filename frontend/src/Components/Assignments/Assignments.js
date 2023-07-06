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
    <div className="pt-20 pl-20">
      {assignments.length > 0 ? (
        <>
          {assignments.map((assignment) => (
            <ul key={assignment._id}>
              <div className="relative border border-gray-300 rounded-md p-4 mb-4 bg-gray-100">
                {user?.role === "Teacher" ? (
                  <a href={`/view/${assignment._id}`}>{assignment.title}</a>
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