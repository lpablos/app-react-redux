import React, {useState} from 'react'
import Pokemones from './componentes/Pokemones'
import Login from './componentes/Login'
import Navbar from './componentes/Navbar';
import {auth} from './firebase'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)

  React.useEffect(() => {
    fetchUser()
  }, [])
  
  const fetchUser = () => {
    auth.onAuthStateChanged(user => {
        console.log(user)
        (user)
          ?setFirebaseUser(user)
          :setFirebaseUser(null)
        
    })    
  }
  
  return firebaseUser !==false?  (
    <Router>
      <div className="container mt-3">
        <Navbar/>
        <Switch>
          <Route component={Pokemones} path="/" exact/>
          <Route component={Login} path="/login" exact/>          
        </Switch>
      </div>
    </Router>
  ): (<p>Cargando...</p>);
}

export default App;
