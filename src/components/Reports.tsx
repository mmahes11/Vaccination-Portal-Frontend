import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { getAllStudents } from '../services/studentService';

interface ReportEntry {
    id: string;
    name: string;
    class: string;
    vaccine: string;
    date: string;
    vaccinated: boolean;
}

const Reports: React.FC = () => {
    const [reports, setReports] = useState<ReportEntry[]>([]);
    const [filtered, setFiltered] = useState<ReportEntry[]>([]);
    const [vaccineFilter, setVaccineFilter] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchReports = async () => {
            const data = await getAllStudents(); // Assuming this returns vaccination info too
            setReports(data);
            setFiltered(data);
        };
        fetchReports();
    }, []);

    useEffect(() => {
        if (vaccineFilter === 'All') {
            setFiltered(reports);
        } else {
            setFiltered(reports.filter(r => r.vaccine === vaccineFilter));
        }
        setCurrentPage(1);
    }, [vaccineFilter, reports]);

    const vaccines = Array.from(new Set(reports.map(r => r.vaccine)));

    const paginated = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <div>
            <h2>Vaccination Reports</h2>

            <div className="mb-3">
                <label>Filter by Vaccine:</label>
                <select
                    className="form-select"
                    value={vaccineFilter}
                    onChange={(e) => setVaccineFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    {vaccines.map((vaccine) => (
                        <option key={vaccine} value={vaccine}>
                            {vaccine}
                        </option>
                    ))}
                </select>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Vaccine</th>
                    <th>Date</th>
                    <th>Vaccinated</th>
                </tr>
                </thead>
                <tbody>
                {paginated.map((entry) => (
                    <tr key={entry.id}>
                        <td>{entry.name}</td>
                        <td>{entry.class}</td>
                        <td>{entry.vaccine}</td>
                        <td>{new Date(entry.date).toLocaleDateString()}</td>
                        <td>{entry.vaccinated ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center">
                <div>
                    Page {currentPage} of {totalPages}
                </div>
                <div>
                    <button
                        className="btn btn-secondary me-2"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-secondary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="mt-3">
                <CSVLink
                    data={filtered}
                    filename="vaccination_report.csv"
                    className="btn btn-success"
                >
                    Export CSV
                </CSVLink>
            </div>
        </div>
    );
};

export default Reports;
