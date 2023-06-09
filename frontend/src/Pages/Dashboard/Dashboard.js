
import { useEffect, useState } from 'react'
import Main from '../../Containers/Main/Main'
import { useSelector } from 'react-redux'
import { getAssignments } from '../../utils/requests'
import Assignments from '../../Components/Assignments/Assignments'

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


    return( 

        <Main>

               <Assignments assignments={assignments}> </Assignments>

        
        </Main>
        
    )
}

export default Dashboard