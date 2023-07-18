import { useEffect, useState } from 'react';
import Main from '../../Containers/Main/Main';
import { useSelector } from 'react-redux';
import { getAssignments, getCourses } from '../../utils/requests';
import Assignments from '../../Components/Assignments/Assignments';

const AssignmentsPage = () => {
  const { user } = useSelector((state) => state.user);
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseAssignments, setCourseAssignments] = useState({});

  const getData = async () => {
    const res = await getAssignments();
    if (res) {
        console.log(res)
        setAssignments(res);
        const assignmentsByCourse = {};
        res.forEach((assignment) => {
            const courseId = assignment.course?._id;
            if (assignmentsByCourse[courseId]) {
            assignmentsByCourse[courseId] = [...assignmentsByCourse[courseId], assignment];
            } else {
            assignmentsByCourse[courseId] = [assignment];
            }
        });
        setCourseAssignments(assignmentsByCourse);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const coursesRes = await getCourses();
      if (coursesRes) {
        setCourses(coursesRes);
        getData();
      }
    };
    fetchData();
  }, []);

  return (
    <Main>
      <div className='pl-20 pt-10'>
        <div className='text-3xl font-semibold font-sans mb-10'>
                Assignments 
        </div>

        <div className='relative flex flex-col gap-10 mb-5 bg-white'>
          {courses
            .sort((a, b) => (a.name < b.name ? 1 : -1))
            .map((course) => (
              <div key={course._id} className='flex flex-col border border-gray-300'>
                <div className='font-bold text-xl border border-gray-300 p-4 m-3'>
                  ({course.year}) {course.name}
                </div>
                {courseAssignments[course._id]?.length > 0 ? (
                  courseAssignments[course._id].map((assignment) => (
                    <ul key={assignment._id}>
                        <div className='m-3'>
                            <Assignments assignments={[assignment]} />
                        </div>
                      
                    </ul>
                  ))
                ) : (
                  <div className='m-3'>No assignments for this course</div>
                )}
              </div>
            ))}
        </div>
      </div>
    </Main>
  );
};

export default AssignmentsPage;
