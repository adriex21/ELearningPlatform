import { useEffect, useState } from 'react'
import Main from '../../Containers/Main/Main'
import { useSelector } from 'react-redux'
import { getAssignment} from '../../utils/requests'
import { useNavigate, useParams } from 'react-router-dom';
import CodeEditor from '../CodeEditor/CodeEditor';
import ReactMarkdown from 'react-markdown'
import style from '../../assets/css/markdown-styles.module.css'
import defaultCode from "../../assets/fixtures/defaultCode";

const AssignmentTeacher = () => {

  const { user } = useSelector((state) => state.user)
  const [ code, setCode ] = useState(defaultCode);

  if(user.role !== "Teacher") window.location.href = '/';

  const { assignment_id } = useParams();

  const navigate = useNavigate();
  const edit = () => {
    navigate(`/editAssignment/${assignment_id}`)
  }

  const viewSubmissions = () => [
    navigate(`/viewSubmissions/${assignment_id}`)
  ]

  const [assignment, setAssignment] = useState(null);

  useEffect(()=> {
        const getData = async () => {
            const res = await getAssignment( assignment_id );
            if(res) setAssignment(res?.assignment);
        }
        getData()
    },[])

  if (!assignment) return <span>Loading...</span>;

  return (
    <Main>
      <div className='flex w-full h-full'>
        <div className='relative h-full w-1/2 bg-[white]'> 
        <ReactMarkdown className={style.reactMarkDown} children={assignment.description}></ReactMarkdown>
        <div className='absolute bottom-5 left-5 flex flex-row gap-5'>
          <button className='bg-[#581c87] hover:bg-[#1c092a] text-white font-bold py-2 px-4 rounded-md' onClick={edit}> Edit </button>
          <button className='bg-[#581c87] hover:bg-[#1c092a] text-white font-bold py-2 px-4 rounded-md' onClick={viewSubmissions}> View submissions </button>
        </div>
        
        </div>
        <CodeEditor className="w-full"
          code={code}
          setCode={setCode}
        />
      </div>
    </Main>
  );
};

export default AssignmentTeacher;
