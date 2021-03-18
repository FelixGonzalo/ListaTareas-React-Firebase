import {Link, NavLink} from 'react-router-dom'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Navbar = (props) => {

  const cerrarSesion = () => {
    auth.signOut()
      .then(() => {
        props.history.push('/login')
      })
  }
  
  return (
    <div className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Lista de Tareas</Link>
      <div>
        <div className="d-flex">
          {
            props.firebaseUser !== null ? (
              <NavLink className="btn btn-dark mr-2" to="/admin">
                Admin
              </NavLink>
            ) : null
          }
          {
            props.firebaseUser !== null ? (
              <button 
                className="btn btn-dark"
                onClick={() => cerrarSesion()} 
              >Cerrar Sesión</button>
            ) : (
              <NavLink className="btn btn-dark mr-2" to="/login">
                Login
              </NavLink>
            )
          }
        </div>
      </div>
    </div>
  );
}
 
export default withRouter(Navbar)
