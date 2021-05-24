import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actualizarUsuarioAccion} from '../redux/usuarioDucks'

const Perfil = () => {
    const dispatch = useDispatch()
    
    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)
    const [nameUser, setNameUser] = useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)

    const actualizarUsuario = () => {
        if(!nameUser.trim()){
            console.log('Nombre vacio');
            return 
        }
        dispatch(actualizarUsuarioAccion(nameUser))
        setActivarFormulario(false)
    }

    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt="" height="100px" width="100px" className="img-fluid"/>
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <button className="btn btn-dark" onClick={()=>setActivarFormulario(true)}>Ediar nombre</button>

                </div>
                {
                    loading && (
                        <div className="card-body">
                            <div className="d-flex justify-content-center mt-3">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    activarFormulario 
                    && (
                        <div className="card-body">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-5">
                                    <div className="input-group mb-3">
                                        <input 
                                            type="text" 
                                            className="fomr-control"
                                            value={nameUser}
                                            onChange={e => setNameUser(e.target.value)}/>
                                        <button 
                                            className="btn btn-dark" 
                                            type="button"
                                            onClick={()=>actualizarUsuario()}>
                                                Actualizar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    )
                }
            </div>            
        </div>
    )
}

export default Perfil
