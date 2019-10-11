import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router}  from 'react-router-dom';
import RouteComp from './Router/route';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(<Router>

    <RouteComp/>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
