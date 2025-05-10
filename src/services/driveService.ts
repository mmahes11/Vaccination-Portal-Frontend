import api from './api';

export const getAllDrives = async () => {
    const response = await api.get('/drives');
    return response.data;
};

export const createDrive = async (drive: {
    vaccine: string;
    date: string;
}) => {
    const response = await api.post('/drives', drive);
    return response.data;
};

export const updateDrive = async (id: string, drive: any) => {
    const response = await api.put(`/drives/${id}`, drive);
    return response.data;
};

export const deleteDrive = async (id: string) => {
    const response = await api.delete(`/drives/${id}`);
    return response.data;
};
