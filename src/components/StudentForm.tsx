import React, { useState } from 'react';

const StudentForm: React.FC = () => {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        console.log('Student added:', name);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" />
            <button type="submit">Add Student</button>
        </form>
    );
};

export default StudentForm;
