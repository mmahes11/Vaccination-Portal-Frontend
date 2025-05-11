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
import {loginUser} from "../services/login";

const Loginpage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        try {
            const response = await loginUser({ username, password });
            console.log("Login successful:", response);
            localStorage.setItem(
                'token',
                response.accessToken
            );
            navigate('/Home');
        } catch (error) {
            console.error("Login failed:", error);
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
                        name="username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        name="password"
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
