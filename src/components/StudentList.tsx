import React, { useEffect, useState } from 'react';
import { getAllStudents } from '../services/studentService';

interface Student {
    id: string;
    name: string;
    age: number;
    class: string;
    vaccinated: boolean;
}

const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudents();
                setStudents(data);
            } catch (err) {
                setError('Failed to fetch students');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <p>Loading students...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Student List</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Class</th>
                    <th>Vaccinated</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.class}</td>
                        <td>{student.vaccinated ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
