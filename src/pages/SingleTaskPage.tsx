import React from 'react'
import { useParams } from "react-router-dom";
import tasks from '../db.json'
import { Root } from '../types/data';

const SingleTaskPage = () => {
    const { oguid } = useParams()
    return (
        <div>
            {tasks.filter((task: Root) => task.oguid === oguid)
                .map((task) => {
                    return (
                        <div key={task.id}>
                            <div>{task.id}</div>
                            <div>{task.created_date}</div>
                            <div>{task.order_type.name}</div>
                            <div>{task.created_user.surname}</div>
                            <div>{task.created_user.name}</div>
                            <div>{task.created_user.patronymic}</div>
                            <div>{task.account.name}</div>
                            <div>{task.terminal.name}</div>
                            <div>{task.status}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SingleTaskPage