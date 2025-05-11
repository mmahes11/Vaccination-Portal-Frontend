import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Drives from './pages/Drives';
import ReportsPage from './pages/ReportsPage';
import Login from "./pages/Login";
import BackButton from "./components/BackButton";
import StudentForm from "./components/StudentForm"; // Import BackButton

const AppRoutes = () => (
    <Router>
        <BackButton /> {/* Moved here, inside Router */}
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route
                path="/students/edit/:id"
                element={
                    <StudentForm
                        open={true}
                        onClose={() => {}}
                        onSubmit={() => {}}
                    />
                }
            />
            <Route path="/drives" element={<Drives />} />
            <Route path="/reports" element={<ReportsPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;