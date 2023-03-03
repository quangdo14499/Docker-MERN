import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import auth from '../api/auth';
import { ROUTE } from '../contants';

const useLoginSocials = (githubCode: string | null) => {
    const clientGithubId = 'cc570f02b19de3a0c1a2';
    const gitHubRedirectURL = 'http://localhost:3000/login';
    const path = '/';
    const [googleToken, setGoogleToken] = useState<string>();
    const navigate = useNavigate();

    const loginGoogle = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            setGoogleToken(tokenResponse.access_token);
        },
    });

    useEffect(() => {
        if (googleToken) {
            const getInforGoogleUser = async () => {
                try {
                    const response = await auth.login({ identifier: '', password: '', googleAccessToken: googleToken });
                    localStorage.setItem('jwt', response.data.token);
                    if (response) {
                        navigate(ROUTE.HOME);
                    }
                } catch (error) {
                    const { response }: any = error;
                }
            };

            getInforGoogleUser();
        }
    }, [googleToken]);

    useEffect(() => {
        if (githubCode) {
            const getInforgithubUser = async () => {
                try {
                    const response = await auth.login({ identifier: '', password: '', githubCode: githubCode });
                    localStorage.setItem('jwt', response.data.token);
                    if (response) {
                        navigate(ROUTE.HOME);
                    }
                } catch (error) {
                    const { response }: any = error;
                }
            };

            getInforgithubUser();
        }
    }, [githubCode]);

    return { clientGithubId, gitHubRedirectURL, path, loginGoogle };
};

export default useLoginSocials;
