import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface Props {
    onSubmit: (form: any) => void;
    onClose: () => void;
}

const DriveForm: React.FC<Props> = ({ onSubmit, onClose }) => {
    const [vaccineName, setVaccine] = useState('');
    const [driveDate, setDate] = useState('');
    const [availableDoses, setDoses] = useState('');
    const [applicableClasses, setApplicableClasses] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ vaccineName, driveDate,availableDoses,applicableClasses });
        onClose();
    };
/* {"vaccineName": "COVID-19", "driveDate": "2025-05-30", "availableDoses": 100, "applicableClasses": "Grade 3, Grade 4"}*/
    return (
        <Box component="form" onSubmit={handleSubmit} className="p-4 space-y-4 w-80">
            <TextField
                label="Vaccine Name"
                fullWidth
                value={vaccineName}
                onChange={(e) => setVaccine(e.target.value)}
            />
            <TextField
                label="Available Doses"
                fullWidth
                value={availableDoses}
                onChange={(e) => setDoses(e.target.value)}
            />
            <TextField
                label="Applicable Classes"
                fullWidth
                value={applicableClasses}
                onChange={(e) => setApplicableClasses(e.target.value)}
            />
            <TextField
                label="Drive Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={driveDate}
                onChange={(e) => setDate(e.target.value)}
            />
            <Box className="flex justify-between">
                <Button variant="contained" color="primary" type="submit">
                    Schedule
                </Button>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default DriveForm;
