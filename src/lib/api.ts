
import useAuthStore from '../store/auth-store';

const api = {
  async fetch(url: string, options: RequestInit = {}) {
    const token = useAuthStore.getState().token;

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, options);

    if (response.status === 401) {
      useAuthStore.getState().logout();
      // You might want to redirect to the login page here
      // For example, using window.location.href = '/login';
    }

    return response;
  },
};

export default api;
