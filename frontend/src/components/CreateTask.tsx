import React, {useContext, useRef, useState} from "react";
import {
    CardBody,
    CardButton,
    CardFieldset,
    CardHeader,
    CardHeading,
    CardIcon,
    CardInput, CardItem, CardLink,
    Card, CardItemHeading
} from "../common/ui/Card";
import {TaskContext} from "../App";
import {useNavigate} from "react-router-dom";

export default () => {
    const { addTask } = useContext(TaskContext);
    const navigate = useNavigate()
    const [name, setName] = useState('');

    console.log(name)

    return (
        <>
            <CardButton onClick={() => navigate('/list-tasks') }>Back to Task List</CardButton>
            <Card>
                <CardBody>
                    <CardFieldset>
                        <CardInput
                            placeholder="enter a task name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </CardFieldset>

                    <CardFieldset>
                        <CardButton type="button" onClick={() => addTask(name) }>Add Task</CardButton>
                    </CardFieldset>
                </CardBody>
            </Card>
        </>
    )
}
