import { useSelector } from 'react-redux';
import useAuthentication from '../Hooks/useAuthentication';
import { Navigate } from 'react-router-dom';

const Guard = (props) => {
    useAuthentication()

    const { children } = props;
    const { authenticated } = useSelector((state) => state.user);

    if(authenticated === 'uninit') return <></>
    if(authenticated === 'unauthenticated') return <Navigate to="/"></Navigate>
    return children
}

export default Guard