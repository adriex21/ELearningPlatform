import { useSelector } from "react-redux";
import Main from "../../Containers/Main/Main";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getAssignment, sendSubmission } from "../../utils/requests";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CodeEditor from "../CodeEditor/CodeEditor";
import style from '../../assets/css/markdown-styles.module.css'
import defaultCode from "../../assets/fixtures/defaultCode";
import { DateTime } from 'luxon'

const Submission = () => {
  const { user } = useSelector((state) => state.user);
  const { assignment_id } = useParams();
  const [data, setData] = useState();
  const [code, setCode] = useState(defaultCode);
  const [remainingTime, setRemainingTime] = useState();
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getAssignment(assignment_id);
      if (data) setData(data);
    };
    getData();
  }, [assignment_id]);

  useEffect(() => {
    if (data?.submission[0]?.endTime) {
      const remainingSeconds = Math.floor(
        (DateTime.fromISO(data.submission[0].endTime) - DateTime.now()) / 1000
      );
      setRemainingTime(remainingSeconds);

      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  });

  useEffect(() => {
    if (remainingTime <= 0 && (!data?.submission[0]?.answer || data.submission[0].answer.length === 0)) {
      submit();
    }
  }, [remainingTime]);

  const submit = async () => {
    const response = await sendSubmission(
      {
        answer: code,
      },
      assignment_id
    );
    if (!response) return console.error('Something went wrong with the submission');
    navigate('/');
  };

  const viewResults = async() => {

    setShowResults(true)

  }

  const done = async() => {

    setShowResults(false)
    
  }

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
      {data?.submission?.[0]?.answer?.length > 0 ? (
        <>
          <div className='flex w-full h-full'>
            <div className='relative h-full w-1/2 bg-[white]'>
              <ReactMarkdown className={style.reactMarkDown} children={data?.assignment?.description}></ReactMarkdown>
                <button onClick={viewResults} className="absolute bottom-5 left-5 bg-[#581c87] hover:bg-[#1c092a] text-white font-bold py-2 px-4 rounded-md"> View results </button>
            </div>
            <CodeEditor code={data?.submission[0]?.answer} setCode={setCode} />
          </div>
          {showResults && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex flex-col items-center justify-center bg-black bg-opacity-80">
                <label htmlFor="feedback" className="font-bold text-2xl pb-5 text-white">Feedback</label>
                <textarea id="feedback" value={data?.submission[0]?.feedback || 'No feedback provided'} type="text" 
                className="outline-none border border-gray-400 caret-black-400 rounded-md mb-4 text-black w-1/3 p-2"/>
                <label htmlFor="grade" className="font-bold text-2xl pb-5 text-white">Grade</label>
                <input id="grade" value={data?.submission[0]?.grade || 'Not graded yet!'} type="text" className="outline-none border border-gray-400 h-8 rounded-md text-black mb-4 p-2 w-1/3"/>
                <button onClick={done} className="bg-[#581c87] hover:bg-[#1c092a] text-white font-bold py-2 px-4 rounded-md"> Done </button>
            </div>

          )}
        </>
      ) : (
        <>
          <div className='flex w-full h-full'>
            <div className='relative h-full w-1/2 bg-[white]'>
              <ReactMarkdown className={style.reactMarkDown} children={data?.assignment?.description}></ReactMarkdown>
              <div className='absolute bottom-5 left-5 flex flex-row gap-5'>
                {data?.assignment.status === 'open' && (
                  <>
                    {remainingTime > 0 && (
                      <div className='bg-[#581c87] hover:bg-[#1c092a] text-white font-bold py-2 px-4 rounded-md'>
                        
                        Time left: {formatTime(remainingTime)}
                      </div>
                    )}
                    <button
                      onClick={submit}
                      className='bg-[#581c87] hover:bg-[#1c092a] text-white font-bold py-2 px-4 rounded-md'>
                      Submit assignment
                    </button>
                  </>
                )}
              </div>
            </div>
            <CodeEditor code={code} setCode={setCode} />
          </div>
        </>
      )}
    </Main>
  );
};

export default Submission;
