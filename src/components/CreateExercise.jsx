import React, { useState, useEffect } from 'react'
import useInput from '../hooks/useInput'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function CreateExercise() {
    const [username, bindUsername, resetUsername] = useInput('')
    const [description, bindDescription, resetDescription] = useInput('')
    const [duration, bindDuration, resetDuration] = useInput(0)
    const [date, bindDate, resetDate] = useInput(new Date())
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
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
        console.log(exercise);
        
        resetUsername()
        resetDescription()
        resetDuration()
        resetDate()
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label>Username: </label>
                    <select
                        // ref='userInput'
                        required
                        className='form-control'
                        { ...bindUsername }
                    >
                        {
                            users.map(function(user) {
                                return <option key={user} value={user}>{user}</option>
                            })
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description: </label>
                    <input type='text'
                        required
                        className='form-control'
                        { ...bindDescription }
                    />
                </div>
                <div className='form-group'>
                    <label>Duration (in minutes): </label>
                    <input
                        type='text'
                        className='form-control'
                        { ...bindDuration }
                    />
                </div>
                <div className='form-group'>
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            { ...bindDate }
                            // onChange={this.onChangeDate}
                        />
                    </div>
                </div>

                <div className='form-group'>
                    <input
                        type='submit'
                        value='Create Exercise'
                        className='btn btn-primary'
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise
