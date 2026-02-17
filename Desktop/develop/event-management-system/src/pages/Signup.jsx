
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    // Allow toggling between User and Admin.
    const [role, setRole] = useState('User');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically call an API to register
        console.log("Registering:", { ...formData, role });
        // For mock purposes, we might want to actually register them in context if we had a register function,
        // but for now navigation to login is the standard flow here.
        navigate('/login');
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0' }}>
            {/* Main Container */}
            <div className="card animate-fade-in" style={{
                width: '100%', maxWidth: '800px', padding: '3rem',
                background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)',
                borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>

                {/* Header */}
                <div style={{
                    background: '#3b82f6', color: 'white', padding: '1rem',
                    borderRadius: '12px', textAlign: 'center', marginBottom: '3rem',
                    boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)'
                }}>
                    <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Sign Up</h1>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Role Toggle */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <button
                            type="button"
                            onClick={() => setRole('User')}
                            style={{
                                padding: '0.5rem 2rem', borderRadius: '20px', border: 'none',
                                background: role === 'User' ? '#3b82f6' : 'transparent',
                                color: role === 'User' ? 'white' : '#64748b',
                                fontWeight: 'bold', cursor: 'pointer',
                                border: `2px solid ${role === 'User' ? '#3b82f6' : '#cbd5e1'}`
                            }}
                        >
                            User
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('Admin')}
                            style={{
                                padding: '0.5rem 2rem', borderRadius: '20px', border: 'none',
                                background: role === 'Admin' ? '#3b82f6' : 'transparent',
                                color: role === 'Admin' ? 'white' : '#64748b',
                                fontWeight: 'bold', cursor: 'pointer',
                                border: `2px solid ${role === 'Admin' ? '#3b82f6' : '#cbd5e1'}`
                            }}
                        >
                            Admin
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#64748b', fontWeight: '500' }}>
                        Creating account as <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>{role}</span>
                    </div>

                    {/* Form Row: Name */}
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem', alignItems: 'center' }}>
                        <div style={{
                            background: '#1e3a8a', color: 'white', padding: '1rem',
                            borderRadius: '8px', textAlign: 'center', fontWeight: '500',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            Name
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            style={{
                                padding: '1rem', borderRadius: '8px', border: 'none',
                                background: '#3b82f6', color: 'white', outline: 'none',
                                placeholderColor: 'rgba(255,255,255,0.7)',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            required
                        />
                    </div>

                    {/* Form Row: Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem', alignItems: 'center' }}>
                        <div style={{
                            background: '#1e3a8a', color: 'white', padding: '1rem',
                            borderRadius: '8px', textAlign: 'center', fontWeight: '500',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            Email
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            style={{
                                padding: '1rem', borderRadius: '8px', border: 'none',
                                background: '#3b82f6', color: 'white', outline: 'none',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            required
                        />
                    </div>

                    {/* Form Row: Password */}
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem', alignItems: 'center' }}>
                        <div style={{
                            background: '#1e3a8a', color: 'white', padding: '1rem',
                            borderRadius: '8px', textAlign: 'center', fontWeight: '500',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            Password
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            style={{
                                padding: '1rem', borderRadius: '8px', border: 'none',
                                background: '#3b82f6', color: 'white', outline: 'none',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div style={{ display: 'flex', justifySelf: 'center', margin: '2rem auto 0', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}>
                        <button
                            type="submit"
                            className="btn"
                            style={{
                                background: '#2563eb', color: 'white', padding: '1rem 4rem',
                                borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold',
                                boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)'
                            }}
                        >
                            Sign Up
                        </button>
                        <button type="button" className="btn" style={{ color: '#475569', fontSize: '0.9rem' }} onClick={() => navigate('/login')}>
                            Already have an account? Sign In
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Signup;
