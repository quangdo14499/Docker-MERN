import axiosClient from './axiosClient';
import { changePasswordRequest, CreateNewPwd, LoginInput, RegisterInput, ResetPassInput } from './request/UserRequest';
import { AxiosResponse } from 'axios';
import { ForgotPassResponse, LoginResponse, User } from './response/UserResponse';
import urls from '../contants/urls';

class Auth {
    register = (body: RegisterInput): Promise<AxiosResponse<LoginResponse>> => {
        return axiosClient.post(`${urls.API_URL}/user/register`, {
            username: body.username,
            email: body.email,
            password: body.password,
        });
    };

    login = (body: LoginInput): Promise<AxiosResponse<LoginResponse>> => {
        return axiosClient.post(`${urls.API_URL}/auth/login`, body);
    };

    confirmed = (): Promise<AxiosResponse<User>> => {
        return axiosClient.get(`${urls.API_URL}/users/me`);
    };

    forgotPassword = (body: ResetPassInput): Promise<AxiosResponse<ForgotPassResponse>> => {
        return axiosClient.post(`${urls.API_URL}/auth/forgot-password`, body);
    };

    createNewPassword = (body: CreateNewPwd, id: string | null) => {
        return axiosClient.put(`${urls.API_URL}/auth/reset-password/${id}`, body);
    };

    changePassword = (body: changePasswordRequest): Promise<AxiosResponse<LoginResponse>> => {
        return axiosClient.post(`${urls.API_URL}/auth/change-password`, body);
    };
}

const auth = new Auth();
export default auth;
