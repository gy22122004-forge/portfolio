import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const MembershipManagement = () => {
    const [activeTab, setActiveTab] = useState('add');
    const { addMembership, memberships, updateMembership } = useData();

    // Add Form State
    const [addForm, setAddForm] = useState({
        vendorName: '',
        duration: '6 months',
    });

    // Update Form State
    const [searchId, setSearchId] = useState('');
    const [foundMembership, setFoundMembership] = useState(null);

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addMembership({
            ...addForm,
            startDate: new Date().toISOString(),
            status: 'Active'
        });
        alert('Membership Added!');
        setAddForm({ vendorName: '', duration: '6 months' });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const found = memberships.find(m => m.id === searchId);
        if (found) setFoundMembership(found);
        else alert('Membership ID not found');
    };

    const handleUpdate = (action) => {
        if (!foundMembership) return;

        if (action === 'cancel') {
            updateMembership(foundMembership.id, { status: 'Cancelled' });
            alert('Membership Cancelled');
            setFoundMembership(prev => ({ ...prev, status: 'Cancelled' }));
        } else if (action === 'extend') {
            // Logic to extend date would go here
            alert('Membership Extended (Mock)');
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'var(--primary-gradient)', webkitBackgroundClip: 'text', webkitTextFillColor: 'transparent' }}>Membership Management</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Manage vendor subscriptions and plans.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', padding: '0.5rem', background: 'var(--card-bg)', borderRadius: '16px', width: 'fit-content' }}>
                <button
                    className={`btn`}
                    style={{
                        background: activeTab === 'add' ? 'var(--primary-gradient)' : 'transparent',
                        color: activeTab === 'add' ? 'white' : 'var(--text-secondary)',
                        boxShadow: activeTab === 'add' ? 'var(--shadow-md)' : 'none'
                    }}
                    onClick={() => setActiveTab('add')}
                >
                    Add Membership
                </button>
                <button
                    className={`btn`}
                    style={{
                        background: activeTab === 'update' ? 'var(--primary-gradient)' : 'transparent',
                        color: activeTab === 'update' ? 'white' : 'var(--text-secondary)',
                        boxShadow: activeTab === 'update' ? 'var(--shadow-md)' : 'none'
                    }}
                    onClick={() => setActiveTab('update')}
                >
                    Update Membership
                </button>
            </div>

            {activeTab === 'add' && (
                <div className="card animate-fade-in">
                    <h2 style={{ marginBottom: '1.5rem' }}>Add New Membership</h2>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label className="form-label">Vendor Name (Mandatory)</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter vendor name"
                                value={addForm.vendorName}
                                onChange={e => setAddForm({ ...addForm, vendorName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Duration</label>
                            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                                {['6 months', '1 year', '2 years'].map(duration => (
                                    <label key={duration} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: addForm.duration === duration ? '#eff6ff' : 'white', borderColor: addForm.duration === duration ? '#3b82f6' : 'var(--border-color)' }}>
                                        <input
                                            type="radio"
                                            name="duration"
                                            value={duration}
                                            checked={addForm.duration === duration}
                                            onChange={e => setAddForm({ ...addForm, duration: e.target.value })}
                                            style={{ accentColor: '#3b82f6' }}
                                        />
                                        <span style={{ fontWeight: '500', color: addForm.duration === duration ? '#1d4ed8' : 'var(--text-primary)' }}>{duration}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem 2rem' }}>Add Membership</button>
                    </form>
                </div>
            )}

            {activeTab === 'update' && (
                <div className="card animate-fade-in">
                    <h2 style={{ marginBottom: '1.5rem' }}>Update Membership</h2>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                            <label className="form-label">Search by Membership ID</label>
                            <input
                                type="text"
                                className="form-input"
                                value={searchId}
                                onChange={e => setSearchId(e.target.value)}
                                required
                                placeholder="Enter ID..."
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ height: '50px' }}>Search</button>
                    </form>

                    {foundMembership && (
                        <div className="animate-fade-in" style={{ marginTop: '2rem', padding: '2rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>VENDOR</span>
                                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{foundMembership.vendorName}</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>DURATION</span>
                                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{foundMembership.duration}</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Current Status</span>
                                    <span style={{
                                        display: 'inline-block', marginTop: '0.25rem', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold',
                                        background: foundMembership.status === 'Active' ? '#dcfce7' : '#fee2e2',
                                        color: foundMembership.status === 'Active' ? '#166534' : '#991b1b'
                                    }}>
                                        {foundMembership.status}
                                    </span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleUpdate('extend')}
                                    disabled={foundMembership.status !== 'Active'}
                                    style={{ flex: 1, opacity: foundMembership.status !== 'Active' ? 0.5 : 1 }}
                                >
                                    Extend Membership
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleUpdate('cancel')}
                                    disabled={foundMembership.status !== 'Active'}
                                    style={{ flex: 1, opacity: foundMembership.status !== 'Active' ? 0.5 : 1 }}
                                >
                                    Cancel Membership
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MembershipManagement;
