import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import NavBar from '../components/NavBar'
import Login from '../components/Login'
import ErrorAlert from '../components/ErrorAlert'

const routes = (
  <div>
    <NavBar />
    <ErrorAlert />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Switch>
  </div>
)

export default routes
