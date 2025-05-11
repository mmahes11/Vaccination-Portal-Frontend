import React, { useState, useEffect } from "react";
import { Student } from "../types/Student";

import {
    Drawer,
    Box,
    TextField,
    Button,
    MenuItem,
    Typography,
    Select,
    Chip,
    OutlinedInput, InputLabel
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import {addStudent, getAllStudents, updateStudent, updateStudentVaccinationRecord} from "../services/studentService";
import {getAllDrives} from "../services/driveService";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (form: Student) => void;
    student?: Student | null; // student to edit, or undefined/null if adding
}
interface Drive {
    id: string;
    vaccineName: string;
    driveDate: string;
    applicableClasses?: string;
    availableDoses?: string;
}

const initialForm: Student = {
    name: '',
    className: '',
    age: '',
    vaccinationStatus: ''
};

const StudentForm: React.FC<Props> = ({ open, onClose, onSubmit, student }) => {
    const [form, setForm] = useState<Student>(initialForm);
    const [drives, setDrives] = useState<Drive[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [assignedDrive, setAssignedDrive] = useState<string>("");
    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const drives = await getAllDrives();
                console.log(drives);
                setDrives(drives);
            } catch (err) {
                setError('Failed to fetch students');
            } finally {
                setLoading(false);
            }
        };
        console.log(student);
        if (student) {
            setForm(student);
        } else {
            setForm(initialForm);
        }
        fetchDrives();
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
            console.log(form.vaccinationStatus)
        }else{
            await updateStudent(form.id?.toString() ?? '', form);
        }
        if(form.vaccinationStatus === "Vaccinated" && assignedDrive) {
            console.log(assignedDrive);
            const studentvaccinationupdate = {
                "studentId": form.id,
                "driveId": assignedDrive,
                "vaccinationDate": new Date().toISOString().slice(0, 10)
            }
            await updateStudentVaccinationRecord(studentvaccinationupdate);
        }
        //window.location.reload();
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
                <InputLabel id="drive-select-label">"Drives"</InputLabel>
                <Select
                    labelId="drive-select-label"
                    value={assignedDrive ?? ""}
                    onChange={(e) => setAssignedDrive(e.target.value as string)}
                    input={<OutlinedInput label="Drives" />}
                    className="bg-white rounded" // Tailwind: white background, rounded corners
                    MenuProps={{
                        PaperProps: {
                            className: "bg-white",
                        },
                    }}
                >
                    {drives.map((drive) => (
                        <MenuItem key={drive.id} value={drive.id}>
                            {drive.vaccineName}
                        </MenuItem>
                    ))}
                </Select>

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