import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const UserManagement = () => {
    const { users, addUser } = useData();
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', role: 'User', email: '', category: 'Catering' });

    const handleAdd = (e) => {
        e.preventDefault();
        addUser(newUser);
        setShowAddForm(false);
        setNewUser({ name: '', role: 'User', email: '', category: 'Catering' });
    };

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'var(--primary-gradient)', webkitBackgroundClip: 'text', webkitTextFillColor: 'transparent' }}>User & Vendor Management</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>View and manage system users.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
                    + Add New User
                </button>
            </div>

            {showAddForm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="card animate-fade-in" style={{ width: '500px', padding: '2rem', background: 'white' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Add New User/Vendor</h3>
                        <form onSubmit={handleAdd}>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    className="form-input"
                                    placeholder="Full Name"
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-input"
                                    placeholder="email@example.com"
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Role</label>
                                <select
                                    className="form-select"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option>User</option>
                                    <option>Vendor</option>
                                </select>
                            </div>

                            {newUser.role === 'Vendor' && (
                                <div className="form-group animate-fade-in">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        value={newUser.category}
                                        onChange={e => setNewUser({ ...newUser, category: e.target.value })}
                                    >
                                        <option>Catering</option>
                                        <option>Florist</option>
                                        <option>Decoration</option>
                                        <option>Lighting</option>
                                    </select>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save User</button>
                                <button type="button" className="btn btn-outline" style={{ flex: 1, borderColor: '#ef4444', color: '#ef4444' }} onClick={() => setShowAddForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr 1fr', gap: '1rem', padding: '1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <div>NAME</div>
                    <div>ROLE</div>
                    <div>EMAIL</div>
                    <div>USER ID</div>
                </div>

                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {users.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No users found.</div>
                    ) : (
                        users.map(user => (
                            <div key={user.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr 1fr', gap: '1rem', padding: '1rem', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: user.role === 'Vendor' ? '#ffedd5' : '#dbeafe', color: user.role === 'Vendor' ? '#c2410c' : '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div>{user.name}</div>
                                        {user.role === 'Vendor' && <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.category}</div>}
                                    </div>
                                </div>
                                <div>
                                    <span style={{
                                        padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold',
                                        background: user.role === 'Vendor' ? '#fff7ed' : '#f0f9ff',
                                        color: user.role === 'Vendor' ? '#c2410c' : '#0369a1',
                                        border: `1px solid ${user.role === 'Vendor' ? '#ffedd5' : '#e0f2fe'}`
                                    }}>
                                        {user.role}
                                    </span>
                                </div>
                                <div style={{ color: 'var(--text-secondary)' }}>{user.email}</div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' }}>{user.id}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
