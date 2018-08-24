import {HashRouter as Router} from "react-router-dom"
import React from 'react'
import Header from './components/Header/ConnectHeader.jsx'
import Container from './components/ACommon/Container/Container.jsx'
import AuthContext from './auth-context.js'
import Footer from './components/Footer/Footer.jsx'
import { G } from './components/ACommon/Api';
import { createStore, applyMiddleware } from 'redux';
import redux from './components/ACommon/reducers'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'



const store = createStore(redux, applyMiddleware(thunk, createLogger()))
export default class HashRoute extends React.Component {
    constructor(props) {
        super(props)
        this.login = async(info) => {
            // sessionStorage.setItem('current_sid', info.sid);
            // window.localStorage.setItem('APP_SID', info.sid);
            // window.localStorage.setItem('APP_UID', info.user.id);
          
            // const userGroup = await this.getUserGroup();
            // const DATA_ID = await G.api.userGroupGetInfo('', userGroup.id, 'DATA_ID');//数据区id
            // const userType = await this.checnkMember(info.user,userGroup);
            this.setState(state => ({
                isAuthenticated: true,
                // sid: info.sid,
                // user: info.user,
                // userType: userType,
                // DATA_ID:DATA_ID
            }))
        }
        this.logout = () => {
           
            this.setState(state => ({
                isAuthenticated: false,
                // sid: '',
                // user: null,
                // userType: '',
                // DATA_ID:''
            }))
            
        }
        this.state = {
            isAuthenticated: false,//false
            // sid:'',
            // user: null,//null
            login: this.login,
            logout: this.logout,
            // userGroup:null,
            // userType:''
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
       
        return (
            <Provider store={store}>
                <AuthContext.Provider value={this.state} >
                    <Router >
                        <div> 
                            <Header />
                            <Container />
                            <Footer />
                        </div>
                    </Router>
                </AuthContext.Provider>
            </Provider>
             )
        }
}