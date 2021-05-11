import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion, siguientePokemonAcccion} from '../redux/pokeDucks'

const Pokemones = () => {
    
    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemones.array)

    return (
        <div>
            <h4>Lista de pokemones</h4>
            <button onClick={ ()=> dispatch(obtenerPokemonesAccion()) }>Obtener pokemones</button>
            <button onClick={ ()=> dispatch(siguientePokemonAcccion(20))}>Siguiente</button>
            <ul>
                {
                    pokemones.map(item=>(
                        <li key={item.name}>{item.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pokemones
