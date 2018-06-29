import {HashRouter as Router} from "react-router-dom"
import React from 'react'
import Header from './components/Header.jsx'
import Container from './components/Container.jsx'
import AuthContext from './auth-context.js'

export default class HashRoute extends React.Component {
    constructor(props) {
        super(props);
        this.login = () => {
            console.log('login');
            this.setState(state => ({
                isAuthenticated: true
            }))
        }
        this.logout = () => {
            console.log('logout');
            this.setState(state => ({
                isAuthenticated: false
            }))
            
        }

        this.state = {
            isAuthenticated: true,
            login: this.login,
            logout: this.logout,
        }
    }
    render() {
        return ( <AuthContext.Provider value = {this.state} >
            <Router>
                <div> 
                    <Header />
                    <Container />
                </div>
            </Router>
        </AuthContext.Provider> )
        }
    }
    
