import { useEffect, useState } from 'react'
import Main from '../../Containers/Main/Main'
import { useSelector } from 'react-redux'
import { getAssignment} from '../../utils/requests'
import { useParams } from 'react-router-dom';
import CodeEditor from '../CodeEditor/CodeEditor';
import ReactMarkdown from 'react-markdown'
import style from '../../assets/css/markdown-styles.module.css'

const AssignmentTeacher = () => {

  const { user } = useSelector((state) => state.user)

  if(user.role !== "Teacher") window.location.href = '/';

    const { assignment_id } = useParams();

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
      <div className='flex w-full h-full gap-3'>
        <div className='h-full w-1/3 bg-[white]'> 
        <ReactMarkdown className={style.reactMarkDown} children={assignment.description}></ReactMarkdown>
        </div>
        <CodeEditor/>
      </div>
    </Main>
  );
};

export default AssignmentTeacher;
