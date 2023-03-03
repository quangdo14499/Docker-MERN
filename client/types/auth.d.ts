import { changePasswordRequest, CreateNewPwd, LoginInput, RegisterInput, ResetPassInput } from './request/UserRequest';
import { AxiosResponse } from 'axios';
import { LoginResponse, User } from './response/UserResponse';
declare class Auth {
    register: (body: RegisterInput) => Promise<AxiosResponse<LoginResponse>>;
    login: (body: LoginInput) => Promise<AxiosResponse<LoginResponse>>;
    confirmed: () => Promise<AxiosResponse<User>>;
    forgotPassword: (body: ResetPassInput) => Promise<AxiosResponse<ResetPassInput>>;
    createNewPassword: (body: CreateNewPwd, id: string | null) => Promise<AxiosResponse<any, any>>;
    changePassword: (body: changePasswordRequest) => Promise<AxiosResponse<LoginResponse>>;
}
declare const auth: Auth;
export default auth;
