import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Assets/pages/Home/App';
//importou a pagina categoria
import Categorias from '../src/Assets/pages/Categorias/Categorias';
import Eventos from '../src/Assets/pages/Eventos/eventos';
import Login from './Assets/pages/Login/login';
import NotFound from './Assets/pages/NotFound/Notfound';
import * as serviceWorker from './serviceWorker';
//importou a biblioteca react-router-dom
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
//Importamoss nosso css padrão 
import './Assets/css/flexbox.css';
import './Assets/css/reset.css';
import './Assets/css/style.css';
//Importamos
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

//realizar a criação das rotas
 
const Rotas = (
    <Router>
        <div>
            <Switch>
            <Route exact path = "/" component={App}/>
            <Route path="/categorias" component={ () => <Categorias titulo_pagina ="Categorias-Gufos"/> } />
            <Route path="/eventos" component={Eventos}/>
            <Route path="/login" component={Login}/>
            <Route component = {NotFound}/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
