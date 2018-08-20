import React from 'react'
import Introduce from './../Introduce/Introduce.jsx'
import CreateModal from './../Home/CreateModal/CreateModal.jsx'
import AppContent from './../AppContent/AppContent.jsx'
import CodeContent from './../CodeContent/CodeContent.jsx'
import {Route,Redirect,Switch} from 'react-router-dom'
import AuthContext from '../../auth-context.js'
import asyncComponent from './async-component.js'

const Home = asyncComponent(() =>
    import(/* webpackChunkName: "page-home" */'./../Home/Home.jsx'))
  
const Login = asyncComponent(() =>
    import(/* webpackChunkName: "page-login" */'./../Login/Login.jsx'))

const Register = asyncComponent(() =>
    import(/* webpackChunkName: "page-register" */'./../Register/Register.jsx'))
  
  

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