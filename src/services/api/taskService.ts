import { apiClient } from './base';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
    id: string;
    name: string;
    description: string;
    startTime: string;
    deadline: string;
    status: TaskStatus;
    tags: string[];
    projectId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskData {
    name: string;
    description: string;
    startTime: string;
    deadline: string;
    status?: TaskStatus;
    tags?: string[];
    projectId: string;
}

export const taskService = {
    async getAllTasks(): Promise<Task[]> {
        const response = await apiClient.get('/tasks');
        return response.data;
    },

    async getTaskById(id: string): Promise<Task> {
        const response = await apiClient.get(`/tasks/${id}`);
        return response.data;
    },

    async createTask(data: CreateTaskData): Promise<Task> {
        const response = await apiClient.post('/tasks', {
            ...data,
            status: data.status || 'TODO',
            tags: data.tags || [],
        });
        return response.data.data;
    },

    async updateTask(id: string, data: Partial<Task>): Promise<Task> {
        const response = await apiClient.put(`/tasks/${id}`, data);
        return response.data;
    },

    async deleteTask(id: string): Promise<void> {
        await apiClient.delete(`/tasks/${id}`);
    },
}; 