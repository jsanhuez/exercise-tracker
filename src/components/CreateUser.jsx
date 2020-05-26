import React from 'react'
import useInput from '../hooks/useInput'
import axios from 'axios'

function CreateUser() {
    const [username, bindUsername, resetUsername] = useInput('')

    const submitHandler = e => {
        e.preventDefault()

        const user = {
            username
        }
        console.log(user)
        axios.post('http://localhost:4000/users/add', user)
            .then(res => console.log(res.data))
              
        resetUsername()
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label>Username: </label>
                    <input
                        type='text'
                        required
                        className='form-control'
                        { ...bindUsername }
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='submit'
                        value='Create User'
                        className='btn btn-primary'
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateUser
