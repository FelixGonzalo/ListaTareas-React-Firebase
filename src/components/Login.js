import React from 'react'
import {auth, dataBase} from '../firebase'
import {withRouter} from 'react-router-dom'

const Login = (props) => {

  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [error, setError] = React.useState(null)
  const [esRegistro, setEsRegistro] = React.useState(true)

  const procesarDatos = e => {
    e.preventDefault()
    if(!email.trim()){
      setError('Ingrese Email')
      return
    }
    if(!pass.trim()){
      setError('Ingrese Password')
      return
    }
    if (pass.length < 6) {
      setError('Password de 6 caracteres o más')
      return
    }
    // datos correctos
    if (esRegistro) {
      registrar()
    } else {
      login()
    }
  }

  const login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email,pass)
      console.log(res.user)
      setEmail('')
      setPass('')
      setError(null)
      props.history.push('/admin')
    } catch (error) {
      console.log(error.code)
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Email no válido')
          break;
        case 'auth/user-not-found':
          setError('Email no registrado')
          break;
        case 'auth/wrong-password':
          setError('Contraseña incorrecta')
          break;
        default:
          setError('No se puede acceder')
          break;
      }
    }
  },[email,pass])

  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass)
      console.log(res.user)
      await dataBase.collection('usuarios').doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.email
      })
      setEmail('')
      setPass('')
      setError(null)
      props.history.push('/admin')
    } catch (error) {
      console.log(error.code)
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Email no válido')
          break;
        case 'auth/email-already-in-use':
          setError('El email ya existe')
          break;
        default:
          setError('Error al registrarse')
          break;
      }
    }
  }, [email, pass])

  return (
    <div className="mt-5">
      <h3 className="text-center">{esRegistro ? 'Registro de usuarios' : 'Login de acceso'}</h3>
      <hr/>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
            {
              error && (<div className="alert alert-danger">{error}</div>)
            }
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese un email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingrese un Password"
              onChange={e => setPass(e.target.value)}
              value={pass}
            />
            <button className="btn btn-dark btn-lg btn-block" type="submit">
              {esRegistro ? 'Registrarse' : 'Acceder'}
            </button>
            <button
              onClick = {() => setEsRegistro(!esRegistro)} 
              className="btn btn-info btn-sm btn-block"
              type="button"
            >
              {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default withRouter(Login)