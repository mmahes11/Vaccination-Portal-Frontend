import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
} from '@mui/material';
import { getStudentVaccinationDetails } from '../services/vaccineReports';

interface ReportEntry {
    id: string;
    name: string;
    className: string;
    vaccineName: string;
    vaccinationDate: string;
}

const Reports: React.FC = () => {
    const [reports, setReports] = useState<ReportEntry[]>([]);
    const [filtered, setFiltered] = useState<ReportEntry[]>([]);
    const [vaccineFilter, setVaccineFilter] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchReports = async () => {
            const data = await getStudentVaccinationDetails();
            setReports(data);
            setFiltered(data);
        };
        fetchReports();
    }, []);

    useEffect(() => {
        if (vaccineFilter === 'All') {
            setFiltered(reports);
        } else {
            setFiltered(reports.filter(r => r.vaccineName === vaccineFilter));
        }
        setCurrentPage(1);
    }, [vaccineFilter, reports]);

    const vaccines = Array.from(new Set(reports.map(r => r.vaccineName)));

    const paginated = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <Box className="p-6">
            <Typography className="text-center" variant="h4" gutterBottom>
                Vaccination Reports
            </Typography>

            <FormControl fullWidth className="mb-6">
                <InputLabel>Filter by Vaccine</InputLabel>
                <Select
                    value={vaccineFilter}
                    label="Filter by Vaccine"
                    onChange={(e) => setVaccineFilter(e.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
                    {vaccines.map((vaccine) => (
                        <MenuItem key={vaccine} value={vaccine}>
                            {vaccine}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TableContainer component={Paper} className="mb-6">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Vaccine</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginated.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell>{entry.name}</TableCell>
                                <TableCell>{entry.className}</TableCell>
                                <TableCell>{entry.vaccineName}</TableCell>
                                <TableCell>
                                    {new Date(entry.vaccinationDate).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box className="flex justify-between items-center mb-4">
                <Typography>
                    Page {currentPage} of {totalPages}
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        className="mr-2"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next
                    </Button>
                </Box>
            </Box>

            <CSVLink
                data={filtered}
                filename="vaccination_report.csv"
                className="inline-block"
            >
                <Button variant="contained" color="success">
                    Export CSV
                </Button>
            </CSVLink>
        </Box>
    );
};

export default Reports;
