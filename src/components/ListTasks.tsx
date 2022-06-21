import React, { useEffect, useState } from 'react'
import tasks from '../db.json'
import { Root } from '../types/data'
import SingleTask from './SingleTask'
import { Pagination } from '@mui/material'
import styles from '../styles/ListTasks.module.scss'
import Navbar from '../components/Navbar'

const tasksPerPage = 20

const ListTasks: React.FC = () => {
    const [page, setPage] = useState<number>(1)
    const [count, setCount] = useState<number>(0)
    const [status, setStatus] = useState<string>('All')
    const [type, setType] = useState<string>('All')
    const [filteredTasks, setFilteredTasks] = useState<Root[]>(tasks)
    const [activeBtn, setActiveBtn] = useState<string>('')
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setCount(Math.ceil(filteredTasks.length / tasksPerPage))
        window.scrollTo(0, 0);
    }, [count, page, filteredTasks])

    const handleStatus: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setPage(1)
        setStatus(e.target.value)
    }

    const handleType: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setPage(1)
        setType(e.target.value)
    }
    const handleSortNew: React.MouseEventHandler<HTMLButtonElement> = () => {
        const sorted = tasks.sort((a, b) =>
            (a.created_date < b.created_date ? 1 : -1))
        setFilteredTasks([...sorted])
        setActiveBtn('Old')
    }

    const handleSortOld: React.MouseEventHandler<HTMLButtonElement> = () => {
        const sorted = tasks.sort((a, b) =>
            (a.created_date > b.created_date ? 1 : -1))
        setFilteredTasks([...sorted])
        setActiveBtn('New')
    }
    return (
        <>
            <Pagination
                showFirstButton showLastButton
                style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}
                count={count}
                page={page}
                onChange={(_, num) => setPage(num)}
            />
            <div className={styles.search}>
                <div className={styles.input_container}>
                    <input type="text"
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}
                        placeholder='поиск по автору, аккаунту, терминалу' />
                </div>
                <div className={styles.bottom_div}>
                    <div >
                        <button className={activeBtn === 'Old' ? styles.active : ''} onClick={handleSortNew}>New</button>
                        <button className={activeBtn === 'New' ? styles.active : ''} onClick={handleSortOld}>Old</button>
                    </div>
                    <select name="status" onChange={handleStatus}>
                        <option defaultValue="All">All</option>
                        <option value="new">New</option>
                        <option value="completed">Completed</option>
                        <option value="started">Started</option>
                        <option value="assigned_to">Assigned</option>
                        <option value="declined">Declined</option>
                    </select>
                    <select name="type" onChange={handleType}>
                        <option defaultValue="All">All</option>
                        <option value="Доставка клиенту">Доставка</option>
                        <option value="Безвозвратное изъятие документов">Изъятие</option>
                        <option value="Вывоз коробов">Вывоз</option>
                    </select>

                </div>
            </div>
            <Navbar />
            {filteredTasks.filter((task) =>
                task.created_user.surname.toLowerCase().includes(search.toLowerCase()) ||
                task.account.name.toLowerCase().includes(search.toLowerCase()) ||
                task.terminal.name.toLowerCase().includes(search.toLowerCase())
            )
                .filter((task) => task.status === status || status === 'All')
                .filter((task) => task.order_type.name === type || type === 'All')
                .filter((_, index) =>
                    index >= tasksPerPage * (page - 1) && index < tasksPerPage * page)
                .map((task: Root) => {
                    return <SingleTask task={task} key={task.id} />
                })}

            <Pagination
                showFirstButton showLastButton
                style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
                count={count}
                page={page}
                onChange={(_, num) => setPage(num)}
            />

        </>
    )
}

export default ListTasks