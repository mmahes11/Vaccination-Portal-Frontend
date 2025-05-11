import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Alert,
    Paper,
    Box,
} from '@mui/material';

const Loginpage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === 'mahesh' && password === '123456') {
            localStorage.setItem(
                'token',
                'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWhlc2giLCJpYXQiOjE3NDY5MTI2MDh9.VfacR0xn6Y8z323FCZtoMBX-AIj95aoLFyQew6a7rerYFYyTUJ0WotqW1Ac5UoSGAwQoMOkyVqcJoTwLLwhHFw'
            );
            navigate('/Home');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
            <Paper elevation={6} className="p-8 w-full max-w-md">
                <Typography variant="h4" className="text-center font-bold mb-6 font-bold text-blue-700">
                    Vaccination Portal Login
                </Typography>
                <form onSubmit={handleLogin} className="space-y-4 pt-6">
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-2"
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default Loginpage;
