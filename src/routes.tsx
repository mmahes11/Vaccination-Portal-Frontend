import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Drives from './pages/Drives';
import ReportsPage from './pages/ReportsPage';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/drives" element={<Drives />} />
            <Route path="/reports" element={<ReportsPage />} />
        </Routes>
    </Router>
);

export default AppRoutes;
