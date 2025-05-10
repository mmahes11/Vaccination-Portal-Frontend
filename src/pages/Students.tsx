import React from 'react';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

const Students: React.FC = () => {
    return (
        <div>
            <StudentForm />
            <StudentList />
        </div>
    );
};

export default Students;
