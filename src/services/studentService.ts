import api from './api';
import {Student} from "../types/Student";

export const getAllStudents = async () => {
    const response = await api.get('/students');
    return response.data;
};

export const getStudentById = async (id: string) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
};

export const addStudent = async (student: Student) => {
    const response = await api.post('/students', student);
    return response.data;
};

export const updateStudent = async (id: string, student: any) => {
    const response = await api.put(`/students/${id}`, student);
    return response.data;
};

export const deleteStudent = async (id: string) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
};

export const updateStudentVaccinationRecord = async (id: string) => {
    const response = await api.delete('/vaccination-records');
    return response.data;
};


