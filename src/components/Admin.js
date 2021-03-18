import React from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'
import ListaTareas from './ListaTareas'

const Admin = (props) => {
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    if (auth.currentUser) {
      // existe un usuario activo
      setUser(auth.currentUser)
    } else {
      // no existe un usuario activo
      props.history.push('/login')
    }
  }, [])
  
  return (
    <div>
      <h2 className="text-center m-4">Lista de tareas</h2>
      {
          user && (
            <ListaTareas user={user} />
          )
      }
    </div>
  );
}
 
export default withRouter(Admin);