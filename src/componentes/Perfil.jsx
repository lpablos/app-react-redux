import React, {useState} from 'react'
import {useSelector} from 'react-redux'

const Perfil = () => {
    const usuario = useSelector(store => store.usuario.user)
    const [nameUser, setNameUser] = useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)
    const actualizarUsuario = () => {
        console.log("Este es el nuevo valor a guardar", nameUser);
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
