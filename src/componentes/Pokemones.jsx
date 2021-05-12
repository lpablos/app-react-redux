import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion} from '../redux/pokeDucks'

const Pokemones = () => {
    
    const dispatch = useDispatch()
    const previous = useSelector(store => store.pokemones.previous)
    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)

    return (
        <div>
            <h4>Lista de pokemones</h4>
            {
                previous
                &&  <button onClick={ ()=> dispatch(anteriorPokemonAccion()) }> Anterior</button>
            }

            {
                pokemones.length === 0 
                && <button onClick={ ()=> dispatch(obtenerPokemonesAccion()) }>Obtener pokemones</button>
            }

            {
                next 
                && <button onClick={ ()=> dispatch(siguientePokemonAccion())}>Siguiente</button>
            }
            
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
