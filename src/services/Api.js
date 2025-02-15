import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Authentication Endpoints
export const login = (credentials) => api.post('/login', credentials);
export const register = (userData) => api.post('/register', userData);
export const logout = () => api.post('/logout');
export const getCurrentUser = () => api.get('/user');

// Product Endpoints
export const fetchProducts = () => api.get('/products');
export const fetchProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Order Endpoints
export const fetchOrders = () => api.get('/orders');
export const createOrder = (order) => api.post('/orders', order);
export const fetchOrder = (id) => api.get(`/orders/${id}`);
export const fetchOrderItems = (orderId) => api.get(`/orders/${orderId}/items`);

// Riad Endpoints
export const fetchRiads = () => api.get('/riads');
export const fetchRiad = (id) => api.get(`/riads/${id}`);
export const createRiad = (riad) => api.post('/riads', riad);
export const updateRiad = (id, riad) => api.put(`/riads/${id}`, riad);
export const deleteRiad = (id) => api.delete(`/riads/${id}`);

// Announcement Endpoints
export const fetchAnnouncements = () => api.get('/announcements?include=riad');
export const fetchAnnouncement = (id) => api.get(`/announcements/${id}`);
export const createAnnouncement = (announcement) => api.post('/announcements', announcement);
export const updateAnnouncement = (id, announcement) => api.put(`/announcements/${id}`, announcement);
export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}`);

export const fetchUsers = () => api.get('/admin/users');
export const updateUser = (id, userData) => api.put(`/admin/users/${id}`, userData);
export const fetchAdminPrivileges = (adminId) => api.get(`/admin/${adminId}/privileges`);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await axios.post('/api/refresh-token');
      localStorage.setItem('token', data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;