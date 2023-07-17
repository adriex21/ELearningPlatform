import { useSelector } from "react-redux";
import Main from "../../Containers/Main/Main";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {getSubmission, gradeSubmission} from "../../utils/requests";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CodeEditor from "../CodeEditor/CodeEditor";
import style from '../../assets/css/markdown-styles.module.css'
import defaultCode from "../../assets/fixtures/defaultCode";

const GradeSubmission = () => {

    const { user } = useSelector((state) => state.user);
    const { submission_id } = useParams();
    const [ data, setData ] = useState();
    const [ code, setCode ] = useState(defaultCode);
    const [gradingFormOpen, setGradingFormOpen] = useState(false);
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const cancel = () => {
        setGradingFormOpen(false);
    }

    useEffect(() => {
        const getData = async () => {
            const data = await getSubmission(submission_id);
            if(data) setData(data);
        }
        getData()
    }, [])

    const grade = async () => {
        setGradingFormOpen(true);
    };

    const handleGrade = async () => {

        const response = await gradeSubmission(submission_id, data);

        if(response.error) {
            setErrors(response.error)
        } else {
            setGradingFormOpen(false);
            setErrors(''); 
            navigate(`/viewSubmissions/${data.submittedFor._id}`)
        }
    }

    return (
        <Main> 
            <div className='flex w-full h-full'>
                <div className='relative h-full w-1/2 bg-[white]'> 
                    <ReactMarkdown className={style.reactMarkDown} children={data?.submittedFor.description}></ReactMarkdown>
                        <button onClick={grade} className="absolute bottom-5 left-5 bg-[#581c87] hover:bg-[#1c092a] text-white font-bold py-2 px-4 rounded-md">
                        Grade submission
                        </button>
                </div>
                <CodeEditor code={data?.answer} setCode={setCode}/>
                
            </div>
            {gradingFormOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex flex-col items-center justify-center bg-black bg-opacity-80">
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center"> 
                        <label htmlFor="feedback" className="font-bold text-2xl pb-5 text-white">Feedback</label>
                        <textarea id="feedback" value={data.feedback || ''} onChange={(e) => {setData({...data, feedback: e.target.value})}}
                        type="text" className="outline-none border border-gray-400 caret-black-400 rounded-md mb-4 text-black w-1/3" placeholder="i.e Feedback"/>
                        <label htmlFor="grade" className="font-bold text-2xl pb-5 text-white">Grade</label>
                        <input id="grade" value={data.grade || ''} onChange={(e) => {setData({...data,grade: e.target.value})}}
                        type="number" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3" min='0' max="100" />
                        {errors && <span className="text-red-500 block mb-4">{errors}</span>}
                        <div className="flex flex-row justify-center gap-5 "> 
                            <button onClick={handleGrade} className="bg-[#581c87] hover:bg-[#1c092a] text-white p-2 rounded-md">Done</button>
                            <button onClick={cancel} className="bg-[#581c87] hover:bg-[#1c092a] text-white p-2 rounded-md">Cancel</button>
                        </div>
                    </div>
                     
                </div>
            )}
        </Main>
    );

  
};

export default GradeSubmission;