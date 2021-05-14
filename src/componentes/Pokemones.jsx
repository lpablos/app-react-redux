import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion} from '../redux/pokeDucks'

const Pokemones = () => {
    
    const dispatch = useDispatch()
    const previous = useSelector(store => store.pokemones.previous)
    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)

    return (
        <div className="row">
            <div className="col-md-6">
                <h3>Lista de pokemones</h3>
                <div className="d-flex justify-content-between">
                    {
                        previous
                        &&  <button className="btn btn-dark" onClick={ ()=> dispatch(anteriorPokemonAccion()) }> Anterior</button>
                    }

                    {
                        pokemones.length === 0 
                        && <button className="btn btn-dark" onClick={ ()=> dispatch(obtenerPokemonesAccion()) }>Obtener pokemones</button>
                    }

                    {
                        next 
                        && <button className="btn btn-dark" onClick={ ()=> dispatch(siguientePokemonAccion())}>Siguiente</button>
                    }
                </div>
                <ul className="list-group mt-3">
                    {
                        pokemones.map(item=>(
                            <li key={item.name} className="list-group-item text-uppercase">
                                {item.name}
                                <button className="btn btn-dark btn-sm float-end">Detalle</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-md-6">
                <h3>Detalle de pokemons</h3>
            </div>
        </div>
    )
}

export default Pokemones
