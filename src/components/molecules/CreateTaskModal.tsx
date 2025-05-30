"use client"

import { TaskType } from "@/utils/types/global.types";
import { useEffect, useState } from "react";
import { taskService } from "@/services/api/taskService";
const CreateTaskModal = ({ isOpen, setIsOpen, projectId, selectedProject }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, projectId: number, selectedProject: any }) => {
    const [task, setTask] = useState<any>({
        name: "",
        description: "",
        startTime: "",
        deadline: "",
        status: "todo",
        tags: [],
        createdAt: new Date().toISOString(),
        createdBy: 0,
        updatedAt: new Date().toISOString(),
        updatedBy: 0,
    })
    const [startDate, setStartDate] = useState<string>("")
    const [startTime, setStartTime] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")
    const [deadlineTime, setDeadlineTime] = useState<string>("")

    useEffect(() => {
        console.log(startTime, deadline, deadlineTime, startDate)
    }, [startTime, deadline, deadlineTime, startDate])

    const createTask = async () => {

        const response = await taskService.createTask({ ...task, projectId: projectId.toString() })
        const data = response


        console.log(data)
        setIsOpen(false)

    }
    return isOpen ? (
        <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold mb-4 text-black">Create Task</h1>
                    <button onClick={() => setIsOpen(false)} className="text-red-500 mb-4">Close</button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                }}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Title</label>
                        <input type="text" className="border border-gray-300 rounded w-full py-1 px-2 text-black outline-none" value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Description</label>
                        <textarea className="border border-gray-300 rounded w-full py-1 px-2 text-black outline-none" rows={4} value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })}></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Start Date</label>
                        <div className="flex gap-2">
                            <input type="date" className="border border-gray-300 rounded w-full py-1 px-2 text-black outline-none" value={startDate} onChange={(e) => {
                                const newStartDate = e.target.value;
                                setStartDate(newStartDate);
                                setTask({ ...task, startTime: newStartDate + 'T' + startTime });
                                console.log(newStartDate)
                            }} />
                            <input type="time" className="border border-gray-300 rounded w-full py-1 px-2 text-black outline-none" value={startTime} onChange={(e) => {
                                const newStartTime = e.target.value;
                                setStartTime(newStartTime);
                                setTask({ ...task, startTime: startDate + 'T' + newStartTime });
                                console.log(newStartTime)
                            }} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Deadline</label>
                        <div className="flex gap-2">
                            <input type="date" className="border border-gray-300 rounded w-full py-1 px-2 text-black outline-none" value={deadline} onChange={(e) => {
                                const newDeadline = e.target.value;
                                setDeadline(newDeadline);
                                setTask({ ...task, deadline: newDeadline + 'T' + deadlineTime });
                                console.log(newDeadline)
                            }} />
                            <input type="time" className="border border-gray-300 rounded w-full py-1 px-2 text-black outline-none" value={deadlineTime} onChange={(e) => {
                                const newDeadlineTime = e.target.value;
                                setDeadlineTime(newDeadlineTime);
                                setTask({ ...task, deadline: deadline + 'T' + newDeadlineTime });
                                console.log(newDeadlineTime)
                            }} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Tags</label>
                        <input type="text" className="border border-gray-300 rounded w-full py-1 px-2 text-black outline-none" placeholder="Add tags separated by commas" value={task.tags.join(", ")} onChange={(e) => setTask({ ...task, tags: e.target.value.split(",") })} />
                    </div>
                    <button onClick={() => createTask()} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
                </form>
            </div>
        </div>
    ) : null;
}

export default CreateTaskModal;