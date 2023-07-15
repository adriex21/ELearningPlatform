import { useSelector } from "react-redux";
import Main from "../../Containers/Main/Main";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getAssignment, sendSubmission } from "../../utils/requests";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CodeEditor from "../CodeEditor/CodeEditor";
import style from '../../assets/css/markdown-styles.module.css'
import defaultCode from "../../assets/fixtures/defaultCode";

const Submission = () => {

    const { user } = useSelector((state) => state.user);
    const { assignment_id } = useParams();
    const [ data, setData ] = useState();
    const [code, setCode] = useState(defaultCode);
    const [ timer, setTimer] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await getAssignment(assignment_id);
            if(data) setData(data); 
            if (data.assignment.type === 'evaluation') {
                const storedTimer = localStorage.getItem('assignmentTimer');
                const initialTimer = storedTimer ? parseInt(storedTimer) : data.assignment.timer * 60;
                setTimer(initialTimer); // Set the initial timer value from sessionStorage or assignment data
              }
        }
        getData()
    }, [assignment_id])

    useEffect(() => {
        const intervalId = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer > 0) {
              const updatedTimer = prevTimer - 1;
              localStorage.setItem('assignmentTimer', updatedTimer.toString()); // Store the updated timer value in sessionStorage
              return updatedTimer;
            } else {
              clearInterval(intervalId);
              return prevTimer;
            }
          });
        }, 1000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, []);
    
      useEffect(() => {
        if (timer === 0 && data?.submission?.length <= 0 ) {
          submit();
        }
      }, [timer]);

    useEffect(() => {
        localStorage.setItem('code', code); // Store the code in localStorage whenever it changes
    }, [code]);

    const submit = async () => {
        const response = await sendSubmission({
            answer: code,
        }, assignment_id);
        if(!response) return console.error('Something went wrong with the submission');
        navigate('/');
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
    
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      };

    return (
        <Main> 
            {data?.submission?.length > 0 ?
                <>

                    <div className='flex w-full h-full'>
                        <div className='h-full w-1/2 bg-[white]'> 
                            <ReactMarkdown className={style.reactMarkDown} children={data?.assignment?.description}></ReactMarkdown>
                        </div>
                        <CodeEditor
                        code={data?.submission[0]?.answer}
                        setCode={setCode}

                        />
                    </div>

                </>
                :
                <>
                    <div className='flex flex-row w-full h-full'>
                        <div className='h-full w-1/2 bg-[white]'> 
                            <ReactMarkdown className={style.reactMarkDown} children={data?.assignment?.description}></ReactMarkdown>
                            <div className='absolute bottom-5 left-5 flex flex-row gap-5'>
                                {timer > 0 && ( // Display the timer only if it's greater than 0
                                <div className="bg-[#581c87] hover:bg-[#1c092a] text-white font-bold py-2 px-4 rounded-full">Time left: {formatTime(timer)}</div>
                                )}
                                <button onClick={submit} className="bg-[#581c87] hover:bg-[#1c092a] text-white font-bold py-2 px-4 rounded-full">
                                    Submit assignment
                                </button>
                            </div>
                            
                        </div>
                        <CodeEditor
                            code={code}
                            setCode={setCode}
                        />

                    </div>
                </>
            }
        </Main>
    );
};

export default Submission;