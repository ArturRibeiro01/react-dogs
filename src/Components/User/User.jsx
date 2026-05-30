import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Feed from '../Feed/Feed'
import UserHeader from './UserHeader'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'
import { UserContext } from '../../UserContext'

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
            </Routes>
        </section>
    )
}

export default User
