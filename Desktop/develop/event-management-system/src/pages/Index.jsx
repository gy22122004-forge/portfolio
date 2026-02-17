import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1>Welcome to Event Management System</h1>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                Your one-stop solution for managing events, vendors, and guests.
            </p>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/signup" className="btn btn-outline">Sign Up</Link>
            </div>
        </div>
    );
};

export default Index;
