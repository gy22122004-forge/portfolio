import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Mock Data States
    const [items, setItems] = useState([]);
    const [memberships, setMemberships] = useState([]);
    const [users, setUsers] = useState([]); // This will store both Users and Vendors
    const [guestLists, setGuestLists] = useState({}); // Map userId to list of guests
    const [orders, setOrders] = useState([]); // Store all orders

    // Load initial data
    useEffect(() => {
        const loadData = () => {
            const storedItems = JSON.parse(localStorage.getItem('ums_items') || '[]');
            const storedMemberships = JSON.parse(localStorage.getItem('ums_memberships') || '[]');
            const storedUsers = JSON.parse(localStorage.getItem('ums_users') || '[]');
            const storedGuestLists = JSON.parse(localStorage.getItem('ums_guestlists') || '{}');
            const storedOrders = JSON.parse(localStorage.getItem('ums_orders') || '[]');

            const MOCK_ITEMS = [
                { id: '1', name: 'Gourmet Buffet', price: '1500', category: 'Catering', vendorId: 'vendor1', vendorName: 'Tasty Treats', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=500' },
                { id: '2', name: 'Wedding Cake', price: '3000', category: 'Catering', vendorId: 'vendor1', vendorName: 'Tasty Treats', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=500' },
                { id: '3', name: 'Rose Bouquet', price: '800', category: 'Florist', vendorId: 'vendor2', vendorName: 'Floral Dreams', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0fee?w=500' },
                { id: '4', name: 'Tulip Arrangement', price: '1200', category: 'Florist', vendorId: 'vendor2', vendorName: 'Floral Dreams', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=500' },
                { id: '5', name: 'Fairy Lights', price: '500', category: 'Decoration', vendorId: 'vendor3', vendorName: 'Sparkle Decor', image: 'https://images.unsplash.com/photo-1549755833-8a3d5e20600a?w=500' },
                { id: '6', name: 'Balloon Arch', price: '2000', category: 'Decoration', vendorId: 'vendor3', vendorName: 'Sparkle Decor', image: 'https://images.unsplash.com/photo-1530103862676-de3c9da59af7?w=500' },
                { id: '7', name: 'Spotlights', price: '1000', category: 'Lighting', vendorId: 'vendor4', vendorName: 'Bright Lights', image: 'https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?w=500' },
                { id: '8', name: 'Ambient LED Set', price: '2500', category: 'Lighting', vendorId: 'vendor4', vendorName: 'Bright Lights', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=500' },
            ];

            setItems(storedItems.length > 0 ? storedItems : MOCK_ITEMS);
            setMemberships(storedMemberships);
            setUsers(storedUsers);
            setGuestLists(storedGuestLists);
            setOrders(storedOrders);
        };
        loadData();
    }, []);

    // Sync with localStorage whenever data changes
    useEffect(() => { localStorage.setItem('ums_items', JSON.stringify(items)); }, [items]);
    useEffect(() => { localStorage.setItem('ums_memberships', JSON.stringify(memberships)); }, [memberships]);
    useEffect(() => { localStorage.setItem('ums_users', JSON.stringify(users)); }, [users]);
    useEffect(() => { localStorage.setItem('ums_guestlists', JSON.stringify(guestLists)); }, [guestLists]);
    useEffect(() => { localStorage.setItem('ums_orders', JSON.stringify(orders)); }, [orders]);

    // Data Actions
    const addItem = (item) => setItems(prev => [...prev, { ...item, id: Date.now().toString(), status: 'Active' }]);
    const updateItem = (id, updates) => setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    const deleteItem = (id) => setItems(prev => prev.filter(item => item.id !== id));

    const addMembership = (membership) => setMemberships(prev => [...prev, { ...membership, id: Date.now().toString() }]);
    const updateMembership = (id, updates) => setMemberships(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));

    const addUser = (newUser) => setUsers(prev => [...prev, { ...newUser, id: Date.now().toString() }]);

    const addToGuestList = (userId, guest) => {
        setGuestLists(prev => {
            const userList = prev[userId] || [];
            return { ...prev, [userId]: [...userList, { ...guest, id: Date.now().toString() }] };
        });
    };

    const removeFromGuestList = (userId, guestId) => {
        setGuestLists(prev => {
            const userList = prev[userId] || [];
            return { ...prev, [userId]: userList.filter(g => g.id !== guestId) };
        });
    };

    const addOrder = (order) => {
        setOrders(prev => [...prev, { ...order, id: Date.now().toString(), status: 'Received', date: new Date().toISOString() }]);
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    };

    const value = {
        items, addItem, updateItem, deleteItem,
        memberships, addMembership, updateMembership,
        users, addUser,
        guestLists, addToGuestList, removeFromGuestList,
        orders, addOrder, updateOrderStatus
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
