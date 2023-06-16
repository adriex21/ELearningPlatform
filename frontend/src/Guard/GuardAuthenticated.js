import { useSelector } from 'react-redux';
import useAuthentication from '../Hooks/useAuthentication';
import { Navigate } from 'react-router-dom';

const GuardAuthenticated = (props) => {
    useAuthentication()

    const { children } = props;
    const { authenticated } = useSelector((state) => state.user);

    if(authenticated === 'uninit') return <></>
    if(authenticated === 'authenticated') return <Navigate to="/dashboard"></Navigate>
    return children
    
}

export default GuardAuthenticated