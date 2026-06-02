import React from 'react';
import { useNavigate } from 'react-router-dom';

import { authApi, tokenStorage, userApi } from '@/api';
import type { User } from '@/types';

type UserContextValue = {
    data: User | null;
    login: boolean | null;
    loading: boolean;
    error: string | null;
    userLogin: (username: string, password: string) => Promise<void>;
    userLogout: () => Promise<void>;
};

type UserStorageProps = {
    children: React.ReactNode;
};

const getErrorMessage = (error: unknown): string => {
    if(error instanceof Error) return error.message;
    return 'Ocorreu um erro inesperado.';
};

export const UserContext = React.createContext<UserContextValue>({
    data: null,
    login: null,
    loading: false,
    error: null,
    userLogin: async () => {},
    userLogout: async () => {},
});

export const UserStorage = ({children}: UserStorageProps) => {
    const [data, setData] = React.useState<User | null>(null);
    const [login, setLogin] = React.useState<boolean | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();


    const userLogout = React.useCallback( async function() {
        setData(null);
        setError(null);
        setLoading(false);
        setLogin(false);
        tokenStorage.remove();
        navigate('/login');
 
    }, [navigate])
 


    async function getUser(token: string){
        const { data } = await userApi.get(token);
        setData(data);
        setLogin(true);
    }

    async function userLogin(username: string, password: string){
        try{
        setError(null);
        setLoading(true);
        const { data } = await authApi.login({username, password});
        const {token} = data;
        tokenStorage.set(token);
        await getUser(token);
        navigate('/conta');
        }catch(err) {
            setError(getErrorMessage(err));
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
