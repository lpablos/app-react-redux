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
const POKE_INF_EXITO = "POKE_INF_EXITO"


//reduce
export default function pokeReduce(state = dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
            return { ...state, ...action.payload }
        case GET_POKE_NEXT_SUCCESS:
            // return { ...state, array: action.payload.array, offset: action.payload.offset} 
            return { ...state, ...action.payload }
        case POKE_INF_EXITO:
            return { ...state, unPokemon: action.payload }    
        default:
            return state
    }
}

//acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    // sin desctrucutracion de un objecto
    // const offset = getState().pokemones.offset
    if(localStorage.getItem('offsert=0')){        
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload : JSON.parse(localStorage.getItem('offsert=0'))
        })
    }else{
        try {            
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
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
    if(localStorage.getItem(next)){
        
        dispatch({
            type: GET_POKE_NEXT_SUCCESS,
            payload : JSON.parse(localStorage.getItem(next))
        })
    }else{
        console.log("peticion Next");
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
            localStorage.setItem(next, JSON.stringify(res.data))        
        } catch (error) {
            console.log(error);
        }
    }
}

export const anteriorPokemonAccion = () => async ( dispach, getState ) =>{
    const { previous } = getState().pokemones
    if(localStorage.getItem(previous)){
        
        dispach({
            type: GET_POKE_NEXT_SUCCESS,
            payload : JSON.parse(localStorage.getItem(previous))
        })
    }else{
        try {            
            const res = await axios.get(previous)        
            dispach({
                type: GET_POKE_NEXT_SUCCESS,
                payload : res.data
            })
            localStorage.setItem(previous, JSON.stringify(res.data))
    
        } catch (error) {
            console.log(error);
        }
    }

}

export const unPokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispach, getState )=>{
    if(localStorage.getItem(url)){        
        dispach({
            type: POKE_INF_EXITO,
            payload: JSON.parse(localStorage.getItem(url))   
        })
    }else{        
        try {
            const res = await axios.get(url)
            dispach({
                type: POKE_INF_EXITO,
                payload : {
                    name: res.data.name,
                    weight : res.data.weight,
                    height: res.data.height, 
                    foto: res.data.sprites.front_default
                }            
            })
            localStorage.setItem(url,JSON.stringify({
                name: res.data.name,
                weight : res.data.weight,
                height: res.data.height, 
                foto: res.data.sprites.front_default
            }))
        } catch (error) {
            console.log(error);
        }
    }
}
