// Librerias
import axios from 'axios'

//Constantes
const dataInicial = {
    array:[]
}
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'

//reduce
export default function pokeReduce(state = dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
            return {...state, array: action.payload}
            
    
        default:
            return state
    }
}

//acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20')
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        })

    } catch (error) {
        
    }
}
