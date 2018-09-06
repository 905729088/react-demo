import React from 'react'
import Introduce from './../../Introduce/Introduce.jsx'
import CreateModal from './../../Home/CreateModal/CreateModal.jsx'
import AppContent from './../../AppContent/AppContent.jsx'
import CodeContent from './../../CodeContent/index'
import {Route,Redirect,Switch} from 'react-router-dom'
import AuthContext from '../../../auth-context.js'
import asyncComponent from './../async-component.js'

const Home = asyncComponent(() =>
    import(/* webpackChunkName: "page-home" */'./../../Home/ConnectHome.jsx'))
  
const Login = asyncComponent(() =>
    import(/* webpackChunkName: "page-login" */'./../../Login/ConnectLogin.jsx'))

const Register = asyncComponent(() =>
    import(/* webpackChunkName: "page-register" */'./../../Register/Register.jsx'))

export default class Container extends React.Component {
    
    render() {
       
        return(<AuthContext.Consumer>
            {auth => {
                const setDom = auth.isAuthenticated ? <Redirect to={{pathname: "/home"}}/>:null
                return (<React.Fragment>
                    <Switch>
                        <Route exact path="/" component={Introduce} />
                        <Route path="/login" component={Login} />
                        <Route path="/join" component={Register} />
                        <PrivateRoute path="/home" component={Home} isLogin={this.props.isLogin}/>
                        <PrivateRoute path="/create" component={CreateModal} isLogin={this.props.isLogin} />
                        <PrivateRoute path="/tree/:appName/:appVer" component={AppContent} isLogin={this.props.isLogin} />
                        <PrivateRoute path="/treeCode/:appName/:appVer/:packageName" component={CodeContent} isLogin={this.props.isLogin}/>
                        {setDom}
                    </Switch>
                </React.Fragment>)
            }}
        </AuthContext.Consumer>)
    }
}

const PrivateRoute = ({ component: Component,...rest }) => (
  <Route
    {...rest}
        render={props => {
           return  <AuthContext.Consumer>
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
    }
  />
);