import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from '@components/Footer';
import Header from '@components/Header';
import ErrorBoundary from '@components/Helper/ErrorBoundary';
import ProtectedRoute from '@components/Helper/ProtectedRoute';
import Home from '@components/Home';
import Login from '@components/Login/Login';
import NotFound from '@components/NotFound';
import User from '@components/User/User';
import { UserStorage } from '@/UserContext';

import './App.css';

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
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </UserStorage>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
};

export default App;
