import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Exercise = props => {
    const { exercise, deleteExercise } = props

    return (
        <tr>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0,10)}</td>
            <td>
                <Link to={'/edit/' + exercise._id}>edit</Link>
                <span> | </span>
                <a href='#' onClick={() => deleteExercise(exercise._id)}>
                    delete
                </a>
            </td>
        </tr>
    )
}

function ListExercises() {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/exercises/')
            .then(response => {
                setExercises(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const deleteExercise = id => {
        axios.delete('http://localhost:4000/exercises/'+ id)
            .then(response => {
                console.log(response.data)
            })

        setExercises(exercises => exercises.filter(el => el._id !== id))
    }

    const listExercises = () => exercises.map(exercise => (
        <Exercise
            exercise={exercise}
            deleteExercise={deleteExercise}
            key={exercise._id}
        />
    ))

    return (
        <div>
            <h3>Exercises List</h3>
            <table className='table table-striped table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration (min)</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listExercises()}
                </tbody>
            </table>
        </div>
    )
}

export default ListExercises
