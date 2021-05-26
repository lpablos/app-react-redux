import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actualizarUsuarioAccion, editarFotoAccion} from '../redux/usuarioDucks'

const Perfil = () => {
    const dispatch = useDispatch()
    
    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)

    const [nameUser, setNameUser] = useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)
    const [activarFormularioImagen, setActivarFormularioImagen] = useState(false)
    const [FotoNueva, setFotoNueva] = useState(null)
    

    const actualizarUsuario = () => {
        if(!nameUser.trim()){
            console.log('Nombre vacio');
            return 
        }
        dispatch(actualizarUsuarioAccion(nameUser))
        setActivarFormulario(false)
    }
    const actualizarImagen = () =>{
        let imagenCliente = FotoNueva.target.files[0]
        if( imagenCliente.type === 'image/jpeg' || imagenCliente.type === 'image/jpg'){
            dispatch(editarFotoAccion(imagenCliente))
        }else{

        }
        
        
    }

    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt="" height="100px" width="100px" className="img-fluid"/>
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-dark" onClick={()=>setActivarFormulario(true)}>Ediar nombre</button>
                        <button className="btn btn-dark" onClick={()=>setActivarFormularioImagen(true)}>Actualizar Imagen</button>                  
                    </div>
                   

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
                {
                    activarFormularioImagen &&
                    (
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <div className="input-group">
                                    <input type="file" 
                                        className="form-control" 
                                        id="inputGroupFile04" 
                                        name="" 
                                        aria-describedby="inputGroupFileAddon04" 
                                        aria-label="Actualizar imagen" 
                                        onChange={ e => setFotoNueva(e)}/>
                                    <button 
                                        className="btn btn-outline-secondary" 
                                        type="button" 
                                        id="inputGroupFileAddon04"
                                        onClick={()=>actualizarImagen()}>Actualizar</button>
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
