import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import AppHome from '../App'
import LoginForm from '../pages/login'
import HomeDemo from '../pages/home'

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={AppHome}/>
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/demo" component={HomeDemo}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;