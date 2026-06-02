import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { UserContext } from '@/UserContext';
import Feed from '@components/Feed/Feed';

import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

const User = () => {
    const {data} = React.useContext(UserContext);
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
}

export default User
