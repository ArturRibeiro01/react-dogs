import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';

import styles from './Login.module.css';
import LoginCreate from './LoginCreate';
import LoginForm from './LoginForm';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';

const Login = () => {
    const login = useAuthStore((state) => state.login);

    if(login === true) return <Navigate to="/conta" />
    return (
        <section className={styles.login}>
            <div className={styles.forms}>
                <Routes>
                    <Route path="" element={< LoginForm />}/>
                    <Route path="criar" element={< LoginCreate />}/>
                    <Route path="perdeu" element={< LoginPasswordLost />}/>
                    <Route path="resetar" element={< LoginPasswordReset />}/>
                    <Route path="*" element={<Navigate to="/login" replace />}/>
                </Routes>
            </div>
        </section>
    )
}

export default Login
