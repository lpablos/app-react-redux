import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ingresoUsuarioAccion } from '../redux/usuarioDucks'
import { withRouter } from 'react-router-dom'

const Login = (props) => {
    const dispach = useDispatch()
    const {loading} = useSelector(store=> store.usuario)
    const {activo} = useSelector(store => store.usuario)
    
    useEffect(() => {
        // if simplificado
        activo && props.history.push('/')
    }, [activo, props.history])

    return (
        <div className="mt-5 text-center">
            <h3>Ingreso con google</h3>
            <button 
                className="btn btn-dark" 
                onClick={ ()=> dispach(ingresoUsuarioAccion())}
                disabled={loading}>Acceder</button>
            
        </div>
    )
}

export default withRouter(Login)
