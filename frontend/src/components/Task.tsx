import React, {useContext, useRef, useState} from "react";
import {
    CardBody,
    CardButton, CardItem,
    Card, CardItemHeading
} from "../common/ui/Card";
import {ITaskContext, TaskContext} from "../App";
import {useNavigate} from "react-router-dom";

export default (props: TaskProps) => {
    const { getTasks, deleteTask } = useContext<ITaskContext>(TaskContext)
    const navigate = useNavigate();
    const checkBoxRef = useRef<any>();
    const tasklist = getTasks();
    const [taskToBeDeleted, setTaskToBeDeleted] = useState<string[]>([])

    const onSelect = (checked: boolean, id: string) => {
        if (checked) {
            taskToBeDeleted.push(id)
            setTaskToBeDeleted(taskToBeDeleted);
        } else {
            const list = taskToBeDeleted.filter(i => i !== id)
            setTaskToBeDeleted(list);
        }
        console.log(taskToBeDeleted)
    }

    return (
        <>
            <CardButton onClick={() => navigate('/create-task') }>Create New Task</CardButton>
            <CardButton onClick={() => deleteTask(taskToBeDeleted) }>Delete Selected Task</CardButton>
            {
                tasklist.map(task =>
                    <Card key={task.id}>
                        <CardBody>
                            <CardItem >
                                <input ref={checkBoxRef} type="checkbox" onChange={(e) => onSelect(e.target.checked, task.id)}/>
                                <CardItemHeading>{task.name}</CardItemHeading>
                            </CardItem>
                        </CardBody>
                    </Card>
                )
            }
        </>
    )
}

export interface TaskProps {
    mode: string;
}