import { useEffect } from "react";
import { setUser, setAuthenticated } from "../Slices/userSlice";
import { useDispatch } from 'react-redux';
import axios from 'axios';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

const useAuthentication = () => {
    const dispatch = useDispatch();
    useEffect(() =>  {
        const checkAuthentication = async () => {
            if(!isAuthenticated()) return dispatch(setAuthenticated('unauthenticated'));
            if (isAuthenticated()) {
                const response = await axios.get('http://localhost:3000/api/user/getUser', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                })
                try {
                const received = response.data;
                        if(received.msg === "User doesn't exist"){ 
                            dispatch(setAuthenticated('unauthenticated'));
                            return dispatch(setUser(undefined));
                        }
                        dispatch(setAuthenticated('authenticated'));
                        return dispatch(setUser(received))
                } catch(error) {
                        console.log("ERROR" + error)
                }
            }
        };
    checkAuthentication();
    }, []);
};

export default useAuthentication;