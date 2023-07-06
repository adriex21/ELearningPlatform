import { useSelector } from "react-redux";
import Main from "../../Containers/Main/Main";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAssignment, sendSubmission } from "../../utils/requests";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CodeEditor from "../CodeEditor/CodeEditor";
import style from '../../assets/css/markdown-styles.module.css'
import defaultCode from "../../assets/fixtures/defaultCode";

const Submission = () => {

    const { user } = useSelector((state) => state.user);
    const { assignment_id } = useParams();
    const [ data, setData ] = useState();
    const [ code, setCode ] = useState(defaultCode);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await getAssignment(assignment_id);
            if(data) setData(data);
        }
        getData()
    }, [])

    const submit = async () => {
        const response = await sendSubmission({
            answer: code,
        }, assignment_id);
        if(!response) return console.error('Something went wrong with the submission');
        navigate('/');
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
                            <button onClick={submit} className="absolute bottom-5 left-5 bg-[#581c87] hover:bg-[#1c092a] text-white font-bold py-2 px-4 rounded-full">
                                Submit assignment
                            </button>
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