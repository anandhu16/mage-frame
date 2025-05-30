import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ProjectType, TaskType } from "@/utils/types/global.types";
import { projectService } from "@/services/api/projectService";
const Dropdown = ({ selectedProject, setSelectedProject }: { selectedProject: ProjectType, setSelectedProject: (project: any) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [projects, setProjects] = useState<ProjectType[]>([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await projectService.getAllProjects();
            setProjects(response);
        };
        fetchProjects();
    }, []);

    return (
        <div className="relative w-full mt-3 mx-4">
            <button onClick={toggleDropdown} className="bg-gray-200 shadow-lg text-neutral-900 font-bold text-start px-2 rounded w-[180px] flex justify-between items-center">
                {selectedProject.name || "Select a Project"}
                <ChevronDownIcon className={`w-4 h-4 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
                <div className="absolute bg-gray-200 border border-gray-500 shadow-lg mt-2 rounded shadow-lg w-[180px]">
                    <ul>
                        {projects.map((project: any) => (
                            <li key={project.id} className="px-2 py-0.5 hover:bg-gray-300 font-semibold cursor-pointer text-neutral-900" onClick={() => {
                                setSelectedProject(project)
                                setIsOpen(false)
                            }}>{project.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function SideBarLayout({ children, selectedProject, setSelectedProject }: { children: React.ReactNode, selectedProject: ProjectType, setSelectedProject: (project: ProjectType) => void }) {
    return <div className="w-full">
        <div className={`relative h-screen flex flex-col md:flex-row`}>
            <div className="w-full h-full flex flex-col md:flex-row justify-start items-center bg-[#000000]">
                <div className="w-full md:w-[240px] h-auto md:h-screen bg-[#000000] p-4 md:p-0">
                    <Dropdown selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                </div>
                <div className="w-full h-full bg-[#08090C]">
                    <div className="w-full h-12 bg-[#000000] flex justify-center items-center">
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="text-white text-sm font-medium px-4 text-center">
                                {selectedProject?.name ? `${selectedProject.name || ""} - Board` : ""}
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full p-2 md:p-4 rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
}