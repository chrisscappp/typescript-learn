import { useState, useEffect, memo } from 'react'
import { useUsers } from '../hooks/users'
import { IUser } from '../models'
import './style.css'

const ApiComponent = () => {

    enum FindFilters {
        name = "name",
        userName = "userName",
        email = "email",
        phone = "phone"
    }

    enum StyledForFilters {
        name = "имени",
        userName = "юсернейму",
        email = "емейлу",
        phone = "телефону"
    }

    const {users, error, isLoading} = useUsers()

    const [filter, setFilter] = useState<string>('')
    const [findInputValue, setFindInputValue] = useState<string>('')
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users)

    useEffect(() => {
        setFilteredUsers(users)
    }, [users])

    const isFindFilter = (event: any) => {
        if (event.target.id === FindFilters.name) {
            setFilter(StyledForFilters.name)
        }
        if (event.target.id === FindFilters.userName) {
            setFilter(StyledForFilters.userName)
        }
        if (event.target.id === FindFilters.email) {
            setFilter(StyledForFilters.email)
        }
        if (event.target.id === FindFilters.phone) {
            setFilter(StyledForFilters.phone)
        }
    }

    const findUsers = (value: string) => {
        setFindInputValue(value) 
        if (filter === StyledForFilters.name) {
            setFilteredUsers(users?.filter(user => {
                return user.name.toLowerCase().includes(findInputValue.toLowerCase())
            }))
        }
        if (filter === StyledForFilters.userName) {
            setFilteredUsers(users?.filter(user => {
                return user.username.toLowerCase().includes(findInputValue.toLowerCase())
            }))
        }
        if (filter === StyledForFilters.email) {
            setFilteredUsers(users?.filter(user => {
                return user.email.toLowerCase().includes(findInputValue.toLowerCase())
            }))
        }
        if (filter === StyledForFilters.phone) {
            setFilteredUsers(users?.filter(user => {
                return user.phone.toLowerCase().includes(findInputValue.toLowerCase())
            }))
        }
        if (value === "") {
            setFilteredUsers(users)
        }
    }

    return (
        <>
            <div>
                {
                    error
                ?
                    <h3>{error}</h3>
                :
                    <>
                        {
                            isLoading
                        ?
                            <h3>Loading...</h3>
                        :
                            <>
                                <div className = "header">
                                <div className="dropdown">
                                    <span className="filters">Поиск по: {filter}</span>
                                    <div className="dropdown-content">
                                        <p id = {FindFilters.name} onClick = {(event) => isFindFilter(event)} className="dropdown-content__text">{StyledForFilters.name}</p>
                                        <p id = {FindFilters.userName} onClick = {(event) => isFindFilter(event)} className="dropdown-content__text">{StyledForFilters.userName}</p>
                                        <p id = {FindFilters.email} onClick = {(event) => isFindFilter(event)} className="dropdown-content__text">{StyledForFilters.email}</p>
                                        <p id = {FindFilters.phone} onClick = {(event) => isFindFilter(event)} className="dropdown-content__text">{StyledForFilters.phone}</p>
                                    </div>
                                </div>
                                <div className="find-input">
                                        <input disabled = {!filter} type="text" onChange={(event) => findUsers(event.target.value)}/>
                                    </div>
                                </div>
                                <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Имя</th>
                                    <th scope="col">Юсернейм</th>
                                    <th scope="col">Емаил</th>
                                    <th scope="col">Телефон</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers?.map((item, index) => {
                                    return (
                                    <tr key = {item.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    </tr>
                                    )
                                })}
                                </tbody>
                                </table>
                                {
                                    filteredUsers?.length == 0 ? 
                                    <div className = "noFindProduct">
                                        <h3 className = "noFindProduct-text">Совпадений не найдено</h3>
                                    </div>  
                                    :
                                    null
                                }
                            </>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default memo(ApiComponent)