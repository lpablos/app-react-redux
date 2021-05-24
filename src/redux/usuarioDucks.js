// librearias
import { auth, app, db } from '../firebase'


// Constantes
const dataInicial = {
    loading : false,
    activo: false
}

// Types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESSION = 'CERRAR_SESSION'


// Reduce
export default function usuarioReduce(state = dataInicial, action){
    switch(action.type){
        case LOADING:
            return { ...state, loading: true}
        case USUARIO_ERROR:
            return { ...state }
        case USUARIO_EXITO:
            return { ...state, loading: false, user: action.payload, activo: true }
        case CERRAR_SESSION:
            return { ...state, loading:false , activo: false }
        default:
            return state
    }
}

// Actiones

export const ingresoUsuarioAccion = () => async (dispatch) =>{
    dispatch({
        type: LOADING
    })
    try {
        // const res = await axios.
        const provider  = new app.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)        
        const usuario = {
            uid: res.user.uid, 
            email: res.user.email,
            displayName : res.user.displayName,   
            photoURL: res.user.photoURL
        }

        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()
        console.log("Este es ", usuarioDB.exists);
        if(usuarioDB.exists){
            // cuando el usuario existe en firestore nuestros registros            
            dispatch({
                type: USUARIO_EXITO,
                payload : usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
        }else{
            // No existe el usuario en firestore y lo traer de google
            await db.collection('usuarios').doc(usuario.email).set(usuario)
            dispatch({
                type: USUARIO_EXITO,
                payload : usuario
            })
            localStorage.setItem('usuario', JSON.stringify({ 
                uid: res.user.uid, 
                email: res.user.email   
            }))
        } 
    } catch (error) {
        console.log(error);
        dispatch({
            type : USUARIO_ERROR
        })
    }

}

export const leerUsuarioActivoAccion = () => (dispatch) =>{
    if(localStorage.getItem('usuario')){        
        dispatch({
            type: USUARIO_EXITO,
            payload : JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const cerrarSessionAccion = () => (dispatch) => {
    auth.signOut()
    localStorage.removeItem('usuario')
    dispatch({ type: CERRAR_SESSION })
    
}

export const actualizarUsuarioAccion = (nombreActualizado) => async (dispatch, getState) =>{
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario    
    try {
        await db.collection('usuarios')
            .doc(user.email)
            .update({
                displayName: nombreActualizado
            })
        const usuario =  {
            ...user,
            displayName: nombreActualizado
        }
        dispatch({
            type: USUARIO_EXITO,
            payload : usuario
        })
        localStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (error) {
        console.log(error);
    }
}