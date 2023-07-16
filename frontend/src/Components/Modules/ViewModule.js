import { useContext } from "react";
import Main from "../../Containers/Main/Main";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import style from '../../assets/css/markdown-styles.module.css'

const ViewModule = () => {

    const location = useLocation();

    const data = location.state.module

    return(

        <Main>

        <ReactMarkdown className={style.reactMarkDown} children={data.content}>
        </ReactMarkdown>

        </Main>
    )

}

export default ViewModule;