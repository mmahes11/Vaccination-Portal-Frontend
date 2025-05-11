import React, { useEffect, useState } from 'react';
import {addStudent, getAllStudents} from '../services/studentService';
import {useNavigate} from "react-router-dom";
import StudentForm from "./StudentForm";
import { Student } from "../types/Student";

const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);


    const handleAddStudent = async (form: any) => {
        setEditingStudent(null);    // No student selected -> add new
        setDrawerOpen(true);
    };

    const handleEditStudent = (student: Student) => {
        setEditingStudent(student); // Set the student to edit
        setDrawerOpen(true);
    };
    const handleFormSubmit = (form: Student) => {
        if (editingStudent) {
            // Edit mode: update student in list
            setStudents(students.map(s =>
                s.name === editingStudent.name && s.className === editingStudent.className // or use a real unique id
                    ? form
                    : s
            ));
        } else {
            setStudents([...students, form]);
        }
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudents();
                console.log(data);
                setStudents(data);
            } catch (err) {
                setError('Failed to fetch students');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <p className="text-blue-500 text-center mt-4">Loading students...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

    function NavigateStudentForm() {
        navigate('/StudentForm');
    }

    return (
        <div className="max-w-4xl mx-auto p-4">

            <button type="button" onClick={handleAddStudent}
                    className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Add Student
            </button>
            <StudentForm
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onSubmit={handleFormSubmit}
                student={editingStudent as any}
            />
            <h2 className="text-2xl font-bold mb-4 text-center">Student List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg text-center">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b text-center">Name</th>
                        <th className="py-2 px-4 border-b text-center">Age</th>
                        <th className="py-2 px-4 border-b text-center">Class</th>
                        <th className="py-2 px-4 border-b text-center">Vaccination Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b text-center">{student.name}</td>
                            <td className="py-2 px-4 border-b text-center">{student.age}</td>
                            <td className="py-2 px-4 border-b text-center">{student.className}</td>
                            <td className="py-2 px-4 border-b text-center">
                                {student.vaccinationStatus === "Vaccinated" ? (
                                    <span className="text-green-600 font-medium">Yes</span>
                                ) : (
                                    <span className="text-red-600 font-medium">No</span>
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center"><button onClick={() => handleEditStudent(student)}>
                                Edit
                            </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
