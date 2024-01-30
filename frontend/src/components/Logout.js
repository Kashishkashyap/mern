import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <div className="">
            <button class="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
