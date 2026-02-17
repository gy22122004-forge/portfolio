import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const { items, addToGuestList, orders, addOrder } = useData();
    const navigate = useNavigate();

    const [activeView, setActiveView] = useState('Home');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedVendor, setSelectedVendor] = useState(null); // For Vendor Shop View
    const [cart, setCart] = useState([]);

    // Checkout State
    const [showCheckout, setShowCheckout] = useState(false);
    const [checkoutDetails, setCheckoutDetails] = useState({
        name: user?.name || '', number: '', email: user?.email || '',
        paymentMethod: 'Cash', address: '', state: '', city: '', pinCode: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const categories = ['Catering', 'Florist', 'Decoration', 'Lighting'];

    const getVendorsByCategory = (cat) => {
        // Get unique vendors who have items in this category
        const vendors = [];
        const seen = new Set();
        items.filter(i => i.category === cat).forEach(item => {
            if (!seen.has(item.vendorId)) {
                seen.add(item.vendorId);
                vendors.push({ id: item.vendorId, name: item.vendorName || 'Unknown Vendor' });
            }
        });
        return vendors;
    };

    const addToCart = (item) => {
        setCart([...cart, item]);
        alert(`${item.name} added to cart!`);
    };

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();
        const newOrder = {
            ...checkoutDetails,
            items: cart,
            totalAmount: cart.reduce((total, item) => total + Number(item.price), 0),
            userId: user.id
        };
        addOrder(newOrder);
        setShowCheckout(false);
        setCart([]);
        setShowSuccess(true);
    };

    const renderContent = () => {
        if (showSuccess) {
            return (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="card animate-fade-in" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', background: 'white' }}>
                        <h3 style={{ color: 'var(--primary-color)' }}>Success</h3>
                        <h2 style={{ fontSize: '2rem', margin: '0.5rem 0', background: 'var(--primary-gradient)', webkitBackgroundClip: 'text', webkitTextFillColor: 'transparent' }}>THANK YOU</h2>
                        <div style={{ background: 'var(--primary-gradient)', color: 'white', padding: '1rem', borderRadius: 'var(--border-radius)', margin: '1rem 0', fontWeight: 'bold' }}>
                            Total Amount: Rs. {checkoutDetails.totalAmount}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            {[checkoutDetails.name, checkoutDetails.number, checkoutDetails.email, checkoutDetails.paymentMethod, checkoutDetails.address, checkoutDetails.state, checkoutDetails.city, checkoutDetails.pinCode].map((detail, i) => (
                                <div key={i} style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>{detail}</div>
                            ))}
                        </div>
                        <button onClick={() => setShowSuccess(false)} className="btn btn-primary" style={{ width: '100%' }}>Continue Shopping</button>
                    </div>
                </div>
            );
        }

        switch (activeView) {
            case 'VendorBrowser': {
                if (selectedVendor) {
                    const vendorItems = items.filter(i => i.vendorId === selectedVendor.id);
                    return (
                        <div className="animate-fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '2rem' }}>{selectedVendor.name} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Products</span></h2>
                                <button onClick={() => setSelectedVendor(null)} className="btn btn-outline">Back to Vendors</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                {vendorItems.map(item => (
                                    <div key={item.id} className="card" style={{ padding: '1.5rem', textAlign: 'center', transition: 'transform 0.2s' }}>
                                        <div style={{ height: '120px', background: '#f1f5f9', borderRadius: '12px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                                            📦
                                        </div>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                                        <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>Rs. {item.price}</p>
                                        <button onClick={() => addToCart(item)} className="btn btn-primary" style={{ width: '100%' }}>Add to Cart</button>
                                    </div>
                                ))}
                            </div>
                            {vendorItems.length === 0 && <div className="card" style={{ textAlign: 'center', padding: '3rem' }}><p>No products found for this vendor.</p></div>}
                        </div>
                    )
                }

                const vendors = selectedCategory ? getVendorsByCategory(selectedCategory) : [];

                return (
                    <div className="animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem' }}>Browse Vendors</h2>
                            <button onClick={() => setActiveView('Home')} className="btn btn-outline">Back to Home</button>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => { setSelectedCategory(cat); setSelectedVendor(null); }}
                                    className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                                    style={{ minWidth: '120px' }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {selectedCategory && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                {vendors.map(v => (
                                    <div key={v.id} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                                        <div style={{ width: '80px', height: '80px', background: 'var(--primary-gradient)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>
                                            👤
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{v.name}</h3>
                                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Verified Vendor</p>
                                        <button
                                            onClick={() => setSelectedVendor(v)}
                                            className="btn btn-outline"
                                            style={{ width: '100%' }}
                                        >
                                            View Shop
                                        </button>
                                    </div>
                                ))}
                                {vendors.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.5)', borderRadius: '16px' }}>No vendors found for {selectedCategory}.</div>}
                            </div>
                        )}
                    </div>
                );
            }

            case 'Cart': {
                const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
                return (
                    <div className="animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem' }}>Your Cart</h2>
                            <button onClick={() => setActiveView('Home')} className="btn btn-outline">Back to Dashboard</button>
                        </div>

                        {cart.length === 0 ? <div className="card" style={{ textAlign: 'center', padding: '4rem' }}><p>Your cart is empty.</p></div> : (
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {cart.map((item, index) => (
                                        <div key={index} className="card" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '50px', height: '50px', background: '#f1f5f9', borderRadius: '8px' }}></div>
                                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.name}</span>
                                            </div>
                                            <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>Rs. {item.price}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="card" style={{ height: 'fit-content' }}>
                                    <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span>Subtotal</span>
                                        <span>Rs. {total}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                        <span>Tax (0%)</span>
                                        <span>Rs. 0</span>
                                    </div>
                                    <div style={{ borderTop: '2px solid #e2e8f0', margin: '0 0 1.5rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                        <span>Total</span>
                                        <span>Rs. {total}</span>
                                    </div>
                                    <button onClick={() => setShowCheckout(true)} className="btn btn-primary" style={{ width: '100%' }}>Proceed to Checkout</button>
                                </div>
                            </div>
                        )}

                        {/* Checkout Popup */}
                        {showCheckout && (
                            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                                <div className="card animate-fade-in" style={{ padding: '2rem', width: '600px', maxHeight: '90vh', overflowY: 'auto', background: 'white' }}>
                                    <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Checkout</h3>

                                    <form onSubmit={handleCheckoutSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div>
                                            <label className="form-label">Full Name</label>
                                            <input className="form-input" placeholder="Name" value={checkoutDetails.name} onChange={e => setCheckoutDetails({ ...checkoutDetails, name: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label className="form-label">Phone Number</label>
                                            <input className="form-input" placeholder="Number" value={checkoutDetails.number} onChange={e => setCheckoutDetails({ ...checkoutDetails, number: e.target.value })} required />
                                        </div>

                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label className="form-label">Email Address</label>
                                            <input className="form-input" placeholder="E-mail" value={checkoutDetails.email} onChange={e => setCheckoutDetails({ ...checkoutDetails, email: e.target.value })} required />
                                        </div>

                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label className="form-label">Payment Method</label>
                                            <select className="form-select" value={checkoutDetails.paymentMethod} onChange={e => setCheckoutDetails({ ...checkoutDetails, paymentMethod: e.target.value })}>
                                                <option value="Cash">Cash on Delivery</option>
                                                <option value="UPI">UPI / Online Payment</option>
                                            </select>
                                        </div>

                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label className="form-label">Delivery Address</label>
                                            <input className="form-input" placeholder="Street Address" value={checkoutDetails.address} onChange={e => setCheckoutDetails({ ...checkoutDetails, address: e.target.value })} required />
                                        </div>

                                        <div>
                                            <label className="form-label">State</label>
                                            <input className="form-input" placeholder="State" value={checkoutDetails.state} onChange={e => setCheckoutDetails({ ...checkoutDetails, state: e.target.value })} required />
                                        </div>

                                        <div>
                                            <label className="form-label">City</label>
                                            <input className="form-input" placeholder="City" value={checkoutDetails.city} onChange={e => setCheckoutDetails({ ...checkoutDetails, city: e.target.value })} required />
                                        </div>

                                        <div>
                                            <label className="form-label">Pin Code</label>
                                            <input className="form-input" placeholder="Pin Code" value={checkoutDetails.pinCode} onChange={e => setCheckoutDetails({ ...checkoutDetails, pinCode: e.target.value })} required />
                                        </div>

                                        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm Order</button>
                                            <button type="button" onClick={() => setShowCheckout(false)} className="btn btn-outline" style={{ flex: 1, borderColor: '#ef4444', color: '#ef4444' }}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                );
            }

            case 'OrderStatus': {
                const myOrders = orders.filter(o => o.userId === user.id);
                return (
                    <div className="animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <button onClick={() => setActiveView('Home')} className="btn btn-outline">Back to Home</button>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor: 'var(--danger-gradient)', color: '#ef4444' }}>Log Out</button>
                        </div>

                        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <div style={{ background: 'var(--primary-gradient)', padding: '1.5rem', color: 'white', textAlign: 'center' }}>
                                <h2 style={{ margin: 0, color: 'white' }}>Order History</h2>
                            </div>

                            {myOrders.length === 0 ? <div style={{ padding: '3rem', textAlign: 'center' }}>No orders found.</div> : (
                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {myOrders.map(order => (
                                        <div key={order.id} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>ORDER NAME</span>
                                                    <span style={{ fontWeight: '600' }}>{order.name}</span>
                                                </div>
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>EMAIL</span>
                                                    <span style={{ fontWeight: '600' }}>{order.email}</span>
                                                </div>
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>ADDRESS</span>
                                                    <span style={{ fontWeight: '600' }}>{order.address}</span>
                                                </div>
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>STATUS</span>
                                                    <span style={{
                                                        display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold',
                                                        background: order.status === 'Received' ? '#dbeafe' : order.status === 'Out For Delivery' ? '#dcfce7' : '#fef3c7',
                                                        color: order.status === 'Received' ? '#1e40af' : order.status === 'Out For Delivery' ? '#166534' : '#92400e'
                                                    }}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            }

            default:
                return (
                    <div className="animate-fade-in" style={{
                        background: 'var(--card-bg)', backdropFilter: 'blur(10px)', padding: '4rem 2rem', borderRadius: 'var(--border-radius)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem',
                        boxShadow: 'var(--shadow-lg)', border: '1px solid var(--glass-border)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'var(--primary-gradient)', webkitBackgroundClip: 'text', webkitTextFillColor: 'transparent' }}>Hello, {user.name}!</h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>What would you like to explore today?</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', width: '100%', maxWidth: '900px' }}>
                            <button onClick={() => setActiveView('VendorBrowser')} className="card btn" style={{ flexDirection: 'column', padding: '2rem', height: 'auto', gap: '1rem', background: 'white' }}>
                                <span style={{ fontSize: '3rem' }}>🛍️</span>
                                <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Browse Vendors</span>
                            </button>
                            <button onClick={() => setActiveView('Cart')} className="card btn" style={{ flexDirection: 'column', padding: '2rem', height: 'auto', gap: '1rem', background: 'white' }}>
                                <span style={{ fontSize: '3rem' }}>🛒</span>
                                <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>My Cart</span>
                            </button>
                            <button onClick={() => setActiveView('OrderStatus')} className="card btn" style={{ flexDirection: 'column', padding: '2rem', height: 'auto', gap: '1rem', background: 'white' }}>
                                <span style={{ fontSize: '3rem' }}>📦</span>
                                <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Orders</span>
                            </button>
                            <button onClick={() => setActiveView('GuestList')} className="card btn" style={{ flexDirection: 'column', padding: '2rem', height: 'auto', gap: '1rem', background: 'white' }}>
                                <span style={{ fontSize: '3rem' }}>📋</span>
                                <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Guest List</span>
                            </button>
                        </div>

                        <button onClick={handleLogout} className="btn" style={{ marginTop: '2rem', color: '#ef4444' }}>Sign Out</button>
                    </div>
                );
        }
    };

    return (
        <div className="container" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
            {renderContent()}
        </div>
    );
};

export default UserDashboard;
