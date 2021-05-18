import React from 'react'
import { useDispatch } from 'react-redux'
import { ingresoUsuarioAccion } from '../redux/usuarioDucks'

const Login = () => {
    const dispach = useDispatch()
    return (
        <div className="mt-5 text-center">
            <h3>Ingreso con google</h3>
            <button 
                className="btn btn-dark" 
                onClick={ ()=> dispach(ingresoUsuarioAccion())}>Acceder</button>
            
        </div>
    )
}

export default Login
