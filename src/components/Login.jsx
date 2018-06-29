import React from 'react'
import { HLayout,VLayout } from './Layout.jsx'
import AuthContext from '../auth-context.js'

import { Redirect } from 'react-router-dom'

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            password: ''
        }
        this.changeName = this.changeName.bind(this)
        this.changePass = this.changePass.bind(this)
    }
    changeName(event){
        this.setState({})
    }
    changePass(event) {
        this.setState({})
    }
    render(){
        return(<AuthContext.Consumer>
            {auth => { 
                return auth.isAuthenticated ? <Redirect to={{ pathname: "/home" }} />
                    :
                    <div>
                        <VLayout>
                            <div>用户名</div>
                            <div><input type="text" /></div>
                            <div>密码</div>
                            <div><input type="password" /></div>
                            <input type="submit" value="登陆" />
                        </VLayout>
                    </div>
            }}
        </AuthContext.Consumer>)
    }
}