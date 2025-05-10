import React, { useEffect, useState } from 'react';
import { getAllDrives } from '../services/driveService';

interface Drive {
    id: string;
    vaccine: string;
    date: string;
    location?: string;
}

const DriveList: React.FC = () => {
    const [drives, setDrives] = useState<Drive[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <p>Loading drives...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Vaccination Drives</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Vaccine</th>
                    <th>Date</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {drives.map((drive) => (
                    <tr key={drive.id}>
                        <td>{drive.vaccine}</td>
                        <td>{new Date(drive.date).toLocaleDateString()}</td>
                        <td>{drive.location || 'N/A'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DriveList;
