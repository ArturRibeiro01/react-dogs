import React from 'react'
import { authApi, tokenStorage, userApi } from './api'
import {useNavigate} from 'react-router-dom'

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();


    const userLogout = React.useCallback( async function() {
        setData(null);
        setError(null);
        setLoading(false);
        setLogin(false);
        tokenStorage.remove();
        navigate('/login');
 
    }, [navigate])
 


    async function getUser(token){
        const { data } = await userApi.get(token);
        setData(data);
        setLogin(true);
    }

    async function userLogin(username, password){
        try{
        setError(null);
        setLoading(true);
        const { data } = await authApi.login({username, password});
        const {token} = data;
        tokenStorage.set(token);
        await getUser(token);
        navigate('/conta');
        }catch(err) {
            setError(err.message);
            setLogin(false)
        }finally {
            setLoading(false)
        }
    }

    React.useEffect(() =>{
        async function autoLogin(){
            const token = tokenStorage.get();
            if(token) {
                try{
                setError(null); 
                setLoading(true);
                await authApi.validateToken(token);
                await getUser(token);
                navigate('/conta');
                } catch (err){
                    userLogout();
                } finally{
                    setLoading(false);
                }
            }
        }
        autoLogin();
    }, [navigate, userLogout]);


    return (
        <UserContext.Provider value={{ userLogin, userLogout ,data, error, loading, login}}>
            {children}
        </UserContext.Provider>
    )
}
