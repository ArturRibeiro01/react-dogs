import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import {UserStorage} from './UserContext'
import User from './Components/User/User';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import ErrorBoundary from './Components/Helper/ErrorBoundary';

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

const App = () => {
  return(
    <div>
      <BrowserRouter basename={routerBasename}>
        <ErrorBoundary>
          <UserStorage>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <Route
                path="conta/*"
                element={
                  <ProtectedRoute>
                    <User/>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </UserStorage>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
};

export default App;
