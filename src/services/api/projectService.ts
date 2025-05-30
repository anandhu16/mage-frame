import { apiClient } from './base';
import { ProjectType } from '@/utils/types/global.types';
export interface Project {
    id: string;
    name: string;
    description: string;
    memberIds: string[];
    taskIds: string[];
    meta: {
        createdBy: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface CreateProjectData {
    name: string;
    description: string;
    memberIds: string[];
}

export const projectService = {
    async getAllProjects(): Promise<ProjectType[]> {
        const response = await apiClient.get('/projects');
        return response.data.data;
    },

    async getProjectById(id: string): Promise<Project> {
        const response = await apiClient.get(`/projects/${id}`);
        return response.data;
    },

    async createProject(data: CreateProjectData): Promise<Project> {
        const response = await apiClient.post('/projects', data);
        return response.data;
    },

    async updateProject(id: string, data: Partial<Project>): Promise<Project> {
        const response = await apiClient.put(`/projects/${id}`, data);
        return response.data;
    },

    async deleteProject(id: string): Promise<void> {
        await apiClient.delete(`/projects/${id}`);
    },

    async getProjectTasks(projectId: string): Promise<any[]> {
        const response = await apiClient.get(`/projects/${projectId}/tasks`);
        return response.data.data;
    },
}; 