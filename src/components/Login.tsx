import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin') {
            localStorage.setItem('user', 'admin');
            navigate('/');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
