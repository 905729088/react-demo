import {HashRouter as Router} from "react-router-dom"
import React from 'react'
import Header from './components/Header.jsx'
import Container from './components/Container.jsx'
import AuthContext from './auth-context.js'

export default class HashRoute extends React.Component {
    constructor(props) {
        super(props)
        this.login = (info) => {
            console.log('login',info)
            this.setState(state => ({
                isAuthenticated: true,
                sid: info.sid,
                user: info.user
            }))
        }
        this.logout = () => {
            console.log('logout');
            this.setState(state => ({
                isAuthenticated: false,
                sid: '',
                user: null
            }))
            
        }
        this.state = {
            isAuthenticated: false,//false
            sid:'',
            user: null,//null
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
    
