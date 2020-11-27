import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './routes.js'
import { Navbar } from './cmps/Navbar'
// import Login from './pages/Login'

export function App() {
  return (
    <div className='App'>
      <header>
        <Navbar />
      </header>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            component={route.component}
            path={route.path}
            exact
          />
        ))}
      </Switch>
    </div>
  )
}
