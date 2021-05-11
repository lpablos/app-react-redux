// Librerias
import axios from 'axios'

//Constantes
const dataInicial = {
    array:[],
    offset: 0
}
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const GET_POKE_NEXT_SUCCESS = 'GET_POKE_NEXT_SUCCESS'

//reduce
export default function pokeReduce(state = dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
            return { ...state, array: action.payload }
        case GET_POKE_NEXT_SUCCESS:
            return { ...state, array: action.payload.array, offset: action.payload.offset}    
    
        default:
            return state
    }
}

//acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    // sin desctrucutracion de un objecto
    const offset = getState().pokemones.offset
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        })

    } catch (error) {
        console.log(error);
    }
}

export const siguientePokemonAcccion = (numero) => async (dispatch, getState) => {
    // destructuracion de un objecto
    const { offset } = getState().pokemones 
    const siguiente = offset + numero
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`)
        dispatch({
            type: GET_POKE_NEXT_SUCCESS,
            payload: {
                array : res.data.results,
                offset : siguiente   
            }
        })        
    } catch (error) {
        console.log(error);
    }
}
