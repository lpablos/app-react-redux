import React from 'react'
import {Link, NavLink, withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {cerrarSessionAccion} from '../redux/usuarioDucks'

const Navbar = (props) => {
    const dispatch = useDispatch()
    const userActivo = useSelector(store=> store.usuario.activo)

    const cerrarSession = () => {
        dispatch(cerrarSessionAccion())
        props.history.push('login')
        // props.history.push('/login')
    }    
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">App Poke</Link>
            <div className="d-flex">
                {
                    userActivo 
                    ?(
                        <>
                            <NavLink className="btn btn-dark mr-2" to="/" exact>Inicio</NavLink>
                            <button className="btn btn-dark mr-2" onClick={ ()=> cerrarSession()}>Cerrar Sessión </button>
                        </>
                    )
                    :(
                        <NavLink className="btn btn-dark mr-2" to="/login" exact>Login</NavLink>
                    )
                }
            </div>
        </div>
    )
}

export default withRouter(Navbar)