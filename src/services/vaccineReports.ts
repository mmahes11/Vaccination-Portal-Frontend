import api from './api';

export const getStudentVaccinationReports = async () => {
    const response = await api.get('/vaccination-records/export/excel');
    return response.data;
};

export const getStudentVaccinationDetails = async () => {
    const response = await api.get('vaccination-records/details');
    return response.data;
};


