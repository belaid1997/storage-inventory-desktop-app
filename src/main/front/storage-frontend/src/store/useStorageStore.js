import { create } from 'zustand';
import { api } from '../config/api';

export const useStorageStore = create((set, get) => ({
    // Core Data State
    inventory: [],
    warehouses: [],
    products: [],
    loading: false,
    error: null,

    // 🔐 Auth State
    user: localStorage.getItem('username') || null,
    token: localStorage.getItem('token') || null,

    // 🔑 Auth Actions
    login: async (username, password) => {
        set({ loading: true, error: null });
        try {
            // POST credentials to our new endpoint
            const response = await api.post('/auth/login', { username, password });
            const { token, username: loggedUser } = response.data;

            // Save credentials to browser storage
            localStorage.setItem('token', token);
            localStorage.setItem('username', loggedUser);

            set({
                token,
                user: loggedUser,
                loading: false
            });

            // Load app data immediately after a successful login
            await get().fetchDashboardData();
        } catch (err) {
            const errMsg = err.response?.data?.message || 'Invalid username or password';
            set({ error: errMsg, loading: false });
            throw new Error(errMsg);
        }
    },

    logout: () => {
        // Clear browser cache
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        // Reset state
        set({
            user: null,
            token: null,
            inventory: [],
            warehouses: [],
            products: []
        });
    },

    // Existing Warehouse Actions
    fetchDashboardData: async () => {
        // Prevent fetching if we are not authenticated
        if (!get().token) return;

        set({ loading: true, error: null });
        try {
            const [invRes, prodRes, whRes] = await Promise.all([
                api.get('/inventory'),
                api.get('/products'),
                api.get('/warehouses')
            ]);
            set({
                inventory: invRes.data,
                products: prodRes.data,
                warehouses: whRes.data,
                loading: false
            });
        } catch (err) {
            // If we get an unauthorized error (401), automatically log the user out
            if (err.response?.status === 401) {
                get().logout();
            } else {
                set({ error: err.response?.data?.message || err.message, loading: false });
            }
        }
    },

    addProduct: async (productData) => {
        set({ loading: true });
        try {
            await api.post('/products', productData);
            await get().fetchDashboardData();
        } catch (err) {
            const errMsg = err.response?.data?.message || err.response?.data || err.message;
            set({ error: errMsg, loading: false });
            throw new Error(errMsg);
        }
    },

    addStorageLocation: async (warehouseId, locationData) => {
        set({ loading: true });
        try {
            await api.post(`/warehouses/${warehouseId}/locations`, locationData);
            await get().fetchDashboardData();
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message;
            set({ error: errMsg, loading: false });
            throw new Error(errMsg);
        }
    },

    assignStock: async (productId, locationId, quantity) => {
        set({ loading: true });
        try {
            await api.post('/inventory', null, {
                params: { productId, locationId, quantity }
            });
            await get().fetchDashboardData();
        } catch (err) {
            set({ error: err.message, loading: false });
            throw err;
        }
    },

    removeStock: async (id) => {
        set({ loading: true });
        try {
            await api.delete(`/inventory/${id}`);
            await get().fetchDashboardData();
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    }
}));