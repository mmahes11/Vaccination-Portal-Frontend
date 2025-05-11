import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Hide on home page
    if (location.pathname === '/Home' || location.pathname === '/') return null;

    return (
        <div className="absolute top-4 left-4 z-50">
            <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
                className="!bg-blue-600 hover:!bg-blue-800"
                onClick={() => navigate('/Home')}
                sx={{
                    textTransform: 'none',
                    boxShadow: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: 500,
                }}
            >
                Back to Home
            </Button>
        </div>
    );
};

export default BackButton;