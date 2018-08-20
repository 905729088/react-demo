import {HashRouter as Router} from "react-router-dom"
import React from 'react'
import Header from './components/Header/Header.jsx'
import Container from './components/ACommon/Container.jsx'
import AuthContext from './auth-context.js'
import Footer from './components/Footer/Footer.jsx'
import { G } from './components/ACommon/Api';
export default class HashRoute extends React.Component {
    constructor(props) {
        super(props)
        this.login = async(info) => {
            sessionStorage.setItem('current_sid', info.sid);
            const userGroup = await this.getUserGroup();
            const DATA_ID = await G.api.userGroupGetInfo('', userGroup.id, 'DATA_ID');//数据区id
            const userType = await this.checnkMember(info.user,userGroup);
            this.setState(state => ({
                isAuthenticated: true,
                sid: info.sid,
                user: info.user,
                userGroup:userGroup,
                userType: userType,
                DATA_ID:DATA_ID
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
                userType: '',
                DATA_ID:''
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
        await G.api.getVar('', 'usergroup', 'GLOBAL_USER', 'name', (data) => { 
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
                    <Footer />
                    
                </div>
            </Router>
        </AuthContext.Provider> )
        }
    }
