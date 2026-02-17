import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
    const { user, logout } = useAuth();
    const { items, addItem, deleteItem, updateItem, orders, updateOrderStatus } = useData();
    const navigate = useNavigate();

    // State for the active view/tab
    const [activeView, setActiveView] = useState('ViewProduct'); // Default to ViewProduct as per wireframe

    // State for Adding Product
    const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

    // State for Order Management
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusUpdate, setStatusUpdate] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price) return alert("Please fill in required fields");

        addItem({
            ...newProduct,
            vendorId: user.id,
            vendorName: user.name,
            category: user.category || 'General'
        });

        setNewProduct({ name: '', price: '', image: '' });
        alert("Product Added!");
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            deleteItem(id);
        }
    };

    const handleUpdateStatus = () => {
        if (selectedOrder && statusUpdate) {
            updateOrderStatus(selectedOrder.id, statusUpdate);
            setSelectedOrder(null);
            setStatusUpdate('');
        }
    };

    // Filter items for this vendor
    const myItems = items.filter(item => item.vendorId === user?.id);

    // Filter orders for this vendor
    const myOrders = orders.filter(order =>
        order.items.some(item => item.vendorId === user.id)
    );

    return (
        <div className="container animate-fade-in" style={{ marginTop: '2rem', paddingBottom: '4rem', maxWidth: '1200px' }}>

            {/* Header / Navigation Bar */}
            <div className="card" style={{
                padding: '1rem 2rem', marginBottom: '2rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'var(--primary-gradient)', color: 'white'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Welcome '{user?.name || 'Vendor'}'</h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setActiveView('ProductStatus')}
                        className="btn"
                        style={{ background: activeView === 'ProductStatus' ? 'rgba(255,255,255,0.2)' : 'white', color: activeView === 'ProductStatus' ? 'white' : 'var(--primary-color)' }}
                    >
                        Product Status
                    </button>
                    <button
                        onClick={() => setActiveView('RequestItem')}
                        className="btn"
                        style={{ background: activeView === 'RequestItem' ? 'rgba(255,255,255,0.2)' : 'white', color: activeView === 'RequestItem' ? 'white' : 'var(--primary-color)' }}
                    >
                        Request Item
                    </button>
                    <button
                        onClick={() => setActiveView('ViewProduct')}
                        className="btn"
                        style={{ background: activeView === 'ViewProduct' ? 'rgba(255,255,255,0.2)' : 'white', color: activeView === 'ViewProduct' ? 'white' : 'var(--primary-color)' }}
                    >
                        View Product
                    </button>
                    <button
                        onClick={handleLogout}
                        className="btn"
                        style={{ background: '#ef4444', color: 'white', border: 'none' }}
                    >
                        Log Out
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="animate-fade-in">
                {activeView === 'ViewProduct' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>

                        {/* Left: Add Product Form */}
                        <div className="card" style={{ padding: '2rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <input
                                    className="form-input"
                                    placeholder="Product Name"
                                    value={newProduct.name}
                                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                    style={{ padding: '1rem', borderRadius: '8px' }}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Product Price"
                                    type="number"
                                    value={newProduct.price}
                                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                    style={{ padding: '1rem', borderRadius: '8px' }}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Product Image URL"
                                    value={newProduct.image}
                                    onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                                    style={{ padding: '1rem', borderRadius: '8px' }}
                                />
                                <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>Add The Product</button>
                            </form>
                        </div>

                        {/* Right: Product Grid */}
                        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1.5fr 1fr 1fr', gap: '1rem', padding: '1rem', background: '#3b82f6', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                                <div>Product Image</div>
                                <div>Product Name</div>
                                <div>Product Price</div>
                                <div>Action</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {myItems.length === 0 ? (
                                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No products found.</div>
                                ) : (
                                    myItems.map(item => (
                                        <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '100px 1.5fr 1fr 1fr', gap: '1rem', padding: '1rem', alignItems: 'center', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                                            <div style={{ width: '80px', height: '80px', margin: '0 auto', background: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {item.image ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'img'}
                                            </div>
                                            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{item.name}</div>
                                            <div style={{}}>Rs. {item.price}/-</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                                                <button onClick={() => handleDelete(item.id)} className="btn btn-primary" style={{ width: '80%', padding: '0.4rem', fontSize: '0.9rem', background: '#ef4444', border: 'none' }}>Delete</button>
                                                <button className="btn btn-primary" style={{ width: '80%', padding: '0.4rem', fontSize: '0.9rem' }}>Update</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeView === 'ProductStatus' && (
                    <div className="card">
                        <h2 style={{ marginBottom: '1.5rem' }}>Product Status (Orders)</h2>
                        {myOrders.length === 0 ? <p>No orders yet.</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem' }}>Customer</th>
                                        <th style={{ padding: '1rem' }}>Status</th>
                                        <th style={{ padding: '1rem' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myOrders.map(order => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '1rem' }}>{order.name}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: '#e0f2fe', color: '#0369a1' }}>{order.status}</span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <button onClick={() => setSelectedOrder(order)} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Update Status</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {/* Update Popup */}
                        {selectedOrder && (
                            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                                <div className="card" style={{ padding: '2rem', background: 'white', minWidth: '300px' }}>
                                    <h3>Update Status</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
                                        {['Received', 'Ready for Shipping', 'Out For Delivery'].map(s => (
                                            <label key={s}><input type="radio" checked={statusUpdate === s} value={s} onChange={e => setStatusUpdate(e.target.value)} /> {s}</label>
                                        ))}
                                    </div>
                                    <button onClick={handleUpdateStatus} className="btn btn-primary">Save</button>
                                    <button onClick={() => setSelectedOrder(null)} className="btn btn-outline" style={{ marginLeft: '1rem' }}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeView === 'RequestItem' && (
                    <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <h2>Request Item</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Feature coming soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VendorDashboard;
