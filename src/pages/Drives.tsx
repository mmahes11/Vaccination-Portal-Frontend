import React from 'react';
import DriveForm from '../components/DriveForm';
import DriveList from '../components/DriveList';

const Drives: React.FC = () => {
    return (
        <div>
            <DriveForm />
            <DriveList />
        </div>
    );
};

export default Drives;
