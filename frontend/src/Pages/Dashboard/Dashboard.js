import Main from '../../Containers/Main/Main'
import { useSelector } from 'react-redux'


const Dashboard = (props) => {

    const { user } = useSelector((state) => state.user)

    return( 

        <Main>
            <div className='mt-10 ml-20 font-bold text-3xl'> 
                Dashboard
            </div>
            
        
        </Main>
        
    )
}

export default Dashboard