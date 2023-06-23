import { useEffect, useState } from 'react'
import Main from '../../Containers/Main/Main'
import { useSelector } from 'react-redux'
import { getAssignment} from '../../utils/requests'
import { useNavigate, useParams } from 'react-router-dom';
import CodeEditor from '../CodeEditor/CodeEditor';
import ReactMarkdown from 'react-markdown'
import style from '../../assets/css/markdown-styles.module.css'

const AssignmentTeacher = () => {

  const { user } = useSelector((state) => state.user)

  if(user.role !== "Teacher") window.location.href = '/';

  const { assignment_id } = useParams();

  const navigate = useNavigate();
  const edit = () => {
    navigate(`/editAssignment/${assignment_id}`)
  }

  const [assignment, setAssignment] = useState(null);

  useEffect(()=> {
        const getData = async () => {
            const res = await getAssignment( assignment_id );
            if(res) setAssignment(res);
        }
        getData()
    },[])

  if (!assignment) return <span>Loading...</span>;

  return (
    <Main>
      <div className='flex w-full h-full'>
        <div className='h-full w-1/3 bg-[white]'> 
        <ReactMarkdown className={style.reactMarkDown} children={assignment.description}></ReactMarkdown>
        <button className='absolute bottom-5 left-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={edit}> Edit </button>
        </div>
        <CodeEditor/>
      </div>
    </Main>
  );
};

export default AssignmentTeacher;
