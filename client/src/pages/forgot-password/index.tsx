import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import auth from '../../api/auth';
import CheckMail from './CheckMail';
import useLoginSocials from '../../hooks/useLoginSocials';

const ForgotPassword = () => {
    const [error, setEror] = useState('');
    const [expiredTime, setExpireTime] = useState<number>();
    const [email, setEmail] = useState<string>('');

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const githubCode = params.get('code');
    const { clientGithubId, gitHubRedirectURL, path, loginGoogle } = useLoginSocials(githubCode);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
        }),
        onSubmit: async (values) => {
            setEmail(values.email);
            try {
                const response = await auth.forgotPassword(values);
                setExpireTime(response.data.exp);
            } catch (error) {
                const { response }: any = error;
                const { request, ...errorObject } = response;
                console.log(errorObject.data.error.message);
                setEror(errorObject.data.error.message);
            }
        },
    });
    return (
        <>
            {expiredTime ? (
                <CheckMail expiredTime={expiredTime} email={email} />
            ) : (
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-200">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-md">
                        <h1 className="text-3xl font-semibold text-purple-700">Forgot your password?</h1>
                        <form className="mt-6" action="#" onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <h3 className="text-md font-semibold text-gray-600">
                                    Enter the email associated with your account and we'll send an email with
                                    instructions to reset your password.
                                </h3>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    placeholder="Your email or username"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                <div className="">
                                    {formik.errors.email && (
                                        <p className="text-xs text-red-600">{formik.errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    Request password reset
                                </button>
                            </div>
                        </form>
                        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                            <div className="absolute px-5 bg-white">Or</div>
                        </div>
                        <div className="flex mt-4 gap-x-4">
                            <button
                                onClick={() => loginGoogle()}
                                type="button"
                                className="flex items-center justify-center w-full p-2 shadow-md rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                            >
                                <img
                                    src="./assets/google_icon_multicolor.png"
                                    className="w-6 h-6 fill-current"
                                    alt=""
                                />
                            </button>
                            <a
                                href={`https://github.com/login/oauth/authorize?client_id=${clientGithubId}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
                                className="flex items-center justify-center w-full p-2 shadow-md rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    className="w-5 h-5 fill-current"
                                >
                                    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                                </svg>
                            </a>
                            <button className="flex items-center justify-center w-full p-2 shadow-md rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                                <img src="./assets/qr_code_icon.png" className="w-5 h-5 fill-current" alt="" />
                            </button>
                        </div>

                        <div className="mt-8 text-xs font-light text-center text-gray-700 flex justify-center">
                            <div className="font-medium text-purple-600 hover:underline ml-1">
                                <a href="/login">Back to Sign in</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ForgotPassword;
