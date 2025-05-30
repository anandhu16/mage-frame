"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import SideBarLayout from "@/components/molecules/SideBarLayout";
import { TaskType, ProjectType } from "@/utils/types/global.types";
import CompletionMarker from "@/assets/svg/CompletionMarker";
import EmptyTaskBoard from "@/assets/svg/EmptyTaskBoard";
import CreateTaskModal from "@/components/molecules/CreateTaskModal";
import { projectService } from "@/services/api/projectService";
import { taskService } from "@/services/api";

export default function BoardPage() {
    const { error, success } = useToast();
    const router = useRouter();

    const [selectedProject, setSelectedProject] = useState<ProjectType>({} as ProjectType);
    const [tasks, setTasks] = useState<any[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
    const [searchTask, setSearchTask] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (selectedProject?.id) {
            const fetchTasks = async () => {
                const response = await projectService.getProjectTasks(selectedProject.id.toString());
                setTasks(response);
                setFilteredTasks(response);
            }
            fetchTasks();
        }
    }, [selectedProject])

    useEffect(() => {
        if (searchTask) {
            const filteredTasks = tasks.filter((task) => task.name.toLowerCase().includes(searchTask.toLowerCase()));
            setFilteredTasks(filteredTasks);
        } else {
            setFilteredTasks(tasks);
        }
    }, [searchTask])

    const handleTaskCompletion = async (taskId: number) => {
        const updatedTasks = tasks.map((task) => task.id === taskId ? { ...task, status: "success" } : task);
        let task = tasks.find((task) => task.id === taskId);
        task.status = "success";
        console.log(task);
        const response = await taskService.updateTask(taskId.toString(), task);
        if (response) {
            setTasks(updatedTasks);
            setFilteredTasks(updatedTasks);
            success("Task completed successfully");
        } else {
            error("Failed to complete task");
        }
    }

    return <SideBarLayout selectedProject={selectedProject} setSelectedProject={setSelectedProject}>
        <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
                <div><span className="text-white font-black">No. Of Tasks :</span> {tasks.length}</div>
                <div className="flex gap-2">
                    <input onChange={(e) => setSearchTask(e.target.value)} type="text" placeholder="Search Task" className="bg-gray-800 text-white px-4 py-0.5 font-bold rounded-md" />
                    <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-0.5 font-bold rounded-md">Add Task</button>
                </div>
            </div>
            {selectedProject?.id ? <div className={`w-full h-full flex flex-col`}>
                <div>
                    <div className={`w-full h-full flex flex-col gap-0.5 ${filteredTasks.filter((task) => task.status === "todo").length > 0 ? "mb-2" : "mb-12"}`}>
                        <div className="w-full py-2 px-4 flex bg-gray-800 items-center justify-between rounded-md gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-neutral-500 rounded-full" />
                                <div className="">Todo</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold">Task Count :</span>
                                <span className="text-white font-bold">{filteredTasks.filter((task) => task.status === "todo").length}</span>
                            </div>
                        </div>
                        {filteredTasks.filter((task) => task.status === "todo").map((task) => (
                            <div key={task.id} className="w-full py-2 px-4 flex hover:bg-neutral-800 transition-all duration-300 items-center justify-between rounded-md gap-2">
                                <div className="flex items-center gap-2">
                                    <div onClick={() => handleTaskCompletion(task.id)} className="w-4 h-4 cursor-pointer flex items-center justify-center">
                                        <CompletionMarker className="hover:glow" color="white" />
                                    </div>
                                    <div className="">{task.name}</div>
                                    <div className="flex gap-1">
                                        {task.tags && task.tags.map((tag: string, index: number) => (
                                            <span key={index} className="bg-gray-600 text-white px-2 py-1 rounded-md text-xs">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div>
                    <div className={`w-full h-full flex flex-col gap-0.5 ${filteredTasks.filter((task) => task.status === "ongoing").length > 0 ? "mb-2" : "mb-12"}`}>
                        <div className="w-full py-2 px-4 flex bg-gray-800 items-center justify-between rounded-md gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                <div className="">Ongoing</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold">Task Count :</span>
                                <span className="text-white font-bold">{filteredTasks.filter((task) => task.status === "ongoing").length}</span>
                            </div>
                        </div>
                        {filteredTasks.filter((task) => task.status === "ongoing").map((task) => (
                            <div key={task.id} className="w-full py-2 px-4 flex hover:bg-neutral-800 transition-all duration-300 items-center justify-between rounded-md gap-2">
                                <div className="flex items-center gap-2">
                                    <div onClick={() => handleTaskCompletion(task.id)} className="w-4 h-4 cursor-pointer flex items-center justify-center">
                                        <CompletionMarker className="hover:glow" color="white" />
                                    </div>
                                    <div className="">{task.name}</div>
                                    <div className="flex gap-1">
                                        {task.tags && task.tags.map((tag: string, index: number) => (
                                            <span key={index} className="bg-gray-600 text-white px-2 py-1 rounded-md text-xs">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div>
                    <div className={`w-full h-full flex flex-col gap-0.5 ${filteredTasks.filter((task) => task.status === "success").length > 0 ? "mb-2" : "mb-12"}`}>
                        <div className="w-full py-2 px-4 flex bg-gray-800 items-center justify-between rounded-md gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <div className="">Success</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold">Task Count :</span>
                                <span className="text-white font-bold">{filteredTasks.filter((task) => task.status === "success").length}</span>
                            </div>
                        </div>
                        {filteredTasks.filter((task) => task.status === "success").map((task) => (
                            <div key={task.id} className="w-full py-2 px-4 flex hover:bg-neutral-800 transition-all duration-300 items-center justify-between rounded-md gap-2">
                                <div className="flex items-center gap-2">
                                    <div onClick={() => { }} className="w-4 h-4 cursor-pointer flex items-center justify-center">
                                        <CompletionMarker className="" color="green" />
                                    </div>
                                    <div className="">{task.name}</div>
                                    <div className="flex gap-1">
                                        {task.tags && task.tags.map((tag: string, index: number) => (
                                            <span key={index} className="bg-gray-600 text-white px-2 py-1 rounded-md text-xs">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div>
                    <div className={`w-full h-full flex flex-col gap-0.5 ${filteredTasks.filter((task) => task.status === "failed").length > 0 ? "mb-2" : "mb-12"}`}>
                        <div className="w-full py-2 px-4 flex bg-gray-800 items-center justify-between rounded-md gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full" />
                                <div className="">Failed</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold">Task Count :</span>
                                <span className="text-white font-bold">{filteredTasks.filter((task) => task.status === "failed").length}</span>
                            </div>
                        </div>
                        {filteredTasks.filter((task) => task.status === "failed").map((task) => (
                            <div key={task.id} className="w-full py-2 px-4 flex hover:bg-neutral-800 transition-all duration-300 items-center justify-between rounded-md gap-2">
                                <div className="flex items-center gap-2">
                                    <div onClick={() => { }} className="w-4 h-4 cursor-pointer flex items-center justify-center">
                                        <CompletionMarker className="hover:glow" color="red" />
                                    </div>
                                    <div className="">{task.name}</div>
                                    <div className="flex gap-1">
                                        {task.tags && task.tags.map((tag: string, index: number) => (
                                            <span key={index} className="bg-gray-600 text-white px-2 py-1 rounded-md text-xs">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div> : <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                <EmptyTaskBoard />
                <div className="text-white font-bold">No Project Selected</div>
            </div>}
            <CreateTaskModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} projectId={selectedProject.id} selectedProject={selectedProject} />
        </div>
    </SideBarLayout>

}