import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha, setFecha] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    useEffect(() => {
        if( params.id ){
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFecha(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        } 
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault()
        if([nombre, descripcion, fecha, cliente].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        //Pasar datos a provider
        await submitProyecto({
            nombre,
            descripcion,
            fechaEntrega: fecha,
            cliente,
            id
        })

        setId(null)
        setNombre('')
        setDescripcion('')
        setFecha('')
        setCliente('')
    }

    const { msg } = alerta

    return (
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>
            { msg && <Alerta alerta={alerta} /> }
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre proyecto</label>
                <input 
                    id="nombre"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del proyecto" 
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">Descripcion del proyecto</label>
                <textarea 
                    id="descripcion"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripcion del proyecto" 
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="fecha-entrega" className="text-gray-700 uppercase font-bold text-sm">Fecha de entrega</label>
                <input 
                    id="fecha-entrega"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm">Nombre cliente</label>
                <input 
                    id="cliente"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del cliente" 
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>
            <input 
                type={'submit'}
                value={id ? 'Actualizar proyecto' : 'Crear proyecto'}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}

export default FormularioProyecto