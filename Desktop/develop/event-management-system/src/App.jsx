import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Maintenance from './pages/admin/Maintenance';
import MembershipManagement from './pages/admin/MembershipManagement';
import UserManagement from './pages/admin/UserManagement';
import VendorDashboard from './pages/vendor/VendorDashboard';
import UserDashboard from './pages/user/UserDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />; // Or unauthorized page
  return children;
};

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute role="Admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="memberships" element={<MembershipManagement />} />
              <Route path="users" element={<UserManagement />} />
            </Route>

            {/* Vendor Routes */}
            <Route path="/vendor/*" element={
              <ProtectedRoute role="Vendor">
                <VendorDashboard />
              </ProtectedRoute>
            } />

            {/* User Routes */}
            <Route path="/user/*" element={
              <ProtectedRoute role="User">
                <UserDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
