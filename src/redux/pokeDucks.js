// Librerias
import axios from 'axios'

//Constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results:[]
}
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const GET_POKE_NEXT_SUCCESS = 'GET_POKE_NEXT_SUCCESS'


//reduce
export default function pokeReduce(state = dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
            return { ...state, ...action.payload }
        case GET_POKE_NEXT_SUCCESS:
            // return { ...state, array: action.payload.array, offset: action.payload.offset} 
            return { ...state, ...action.payload}   
    
        default:
            return state
    }
}

//acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    // sin desctrucutracion de un objecto
    // const offset = getState().pokemones.offset
    if(localStorage.getItem('offsert=0')){
        console.log("Datos desde el storage");
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload : JSON.parse(localStorage.getItem('offsert=0'))
        })
    }else{
        try {
            console.log("Datos desde el servicio");
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
            // console.log(res.data);
            dispatch({
                type: OBTENER_POKEMONES_EXITO,
                payload: res.data
            })
            localStorage.setItem('offsert=0', JSON.stringify(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const siguientePokemonAccion = () => async (dispatch, getState) => {
    // destructuracion de un objecto
    // const { offset } = getState().pokemones 
    // const siguiente = offset + numero
    const { next } = getState().pokemones    
    try {
        // const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`)
        const res = await axios.get(next)
        dispatch({
            type: GET_POKE_NEXT_SUCCESS,
            payload: res.data
            // payload: {
            //     array : res.data.results,
            //     offset : siguiente   
            // }
        })        
    } catch (error) {
        console.log(error);
    }
}

export const anteriorPokemonAccion = () => async ( dispach, getState ) =>{
    try {
        const { previous } = getState().pokemones
        const res = await axios.get(previous)        
        dispach({
            type: GET_POKE_NEXT_SUCCESS,
            payload : res.data
        })

    } catch (error) {
        console.log(error);
    }

}
