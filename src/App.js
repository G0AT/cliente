import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Maletas from './components/maleta/Maletas';
import MaletaState from './context/maletas/maletaState';
import MaterialState from './context/material/materialState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/authentication/authState';
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';

//Revisar si tenemos token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  return (
    <MaletaState>
      <MaterialState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                <RutaPrivada exact path="/maletas" component={Maletas}/>
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </MaterialState>
    </MaletaState>
  );
}

export default App;
