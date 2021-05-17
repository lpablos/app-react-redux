import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unPokeDetalleAccion } from '../redux/pokeDucks'

const Detalle = () => {
    const dispach = useDispatch()

    useEffect(() => {
        fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () =>{
        dispach(unPokeDetalleAccion())
        console.log("Busqueda");
    }


    const pokemon = useSelector(store => store.pokemones.unPokemon)
    
    return pokemon ? (
        <div className="card mt-4 text-center">
            <div className="card-body">
                <img src={pokemon.foto} alt="" className="img-fluid"/>
                <div className="card-title">
                    {pokemon.nombre}
                </div>
                <div className="card-text">
                    Ancho: {pokemon.weight} | alto: {pokemon.height}
                </div>

            </div>
        </div>
    ): null
}

export default Detalle
