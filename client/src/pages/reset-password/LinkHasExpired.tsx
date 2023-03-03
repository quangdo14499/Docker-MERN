import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../contants';

const LinkHasExpired = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-md">
                <h1 className="text-2xl font-semibold text-purple-700 text-center">
                    Your verification link has expired
                </h1>
                <div className="w-full flex justify-center mt-6">
                    <img className="w-1/2 h-1/4" src="./assets/1.svg" alt="" />
                </div>
                <div className="mt-6">
                    <div className="mb-4">
                        <h3 className="text-md font-semibold text-gray-600">
                            For security reasons, password reset links expire after a little while. If you still need to
                            reset your password, you can request a new reset email
                        </h3>
                    </div>
                    <div className="mt-8">
                        <button
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 
                        transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            onClick={() => navigate(ROUTE.FORGOT_PASS)}
                        >
                            Request a new reset email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkHasExpired;
