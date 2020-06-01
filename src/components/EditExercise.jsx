import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function EditExercise(props) {
    const exerciseId = props.match.params.id
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/exercises/' + exerciseId)
            .then(response => {
                setUsername(response.data.username)
                setDescription(response.data.description)
                setDuration(response.data.duration)
                setDate(new Date(response.data.date))
            })
            .catch(error => {
                console.log(error)
            })

        axios.get('http://localhost:4000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [exerciseId])

    const submitHandler = e => {
        e.preventDefault()

        const exercise = {
            username,
            description,
            duration,
            date
        }
        console.log(exercise)

        axios.post('http://localhost:4000/exercises/update/' + exerciseId, exercise)
            .then(response => {
                console.log(response.data)
                setTimeout(() => {
                    window.location = '/'
                }, 1000)
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <h3>Edit Exercise</h3>
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
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Duration (in minutes):</label>
                    <input
                        type='text'
                        className='form-control'
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
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
                        value='Edit Exercise'
                        className='btn btn-primary'
                    />
                </div>
            </form>
        </div>
    )
}

export default EditExercise
