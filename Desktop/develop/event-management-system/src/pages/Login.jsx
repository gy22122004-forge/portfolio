import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ userId: '', password: '', role: 'User' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, validation and API call would happen here.
        // For mock, we just log them in with the selected role.
        login({ ...formData, id: formData.userId, name: 'Mock User' }); // Add placeholder name

        // Redirect based on role
        if (formData.role === 'Admin') navigate('/admin');
        else if (formData.role === 'Vendor') navigate('/vendor');
        else navigate('/user');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-gradient)' }}>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ background: 'var(--primary-gradient)', webkitBackgroundClip: 'text', webkitTextFillColor: 'transparent', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Sign in to manage your events</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">User ID</label>
                        <input
                            type="text"
                            name="userId"
                            className="form-input"
                            placeholder="Enter your User ID"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Select Role</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                            {['User', 'Vendor', 'Admin'].map(role => (
                                <button
                                    key={role}
                                    type="button"
                                    className={`btn ${formData.role === role ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setFormData({ ...formData, role })}
                                    style={{ padding: '0.5rem' }}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem' }}>Sign In</button>
                        <button type="button" className="btn btn-outline" style={{ width: '100%', border: 'none' }} onClick={() => navigate('/signup')}>
                            Don't have an account? Sign Up
                        </button>
                        <button type="button" className="btn" style={{ width: '100%', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '0.5rem' }} onClick={() => navigate('/')}>
                            Back to Home
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
