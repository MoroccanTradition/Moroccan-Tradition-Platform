import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Riads from './pages/Riads';
import Announcements from './pages/Announcements';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageAnnouncements from './pages/admin/ManageAnnouncements';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ManageRiads from './pages/admin/ManageRiads';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/riads" element={<Riads />} />
            <Route path="/announcements" element={<Announcements />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/admin/products" element={<ManageProducts />} />
              <Route path="/admin/riads" element={<ManageRiads />} />
              <Route path="/admin/announcements" element={<ManageAnnouncements />} />
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;