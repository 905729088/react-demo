import {HashRouter as Router} from "react-router-dom"
import React from 'react'
import Header from './components/Header.jsx'
import Container from './components/Container.jsx'
import AuthContext from './auth-context.js'

export default class HashRoute extends React.Component {
    constructor(props) {
        super(props)
        this.login = (info) => {
            sessionStorage.setItem('current_sid', info.sid)
            this.setState(state => ({
                isAuthenticated: true,
                sid: info.sid,
                user: info.user
            }))
        }
        this.logout = () => {
            sessionStorage.removeItem('current_sid')
            sessionStorage.removeItem('current_pass')
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
        const styles = HashRoute.styles;
        return ( <AuthContext.Provider value = {this.state} >
            <Router>
                <div> 
                    <Header />
                    <Container />
                    <div style={styles.footer}>
                        <div>Copyright©2017 沪ICP备16035344号-1</div>
                        <div style={styles.footerRight}>
                            <span >隐私条款</span>
                            <span style={{marginTop:'-2px'}}>|</span>
                            <span>用户协议</span>
                        </div>
                    </div>
                </div>
            </Router>
        </AuthContext.Provider> )
        }
    }
HashRoute.styles = {
    footer: {
        position: 'fixed',
        boxSzing: 'border-box',
        padding:'0 20% 21px 20%',
        display: 'flex',
        width:'100%',
        alignItems: 'center',
        justifyContent:'space-between',
        bottom: '0px',
        zIndex: '9999',
        color: '#828ea1',
        fontSize: '14px',
    },
    footerRight: {
        display: 'flex',
        width:'150px',
        alignItems: 'center',
        justifyContent:'space-around',
        color: '#828ea1',
        fontSize: '14px',
    },
   
}
