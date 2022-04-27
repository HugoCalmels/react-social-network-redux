/*

import React from 'react';
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({isAuth: isAuth, component: Component, ...rest}) {
  return (
    <Route {...rest} render={(props) => {
      console.log('------------')
      console.log(isAuth)
      console.log('------------')
      if (isAuth) {
        return <Component />
      } else {
        return <Redirect to={{ pathname: '/', state:{from: props.location} }} />
      }
    }}/>
  )
}

export default ProtectedRoute

*/