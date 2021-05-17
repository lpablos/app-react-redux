import React from 'react'
import Pokemones from './componentes/Pokemones'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  
  return (
    <Router>
      <div className="container mt-3">
        <Switch>
          <Route component={Pokemones} path="/" exact/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
