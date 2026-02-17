import React from 'react';
import { Link } from 'react-router-dom';
import { Users, CreditCard } from 'lucide-react';

const Maintenance = () => {
    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Maintenance Menu</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

                <Link to="/admin/memberships" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card" style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center', transition: 'transform 0.2s' }}>
                        <CreditCard size={48} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
                        <h3>Membership Management</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Add or Update Vendor Memberships</p>
                    </div>
                </Link>

                <Link to="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card" style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center', transition: 'transform 0.2s' }}>
                        <Users size={48} style={{ color: 'var(--success-color)', marginBottom: '1rem' }} />
                        <h3>User/Vendor Management</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage System Users and Vendors</p>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Maintenance;
