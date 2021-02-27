import React from 'react'
import {BrowserRouter as Router, Switch , Route } from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import ListaTarea from './components/ListaTareas'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            admin...
          </Route>
          <Route path="/" exact>
            inicio...
            {/* <ListaTarea/> */}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
