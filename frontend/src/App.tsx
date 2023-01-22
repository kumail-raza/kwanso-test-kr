import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import TaskComponent from "./components/Task";
import CreateTask from "./components/CreateTask";
import {Task} from "./types/Task";

export interface ITaskContext {
    addTask: (name: string) => void,
    getTasks: () => Task[],
    deleteTask: (ids: string[]) => void
}

export const TaskContext = createContext<ITaskContext>({
    addTask: () => {
    },
    getTasks: () => [],
    deleteTask: () => {
    },
});

function App() {
    const [tasks, setTask] = useState<Task[]>([]);

    useEffect(() => {
        const data = localStorage.getItem("tasks") || null;
        let taskList: Task[] = data ? JSON.parse(data) : null;
        setTask(taskList || []);
    }, [])

    const deleteTask = (ids: string[]) => {
        let taskList = [...getTasks()];
        taskList = taskList.filter(task => !ids.includes(task.id))
        localStorage.setItem("tasks", JSON.stringify(taskList))
        setTask(taskList);
    }
    const getTasks = (): Task[] => {
        return tasks;
    }
    const addTask = (name: string) => {
        const taskList = [...getTasks()];
        taskList.push({id: Math.random().toString(16).slice(2), name})
        localStorage.setItem("tasks", JSON.stringify(taskList))
        setTask(taskList);
    }

    return (
        <div className="App">
            <TaskContext.Provider value={{addTask, getTasks, deleteTask}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/list-tasks" element={<TaskComponent mode=""/>}/>
                        <Route path="/create-task" element={<CreateTask/>}/>
                        <Route path="/bulk-delete" element={<TaskComponent mode="delete"/>}/>
                        <Route path="/" element={<Navigate to="/list-tasks" replace/>}/>
                        <Route path="*" element={<Navigate to="/list-tasks" replace/>}/>
                    </Routes>
                </BrowserRouter>
            </TaskContext.Provider>
        </div>
    );
}

export default App;
