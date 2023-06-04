
import Main from '../../Containers/Main/Main'
import { useSelector } from 'react-redux'

const Dashboard = (props) => {

    const { user } = useSelector((state) => state.user)

    return( 
        <Main
            backgroundColor='dfsdafsdf'
        >
            <div> hello, {user?.firstName}</div>
        </Main>
    )
}

export default Dashboard