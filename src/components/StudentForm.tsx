import React, { useState, useEffect } from "react";
import { Student } from "../types/Student";

import {
    Drawer,
    Box,
    TextField,
    Button,
    MenuItem,
    Typography
} from '@mui/material';
import {addStudent, updateStudent} from "../services/studentService";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (form: Student) => void;
    student?: Student | null; // student to edit, or undefined/null if adding
}

const initialForm: Student = {
    name: '',
    className: '',
    age: '',
    vaccinationStatus: ''
};

const StudentForm: React.FC<Props> = ({ open, onClose, onSubmit, student }) => {
    const [form, setForm] = useState<Student>(initialForm);

    useEffect(() => {
        console.log(student);
        if (student) {
            setForm(student);
        } else {
            setForm(initialForm);
        }
    }, [student, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log('Scheduled Drive:', form);
        console.log("ASa", isEdit);
        if(isEdit){
            await addStudent(form);
        }else{
            await updateStudent(form.id?.toString() ?? '', form);
        }
        window.location.reload();
        onClose();
    };

    const isEdit = Boolean(student);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 350, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    {isEdit ? "Edit Student" : "Add Student"}
                </Typography>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    margin="normal"
                    value={form.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Class Name"
                    name="className"
                    margin="normal"
                    value={form.className}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    margin="normal"
                    value={form.age}
                    onChange={handleChange}
                />
                <TextField
                    select
                    fullWidth
                    label="Vaccination Status"
                    name="vaccinationStatus"
                    margin="normal"
                    value={form.vaccinationStatus}
                    onChange={handleChange}
                >
                    <MenuItem value="Vaccinated">Vaccinated</MenuItem>
                    <MenuItem value="Not Vaccinated">Not Vaccinated</MenuItem>
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    {isEdit ? "Update" : "Submit"}
                </Button>
            </Box>
        </Drawer>
    );
};

export default StudentForm;