import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})   

    const { setAuth, auth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2500);
            return
        }
        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            // console.log(data);
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/proyectos')
            navigate(0)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2500);
        }
    }

    const { msg } = alerta

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">Inicia sesión y administra tus <span className="text-slate-700">proyectos</span></h1>
            { msg && <Alerta alerta={alerta} /> }
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="Email de registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        autoComplete="off"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        placeholder="Password de registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        autoComplete='true'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input 
                    type={'submit'}
                    value={'Iniciar sesión'}
                    className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold ronded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link to={'registrar'} className="block text-center my-5 text-slate-500 uppercase text-sm">¿No tienes una cuenta? Regístrate</Link>
                <Link to={'olvide-password'} className="block text-center my-5 text-slate-500 uppercase text-sm">Olvidé mi password</Link>
            </nav>
        </>
    )
}

export default Login