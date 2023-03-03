import axios, { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

const EXCEPTION_PATH = [
    '/auth/local',
    '/auth/local/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/forgot-password',
];

const axiosClient = axios.create({
    baseURL: process.env.PUBLIC_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    // paramsSerializer: (params: any) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (requestConfig: any) => {
    const contains = EXCEPTION_PATH.some((element) => {
        if (requestConfig.url?.includes(element)) {
            return true;
        }
    });

    if (requestConfig.url && contains === true) {
        return requestConfig;
    }
    requestConfig.headers = {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    };

    return requestConfig;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors
    },
);

export default axiosClient;
