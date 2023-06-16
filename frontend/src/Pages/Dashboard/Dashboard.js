
import { useEffect, useState } from 'react'
import Main from '../../Containers/Main/Main'
import { useSelector } from 'react-redux'
import { getAssignments } from '../../utils/requests'
import Assignments from '../../Components/Assignments/Assignments'
import { useNavigate } from 'react-router-dom'


const Dashboard = (props) => {

    const { user } = useSelector((state) => state.user)
    const [assignments, setAssigments] = useState([]);

    useEffect(()=> {
        const getData = async () => {
            const res = await getAssignments();
            if(res) setAssigments(res);
        }
        getData()
    },[])

    const navigate = useNavigate();
    const createAssignment = () => {
        
        navigate('/createAssignment');
    }



    return( 
        <Main>
            <div>

               <Assignments assignments={assignments}> </Assignments>

               {user.role === "Teacher" && (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={createAssignment} > Create new assignment </button>)}

            </div>
        </Main>
    )
}

export default Dashboard