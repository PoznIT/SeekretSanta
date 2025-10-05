import axios from 'axios';


const api = axios.create({
  baseURL: process.env.BFF_API_URL
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  email: string;
  name: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<User> {
    const response = await api.post('/auth/login', credentials);
    const user = response.data;
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  async register(userData: RegisterRequest): Promise<User> {
    const response = await api.post('/auth/register', userData);
    const user = response.data;
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};

export default api;
