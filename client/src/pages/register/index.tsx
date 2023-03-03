import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import auth from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../contants';
import useLoginSocials from '../../hooks/useLoginSocials';

const SignUpForm = () => {
    const [error, setError] = useState('');
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
    const [agreeTermsNotice, setAgreeTermsNotice] = useState<string>();
    const navigate = useNavigate();

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const githubCode = params.get('code');
    const { clientGithubId, gitHubRedirectURL, path, loginGoogle } = useLoginSocials(githubCode);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmedPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('').min(4, 'Must be 4 characters or more'),
            email: Yup.string()
                .required('')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
            password: Yup.string().required('').min(4, 'Must be 4 characters or more'),
            confirmedPassword: Yup.string()
                .required('')
                .oneOf([Yup.ref('password'), null], 'Password must match'),
        }),
        onSubmit: async (values) => {
            if (agreeTerms) {
                try {
                    const response = await auth.register(values);
                    localStorage.setItem('jwt', response.data.token);
                    if (response) {
                        navigate(ROUTE.HOME);
                    }
                } catch (error) {
                    const { response }: any = error;
                    const { request, ...errorObject } = response;
                    setError(errorObject.data.error.message);
                }
            } else {
                return setAgreeTermsNotice('You must accept the terms and conditions to register an account');
            }
        },
    });
    useEffect(() => {
        setError('');
    }, [formik.values]);

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-200">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-md">
                <h1 className="text-3xl font-semibold text-purple-700">Sign up</h1>
                <form className="mt-6" action="#" onSubmit={formik.handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-600">
                            Name
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Your email or username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        <div className="">
                            {formik.errors.username && <p className="text-xs text-red-600">{formik.errors.username}</p>}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
                            Email
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
                            {formik.errors.email && <p className="text-xs text-red-600">{formik.errors.email}</p>}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="••••••••"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <div className="">
                            {formik.errors.password && <p className="text-xs text-red-600">{formik.errors.password}</p>}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmedPassword"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="••••••••"
                            value={formik.values.confirmedPassword}
                            onChange={formik.handleChange}
                        />
                        <div className="">
                            {formik.errors.confirmedPassword && (
                                <p className="text-xs text-red-600">{formik.errors.confirmedPassword}</p>
                            )}
                            {error && <p className="text-xs text-red-600">{error}</p>}
                        </div>
                    </div>
                    <div className="flex justify-start mt-4">
                        <label className="text-gray-500 font-bold flex items-center">
                            <input
                                className="leading-loose text-pink-600 top-0"
                                type="checkbox"
                                onChange={() => {
                                    setAgreeTerms(!agreeTerms);
                                }}
                            />
                            <div className="ml-2 text-sm text-gray-600 text-left">
                                I agree with the
                                <a href="#" className="font-medium text-purple-600 hover:underline ml-1">
                                    Terms and Conditions
                                </a>
                            </div>
                        </label>
                    </div>
                    {agreeTerms === false && agreeTermsNotice && (
                        <p className="text-xs text-red-600 mt-2">{agreeTermsNotice}</p>
                    )}
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Register
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
                        <img src="./assets/google_icon_multicolor.png" className="w-6 h-6 fill-current" alt="" />
                    </button>
                    <a
                        href={`https://github.com/login/oauth/authorize?client_id=${clientGithubId}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
                        className="flex items-center justify-center w-full p-2 shadow-md rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                    </a>
                    <button className="flex items-center justify-center w-full p-2 shadow-md rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                        <img src="./assets/qr_code_icon.png" className="w-5 h-5 fill-current" alt="" />
                    </button>
                </div>

                <div className="mt-8 text-xs font-light text-center text-gray-700 flex justify-center">
                    <p>{`Don't have an account?`}</p>
                    <div className="font-medium text-purple-600 hover:underline ml-1">
                        <a href={ROUTE.LOGIN}>Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
