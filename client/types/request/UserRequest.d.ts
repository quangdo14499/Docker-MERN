export interface RegisterInput {
    username: string;
    email: string;
    password: string;
}
export interface LoginInput {
    identifier: string;
    password: string;
}
export interface ResetPassInput {
    email: string;
}
export interface CreateNewPwd {
    email: string;
    password: string;
}
export interface changePasswordRequest {
    password: string;
    currentPassword: string;
    passwordConfirmation: string;
}
