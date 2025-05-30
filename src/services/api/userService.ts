import { apiClient, setAuthToken } from './base';

export interface User {
    id: string;
    name: string;
    email: string;
    projectIds: string[];
    createdAt: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const userService = {
    async register(data: RegisterData): Promise<any> {
        const response = await apiClient.post('/users/register', data);
        return response.data;
    },

    async login(data: LoginData): Promise<{ user: User; token: string }> {
        const response = await apiClient.post('/users/login', data);
        const { token, user } = response.data;
        setAuthToken(token);
        return { user, token };
    },

    async getCurrentUser(): Promise<User> {
        const response = await apiClient.get('/users/me');
        return response.data;
    },

    async getUserById(id: string): Promise<User> {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    },

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        const response = await apiClient.put(`/users/${id}`, data);
        return response.data;
    },

    async deleteUser(id: string): Promise<void> {
        await apiClient.delete(`/users/${id}`);
    },
}; 