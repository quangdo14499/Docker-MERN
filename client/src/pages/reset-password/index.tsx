import { useFormik } from 'formik';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import auth from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { ROUTE } from '../../contants';
import LinkHasExpired from './LinkHasExpired';

const ResetPasswordForm = () => {
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const id = new URLSearchParams(search).get('ID');
    const [error, setEror] = useState('');
    const [infor, setInfor] = useState<any>();
    const navigate = useNavigate();
    const now = dayjs().unix();

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token);
            setInfor(decoded);
        }
    }, [token]);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmedPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('').min(4, 'Must be 4 characters or more'),
            confirmedPassword: Yup.string()
                .required('')
                .oneOf([Yup.ref('password'), null], 'Password must match'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await auth.createNewPassword({ email: infor.email, password: values.password }, id);
                if (response) {
                    navigate(ROUTE.LOGIN);
                }
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
            {infor && now > infor.exp ? (
                <LinkHasExpired />
            ) : (
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-md">
                        <h1 className="text-3xl font-semibold text-purple-700">Create new password</h1>
                        <form className="mt-6" action="#" onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <h3 className="text-md font-semibold text-gray-600">
                                    Your new password must be different from previous used passwords.
                                </h3>
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
                                    {formik.errors.password && (
                                        <p className="text-xs text-red-600">{formik.errors.password}</p>
                                    )}
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
                            <div className="mt-6">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    Reset your password
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-xs font-light text-center text-gray-700 flex justify-center">
                            <p>{`Don't have an account?`}</p>
                            <div className="font-medium text-purple-600 hover:underline ml-1">
                                <a href="/register">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResetPasswordForm;
