import React, { useState, useEffect } from 'react'
import useInput from '../hooks/useInput'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function CreateExercise() {
    const [username, setUsername] = useState('')
    const [description, bindDescription, resetDescription] = useInput('')
    const [duration, bindDuration, resetDuration] = useInput(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username))
                    setUsername(response.data[0].username)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const submitHandler = e => {
        e.preventDefault()

        const exercise = {
            username,
            description,
            duration,
            date
        }
        console.log(exercise)

        axios.post('http://localhost:4000/exercises/add/', exercise)
            .then(response => {
                console.log(response.data)
                setTimeout(() => {
                    window.location = '/'
                }, 1000)
            })
            .catch(error => console.log(error))

        resetDescription()
        resetDuration()
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label>Username:</label>
                    <select required
                        className='form-control'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    >
                        {
                            users.map(user => (
                                <option key={user} value={user}>{user}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <input type='text'
                        required
                        className='form-control'
                        { ...bindDescription }
                    />
                </div>
                <div className='form-group'>
                    <label>Duration (in minutes):</label>
                    <input
                        type='text'
                        className='form-control'
                        { ...bindDuration }
                    />
                </div>
                <div className='form-group'>
                    <label>Date:</label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={date => setDate(date)}
                        />
                    </div>
                </div>

                <div className='form-group'>
                    <input type='submit'
                        value='Create Exercise'
                        className='btn btn-primary'
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise
