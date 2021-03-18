import React from 'react'
import {dataBase} from '../firebase'
import dayjs from 'dayjs'

const ListaTareas = (props) => {
  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  //paginacion ver más
  const [ultimaTareaVermas, setUltimaTareaVermas] = React.useState(null)
  const [desactivarVermas, setDesactivarVermas] = React.useState(true)

  React.useEffect(() => {
    listar()
  }, [])

  const listar = async () => {
      try {
        const data = await dataBase.collection(props.user.uid)
          .limit(4)
          .orderBy('fecha', 'desc')
          .get()
        const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setUltimaTareaVermas(data.docs[data.docs.length - 1])
        setTareas(arrayData)

        const query = await dataBase.collection(props.user.uid)
          .limit(4)
          .orderBy('fecha', 'desc')
          .startAfter(data.docs[data.docs.length - 1])
          .get()
        if (query.empty) {
          setDesactivarVermas(true)
        } else {
          setDesactivarVermas(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

  const agregar = async (e) => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('está vacio')
      return
    }
    try {
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }
      const data = await dataBase.collection(props.user.uid).add(nuevaTarea)
      setTareas([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])
      setTarea('')
    } catch (error) {
      console.log(error)
    }
  }

  const eliminar = async (id) => {
    try {
      await dataBase.collection(props.user.uid).doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)
    } catch (error) {
      console.log(error)
    }
  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('vacio')
      return
    }
    try {
      await dataBase.collection(props.user.uid).doc(id).update({
        name: tarea
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? {id: item.id, fecha: item.fecha, name: tarea} : item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setId('')
    } catch (error) {
      console.log(error)
    }
  }

  const vermas = async () => {
    try {
      const data = await dataBase.collection(props.user.uid)
        .limit(4)
        .orderBy('fecha', 'desc')
        .startAfter(ultimaTareaVermas)
        .get()
      const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setTareas([
        ...tareas,
        ...arrayData
      ])
      setUltimaTareaVermas(data.docs[data.docs.length - 1])

      const query = await dataBase.collection(props.user.uid)
          .limit(4)
          .orderBy('fecha', 'desc')
          .startAfter(data.docs[data.docs.length - 1])
          .get()
      if (query.empty) {
        setDesactivarVermas(true)
      } else {
        setDesactivarVermas(false)
      }
    } catch (error) {
      console.log(error)
    }
    
  }

    return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <h3>
            {
              modoEdicion ? 'Editar tarea' : 'Agregar Tarea'
            }
          </h3>
          <form onSubmit={modoEdicion ? editar : agregar}>
            <input
              type="text"
              placeholder="Ingrese tarea"
              className="form-control mb-2"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
            <button
              className={
                modoEdicion ? 'btn btn-warning btn-block mb-4' : 'btn btn-dark btn-block mb-4'
              }
              type="submit"
            >
            {
              modoEdicion ? 'Editar' : 'Agregar'
            }
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <button 
            className="btn btn-dark btn-sm mb-2"
            onClick={() => listar()}
            type="button"
          >
            Actualizar
          </button>
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  {item.name}
                  <hr/> 
                  { dayjs(item.fecha).format("DD/MM/YYYY HH:mm") }
                  <button className="btn btn-danger btn-sm float-right"
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                  <button 
                    className="btn btn-warning btn-sm float-right mr-2"
                    onClick={() => activarEdicion(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            }
          </ul>
          <button 
            className="btn btn-dark btn-sm m-2 float-right"
            onClick={() => vermas()}
            disabled={desactivarVermas}
            type="button"
          >
            Ver más...
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default ListaTareas;