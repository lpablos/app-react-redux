import React, {useState} from 'react'
import Pokemones from './componentes/Pokemones'
import Login from './componentes/Login'
import Navbar from './componentes/Navbar';
import {auth} from './firebase'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)
  console.log("Estado inicial de firebase", firebaseUser)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
        if(user){
          setFirebaseUser(user)
        }else{
          setFirebaseUser(null)
        }
      })
    }
    fetchUser()
  }, [])
  
  const RutaPrivada = ({component, path, ...rest})=>{
    // console.log({component}, {path}, {...rest}); asi se verifican las opciones 
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid ===firebaseUser.uid){
        return <Route component={component} to={path} {...rest}/>
      }else{
        <Redirect to='/login' {...rest}/>
      }
    }else{
      return <Redirect to='/login' {...rest}/>
    }
  }

  
  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-3">
        <Navbar/>
        <Switch>
          <RutaPrivada component={Pokemones} path="/" exact/>
          <Route component={Login} path="/login" exact/>          
        </Switch>
      </div>
    </Router>
  ): (<p>Cargando...</p>);
}

export default App;
