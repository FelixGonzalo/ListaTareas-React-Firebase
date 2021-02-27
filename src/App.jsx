import React from 'react'
import {BrowserRouter as Router, Switch , Route } from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import ListaTarea from './components/ListaTareas'
import Admin from './components/Admin'

import {auth} from './firebase'

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    // verificar si hay usuario en sesion
    auth.onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser = {firebaseUser}/>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/" exact>
            inicio...
            {/* <ListaTarea/> */}
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
