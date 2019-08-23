import React, { useState } from 'react'

import './User.scss'

const User = props => {

    const { id, name, age, email } = props.user
    const [editing, setEditing] = useState(false)

    const [editedUser, setEditedUser] = useState({ name, age, email, id })

    function handleChanges(e) {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
    }

    if (editing) return (

        <>

            <i onClick={() => setEditing(!editing)}>💩</i>

            <form onSubmit={(e) => {
                e.preventDefault()
                props.updateUser(editedUser)
                setEditing(!editing)
            }}>

                <input type="text" name='name' value={editedUser.name} onChange={handleChanges} />
                <input type="number" name='age' value={editedUser.age} onChange={handleChanges} />
                <input type="text" name='email' value={editedUser.email} onChange={handleChanges} />

                <button style={{ display: editing ? 'block' : 'none' }}>Updatenate</button>

            </form>

            <button
                onClick={() => {
                    props.delUser(id)
                    setEditing(!editing)
                }}
                style={{ display: editing ? 'block' : 'none' }}
            >Removenateinator</button>

        </>

    )

    return (

        <>

            <h1>{name}</h1>
            <h2>{age}</h2>
            <h3>{email}</h3>

            <button
                onClick={() => setEditing(!editing)}
                style={{ display: editing ? 'none' : 'block' }}
            >Edify</button>

        </>

    )
}

export default User
