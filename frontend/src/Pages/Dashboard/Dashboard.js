import Main from '../../Containers/Main/Main'
import { useSelector } from 'react-redux'


const Dashboard = (props) => {

    const { user } = useSelector((state) => state.user)

    return( 

        <Main>
            <div className="flex flex-col mt-20 ml-20">
                <div className="border border-gray-400 rounded-md w-fit p-5 mb-10">
                    <a href='/assignments'>View assignments</a>
                </div>
                <div className="border border-gray-400 rounded-md w-fit p-5 mb-10">
                    <a href='/courses'>View courses </a>
                </div>
            </div>
                
               

        
        </Main>
        
    )
}

export default Dashboard