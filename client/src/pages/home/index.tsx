import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../contants';

const Home = () => {
    const getToken = useUserStore((state) => state.getToken);
    const navigate = useNavigate();
    const [isLogout, setIsLogout] = useState<boolean>(false);

    useEffect(() => {
        if (getToken()) {
        } else {
            navigate(ROUTE.LOGIN);
        }
    }, [isLogout]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setIsLogout(!isLogout);
    };
    return (
        <>
            <div>Home</div>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default Home;
