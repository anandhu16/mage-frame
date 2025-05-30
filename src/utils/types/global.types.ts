
export interface UserType {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    projectIds: number[];
}

export interface ProjectType {
    id: number;
    name: string;
    description: string;
    members: number[];
    taskIds: number[];
    status: string;
    meta: {
        createdBy: number;
        createdAt: Date;
        updatedAt: Date;
    };
}

export interface TaskType {
    id: number;
    name: string;
    description: string;
    startTime: string;
    deadline: string;
    status: string;
    tags: string[];
    projectId: number;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    updatedBy: number;
}