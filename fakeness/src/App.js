import React, { useState } from 'react'
import axios from 'axios'
import { Switch, Route, withRouter } from 'react-router-dom'

import { axize } from './utils'
import Users from './components/Users'
import Login from './components/Login'
import './App.css'

function App(props) {

  const [list, setList] = useState([])

  const submitUser = user => {

    axios
      .post('http://localhost:5000/api/login', user)
      .then(rez => {
        localStorage.setItem('token', rez.data.payload)
        props.history.push('/users')
      })
      .catch(rez => console.error(rez))

  }

  const grabUsers = _ => {

    axize()
      .get('http://localhost:5000/api/friends')
      .then(res => setList(res.data))
      .catch(err => console.error(err))

  }

  const addUser = user => {

    axize()
      .post('http://localhost:5000/api/friends', user)
      .then(rez => setList(rez.data))
      .catch(err => console.error(err))

  }

  const updateUser = user => {

    axize()
      .put(`http://localhost:5000/api/friends/${user.id}`, user)
      .then(res => setList(res.data))
      .catch(err => console.error(err))

  }

  const delUser = id => {

    axize()
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then(rez => setList(rez.data))
      .catch(err => console.error(err))

  }

  return (

    <div className="App">
      <header className="App-header">
        <h1>Fake Auth</h1>

        <Switch>

          <Route
            exact path='/'
            render={props =>
              <Login
                {...props}
                submitUser={submitUser}
              />}
          />

          <Route
            path='/users'
            render={props => <Users
              {...props}
              grabUsers={grabUsers}
              addUser={addUser}
              updateUser={updateUser}
              delUser={delUser}
              list={list}
            />}
          />

        </Switch>

      </header>
    </div>

  )

}

export default withRouter(App)
