import api from './api';

export const loginUser = async (p: { username: string; password: string }) => {
    console.log(p);
    const response = await api.post('/api/auth/signin',{
        "username": p.username,
        "password": p.password
    });
    return response.data;
};