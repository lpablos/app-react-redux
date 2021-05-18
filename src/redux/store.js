import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import pokeReduce from './pokeDucks'
import usuarioReduce from './usuarioDucks'

const rootReducer  = combineReducers({
    pokemones : pokeReduce,
    usuario : usuarioReduce
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}