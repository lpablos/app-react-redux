// librearias
import { auth, app } from '../firebase'


// Constantes
const dataInicial = {
    loading : false,
    activo: false
}

// Types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'


// Reduce
export default function usuarioReduce(state = dataInicial, action){
    switch(action.type){
        case LOADING:
            return { ...state, loading: true}
        case USUARIO_ERROR:
            return { ...state }
        case USUARIO_EXITO:
            return { ...state, loading: false, user: action.payload, activo: true }
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
        console.log("Esta es al respues",res);
        dispatch({
            type: USUARIO_EXITO,
            payload : {
                uid: res.user.uid, 
                email: res.user.email   
            }
        })
        localStorage.setItem('usuario', JSON.stringify({ 
            uid: res.user.uid, 
            email: res.user.email   
        }))
        
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