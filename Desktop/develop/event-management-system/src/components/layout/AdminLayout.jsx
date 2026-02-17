import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, CreditCard, LogOut, Settings } from 'lucide-react';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
            {/* Sidebar */}
            <aside style={{ width: '280px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                <div style={{ padding: '2.5rem 2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', background: 'var(--primary-gradient)', webkitBackgroundClip: 'text', webkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>EventSys Admin</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: '500' }}>
                        Welcome, {user?.name || 'Admin'}
                    </p>
                </div>

                <nav style={{ flex: 1, padding: '1rem' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {[
                            { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
                            { path: '/admin/maintenance', icon: Settings, label: 'Maintenance' },
                            { path: '/admin/users', icon: Users, label: 'User Management' },
                            { path: '/admin/memberships', icon: CreditCard, label: 'Memberships' }
                        ].map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                                        color: isActive(item.path) ? 'white' : 'var(--text-secondary)',
                                        background: isActive(item.path) ? 'var(--primary-gradient)' : 'transparent',
                                        textDecoration: 'none', borderRadius: '12px', fontWeight: isActive(item.path) ? '600' : '500',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <item.icon size={20} /> {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ padding: '2rem' }}>
                    <button
                        onClick={handleLogout}
                        className="btn"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%',
                            padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: 'none',
                            color: '#ef4444', cursor: 'pointer', fontSize: '1rem', fontWeight: '600'
                        }}
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
