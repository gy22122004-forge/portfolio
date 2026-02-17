import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, CreditCard, ShoppingBag, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();

    // Mock stats
    const stats = [
        { label: 'Total Users', value: '1,234', icon: Users, color: '#3b82f6' },
        { label: 'Total Revenue', value: 'Rs. 45.2k', icon: TrendingUp, color: '#10b981' },
        { label: 'Active Orders', value: '56', icon: ShoppingBag, color: '#f59e0b' },
        { label: 'Memberships', value: '89', icon: CreditCard, color: '#8b5cf6' },
    ];

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'var(--primary-gradient)', webkitBackgroundClip: 'text', webkitTextFillColor: 'transparent' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Welcome back to the admin control panel.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                            <stat.icon size={30} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>{stat.label}</p>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Chart visualizations would go here...</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
