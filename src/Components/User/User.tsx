import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import Feed from '@components/Feed/Feed';

import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

const User = () => {
    const data = useAuthStore((state) => state.data);
    const userId = data?.id ?? 0;

    return (
        <section className="container">
            <UserHeader/>
            <Routes>
                <Route path ="" element={<Feed user={userId}/>} />
                <Route path ="postar" element={<UserPhotoPost/>} />
                <Route path ="estatisticas" element={<UserStats/>} />
                <Route path ="*" element={<Navigate to="/conta" replace />} />
            </Routes>
        </section>
    )
};

export default User;
