import React from 'react'
import styles from '../styles/Navbar.module.scss'

const Navbar = () => {
    return (
        <><ul className={styles.header}>
            <li>Номер / Дата</li>
            <li>Тип задания / Автор</li>
            <li>Аккаунт / Терминал</li>
            <li>Статус</li>
        </ul></>
    )
}

export default Navbar