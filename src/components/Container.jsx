import React from 'react'
import Introduce from './Introduce.jsx'
import Home from './Home.jsx'
import Login from './Login.jsx'
import CreateModal from './CreateModal.jsx'
import AppContent from './AppContent.jsx'
import CodeContent from './CodeContent.jsx'
import Register from './Register.jsx'
import {Route,Redirect,Switch} from 'react-router-dom'
import AuthContext from '../auth-context.js'

export default class Container extends React.Component {
    render() {
        return(<AuthContext.Consumer>
            {auth => {
                const setDom = auth.isAuthenticated ? <Redirect to={{pathname: "/home"}}/>:null
                return (<div>
                   
                    <Switch>
                        <Route exact path="/" component={Introduce} />
                        <Route path="/login" component={Login} />
                        <Route path="/join" component={Register} />
                        <PrivateRoute path="/home" component={Home} />
                        <PrivateRoute path="/create" component={CreateModal} />
                        <PrivateRoute path="/tree/:appName/:appVer" component={AppContent} />
                        <PrivateRoute path="/treeCode/:appName/:appVer/:packageName" component={CodeContent} />
                        {setDom}
                    </Switch>
                </div>)
            }}
        </AuthContext.Consumer>)
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
    <AuthContext.Consumer>
        {auth => (
            auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
        )
        }
      
    </AuthContext.Consumer>
    }
  />
);