import React, { useEffect, useState } from 'react';
import {getAllStudents} from "../services/studentService";
import {getAllDrives} from "../services/driveService";
import {data} from "autoprefixer";

interface DashboardStats {
    totalStudents: number;
    vaccinatedStudents: number;
    upcomingDrives: {
        id: string;
        vaccineName: string;
        driveDate: string;
        applicableClasses: string[];
    }[];
}

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const today = normalizeDate(new Date());
        const fetchStats = async () => {
            const studentStats = await getAllStudents();
            const driveStats = await getAllDrives();
            const dashboardStats: DashboardStats = {
                totalStudents: studentStats.length,
                vaccinatedStudents: studentStats.filter((student: { vaccinationStatus: string; }) => student.vaccinationStatus === "Vaccinated").length,
                upcomingDrives: driveStats.filter((drive: { driveDate: string | number | Date }) => normalizeDate(new Date(drive.driveDate)) >= today)

            };

            console.log(dashboardStats);
            setStats(dashboardStats);
            setLoading(false);
        };
        fetchStats();
    }, []);

    if (loading) return <p className="text-center text-blue-500 mt-4">Loading dashboard...</p>;

    const vaccinatedPercent = stats && stats.totalStudents > 0
        ? ((stats.vaccinatedStudents / stats.totalStudents) * 100).toFixed(1)
        : '0';

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">School Vaccination Dashboard</h1>
            <div className="flex justify-center gap-4 mt-8">
                <a href="/students" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Manage Students</a>
                <a href="/drives" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Manage Drives</a>
                <a href="/reports" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Generate Reports</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-xl font-semibold">Total Students</h2>
                    <p className="text-2xl text-blue-600">{stats?.totalStudents}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-xl font-semibold">Vaccinated</h2>
                    <p className="text-2xl text-green-600">{stats?.vaccinatedStudents} ({vaccinatedPercent}%)</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-xl font-semibold">Upcoming Drives</h2>
                    <p className="text-2xl text-purple-600">{stats?.upcomingDrives.length}</p>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">Upcoming Vaccination Drives</h3>
                {stats?.upcomingDrives.length === 0 ? (
                    <p className="text-gray-500 italic">No upcoming drives</p>
                ) : (
                    <ul className="space-y-3">
                        {stats?.upcomingDrives.map((drive) => (
                            <li key={drive.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
                                <p><strong>Vaccine:</strong> {drive.vaccineName}</p>
                                <p><strong>Date:</strong> {new Date(drive.driveDate).toLocaleDateString()}</p>
                                <p><strong>Classes:</strong> {drive.applicableClasses}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
