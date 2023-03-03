import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import { ROUTE } from './contants';
import Login from './pages/login';
import SignUpForm from './pages/register';
import ForgotPassword from './pages/forgot-password';
import ResetPasswordForm from './pages/reset-password';
import Home from './pages/home';
import { GoogleOAuthProvider } from '@react-oauth/google';

// import Blogs from './containers/Blogs';
// import UserLoginProvider from './providers/UserLoginProvider';
// import BlogsProvider from './providers/BlogsProvider';
const clientId = '1082041868957-08qslb1hm36sn0nqqp3eu0ok5n376kjq.apps.googleusercontent.com';

function App() {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <BrowserRouter>
                <Routes>
                    {/* <UserLoginProvider> */}
                    <Route path={ROUTE.LOGIN} element={<Login />} />
                    <Route path={ROUTE.REGISTER} element={<SignUpForm />} />
                    <Route path={ROUTE.FORGOT_PASS} element={<ForgotPassword />} />
                    <Route path={ROUTE.RESET_PASS} element={<ResetPasswordForm />} />
                    <Route path={ROUTE.HOME} element={<Home />} />

                    {/* </UserLoginProvider> */}
                    {/* <BlogsProvider> */}
                    {/* <Route path={ROUTE.HOME} element={<Blogs />} /> */}
                    {/* </BlogsProvider> */}
                </Routes>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
