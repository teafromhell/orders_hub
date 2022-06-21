import React, { useEffect, useState } from 'react'
import { Root } from '../types/data'
import { Link } from "react-router-dom";
import styles from '../styles/SingleTask.module.scss'

const SingleTask = ({ task }: { task: Root }) => {
    const [colorStatus, setColorStatus] = useState<string>('')
    const [date, setDate] = useState<string>('')

    useEffect(() => {
        if (task.status === 'new') {
            setColorStatus(styles.new)
        } else if (task.status === 'declined') {
            setColorStatus(styles.cancel)
        } else if (task.status === 'completed') {
            setColorStatus(styles.completed)
        } else if (task.status === 'started') {
            setColorStatus(styles.started)
        } else {
            setColorStatus(styles.assigned_to)
        }
        setDate(new Date(task.created_date)
            .toISOString().substring(0, 10).split('-').reverse().join('.')
            + ' '
            + new Date(task.created_date).toISOString().substring(11, 16))

    }, [task.created_date, task.status])

    return (
        <Link key={task.id} to={`${task.oguid}`} style={{ textDecoration: 'none', color: 'black' }}>
            <ul className={styles.task}>
                <li>No {task.id} <br /> <span>{date}</span></li>
                <li>
                    {task.order_type.name}
                    <br />
                    <span>
                        {task.created_user.surname} {`${task.created_user.name.slice(0, 1)}.`} {`${task.created_user.patronymic.slice(0, 1)}.`}
                    </span>
                </li>
                <li>{task.account.name} <br /> <span>{task.terminal.name} </span></li>
                <li> <div className={colorStatus}> {task.status.slice(0,8)}</div></li>
            </ul>


        </Link>
    )
}

export default SingleTask