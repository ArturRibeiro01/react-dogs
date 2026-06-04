import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';

import { LoginForms, LoginShell } from './Login.styles';
import LoginCreate from './LoginCreate';
import LoginForm from './LoginForm';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';

const Login = () => {
    const login = useAuthStore((state) => state.login);

    if(login === true) return <Navigate to="/conta" />
    return (
        <LoginShell>
            <LoginForms>
                <Routes>
                    <Route path="" element={< LoginForm />}/>
                    <Route path="criar" element={< LoginCreate />}/>
                    <Route path="perdeu" element={< LoginPasswordLost />}/>
                    <Route path="resetar" element={< LoginPasswordReset />}/>
                    <Route path="*" element={<Navigate to="/login" replace />}/>
                </Routes>
            </LoginForms>
        </LoginShell>
    )
}

export default Login
