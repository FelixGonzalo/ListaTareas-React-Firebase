
import React from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Reset = (props) => {

  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(null)

  const procesarDatos = e => {
    e.preventDefault()
    if(!email.trim()){
      setError('Ingrese Email')
      return
    }
    setError(null)
    recuperar()
    // datos correctos
  }

  const recuperar = async () => {
    try {
      await auth.sendPasswordResetEmail(email)
      console.log('correo enviado')
      props.history.push('login')
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Email no registrado')
          break;
      }
    }
  }

  return (
    <div className="mt-5">
      <h3 className="text-center">Reiniciar Contraseña</h3>
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
            <button className="btn btn-dark btn-lg btn-block" type="submit">
              Reiniciar contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Reset);