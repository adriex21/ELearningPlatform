import { useSelector } from "react-redux";
import Main from "../../Containers/Main/Main";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAssignment, getSubmission, sendSubmission } from "../../utils/requests";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CodeEditor from "../CodeEditor/CodeEditor";
import style from '../../assets/css/markdown-styles.module.css'
import defaultCode from "../../assets/fixtures/defaultCode";

const GradeSubmission = () => {

    const { user } = useSelector((state) => state.user);
    const { submission_id } = useParams();
    const [ data, setData ] = useState();
    const [ code, setCode ] = useState(defaultCode);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await getSubmission(submission_id);
            if(data) setData(data);
        }
        getData()
    }, [])

    return (
        <Main> 
            <div className='flex w-full h-full'>
                <div className='h-full w-1/2 bg-[white]'> 
                    <ReactMarkdown className={style.reactMarkDown} children={data?.submittedFor.description}></ReactMarkdown>
                </div>
                <CodeEditor code={data?.answer} setCode={setCode}/>
            </div>
        </Main>
    );
};

export default GradeSubmission;