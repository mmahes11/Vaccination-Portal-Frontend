import React, { useEffect, useState } from 'react';
import {createDrive, getAllDrives} from '../services/driveService';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    Box, Drawer,
} from '@mui/material';
import DriveForm from "./DriveForm";


interface Drive {
    id: string;
    vaccineName: string;
    driveDate: string;
    applicableClasses?: string;
    availableDoses?: string;
}

const DriveList: React.FC = () => {
    const [drives, setDrives] = useState<Drive[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (form: any) => {
        console.log('Scheduled Drive:', form);
        await createDrive(form);
        window.location.reload();
        alert('Drive Created successfully');
    };

    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const data = await getAllDrives();
                setDrives(data);
            } catch (err) {
                setError('Failed to fetch drives');
            } finally {
                setLoading(false);
            }
        };

        fetchDrives();
    }, []);

    if (loading) {
        return (
            <Box className="flex justify-center items-center h-64">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="text-center mt-10">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <div className="p-6">

            <button type="button" onClick={handleOpen}
                    className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Schedule Drive
            </button>

            <Drawer anchor="right" open={open} onClose={handleClose}>
                <DriveForm onSubmit={handleSubmit} onClose={handleClose} />
            </Drawer>

            <Typography
                variant="h4"
                className="mb-6 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center gap-2"
            >
                Vaccination Drives
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Vaccine</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Applicable Classes</strong></TableCell>
                            <TableCell><strong>Available Doses</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drives.map((drive) => (
                            <TableRow key={drive.id}>
                                <TableCell>{drive.vaccineName}</TableCell>
                                <TableCell>{new Date(drive.driveDate).toLocaleDateString()}</TableCell>
                                <TableCell>{drive.applicableClasses || 'N/A'}</TableCell>
                                <TableCell>{drive.availableDoses || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DriveList;
