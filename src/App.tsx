import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyles from '@/styles/GlobalStyles';
import { theme } from '@/styles/theme';
import DogList from '@components/Dogs/DogList';
import Footer from '@components/Footer';
import Header from '@components/Header';
import AuthInitializer from '@components/Helper/AuthInitializer';
import ErrorBoundary from '@components/Helper/ErrorBoundary';
import ProtectedRoute from '@components/Helper/ProtectedRoute';
import Home from '@components/Home';
import Login from '@components/Login/Login';
import NotFound from '@components/NotFound';
import User from '@components/User/User';

import './App.css';

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter basename={routerBasename}>
        <ErrorBoundary>
          <AuthInitializer />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="cachorros"
              element={
                <section className="container mainContainer">
                  <DogList />
                </section>
              }
            />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
