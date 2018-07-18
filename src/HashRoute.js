import {HashRouter as Router} from "react-router-dom"
import React from 'react'
import Header from './components/Header.jsx'
import Container from './components/Container.jsx'
import AuthContext from './auth-context.js'

export default class HashRoute extends React.Component {
    constructor(props) {
        super(props)
        this.login = async(info) => {
            sessionStorage.setItem('current_sid', info.sid);
            const userGroup = await this.getUserGroup();
            window.DATA_ID = userGroup.manangers[0];
            const userType = await this.checnkMember(info.user,userGroup);
            this.setState(state => ({
                isAuthenticated: true,
                sid: info.sid,
                user: info.user,
                userGroup:userGroup,
                userType:userType
            }))
        }
        this.logout = () => {
            sessionStorage.removeItem('current_sid')
            sessionStorage.removeItem('current_pass')
            window.DATA_ID = '';
            this.setState(state => ({
                isAuthenticated: false,
                sid: '',
                user: null,
                userGroup:null,
                userType:''
            }))
            
        }
        this.state = {
            isAuthenticated: false,//false
            sid:'',
            user: null,//null
            login: this.login,
            logout: this.logout,
            userGroup:null,
            userType:''
        }
    }
    async getUserGroup() {//获取用户组 
        let userGroup = null;
        await G.api.getvar('', 'usergroup', 'GLOBAL_USER', 'name', (data) => { 
            userGroup = data;
        }, (name, err) => { 
            userGroup = null;
            console.log(name,err);
            });
        return userGroup;
        
    }
    async checnkMember(user,userGroup) {//验证是否是管理员 
       
        const adminGroup = userGroup.manangers;  
        const result = adminGroup.findIndex((value)=>value==user.id);
        return result == -1 ? 'user' : 'admin';
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
