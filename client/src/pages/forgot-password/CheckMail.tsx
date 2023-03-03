import React, { useEffect, useState } from 'react';
import { ROUTE } from '../../contants';
import dayjs from 'dayjs';
import auth from '../../api/auth';

interface CheckMailProps {
    expiredTime: number;
    email: string;
}

const CheckMail: React.FC<CheckMailProps> = (props) => {
    const { expiredTime, email } = props;
    const currentTime = dayjs().unix();
    const [timeLeft, setTimeLeft] = useState(expiredTime - currentTime);

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const handleResendLink = async () => {
        try {
            const response = await auth.forgotPassword({ email: email });
            setTimeLeft(response.data.exp - currentTime);
        } catch (error) {
            const { response }: any = error;
            const { request, ...errorObject } = response;
        }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-200">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-md">
                <h1 className="text-3xl font-semibold text-center text-purple-700">Check your email</h1>
                <div className="w-full flex justify-center mt-6">
                    <img className="w-1/2 h-1/4" src="./assets/3.svg" alt="" />
                </div>
                <div className="mt-6">
                    <div className="mb-4">
                        {timeLeft > 0 ? (
                            <h3 className="text-md font-semibold text-center text-gray-600">
                                We've sent an email to the address provided. Click the link in the email to reset your
                                password. Reset link will become invalid in{' '}
                                <span className="text-purple-700">{timeLeft}</span>s
                            </h3>
                        ) : (
                            <h3 className="text-md font-semibold text-center text-gray-600">Reset link has expired!</h3>
                        )}
                    </div>
                </div>
                <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                    onClick={handleResendLink}
                >
                    Resend
                </button>
                <div className="flex justify-center">
                    <div className="mt-8 text-xs font-light text-center text-gray-700  w-[60%]">
                        <div>
                            {`Don't receive the email? Check your spam filter, or`}
                            <span className="font-medium text-purple-600 hover:underline ml-1">
                                <a href={ROUTE.FORGOT_PASS}>try another email address</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckMail;
