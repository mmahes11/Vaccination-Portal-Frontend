import React, { useState } from 'react';

const DriveForm: React.FC = () => {
    const [vaccine, setVaccine] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = () => {
        console.log('Drive scheduled:', vaccine, date);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={vaccine} onChange={(e) => setVaccine(e.target.value)} placeholder="Vaccine Name" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button type="submit">Schedule Drive</button>
        </form>
    );
};

export default DriveForm;
