import React from 'react'
import { HLayout, VLayout } from './Layout.jsx'
import AuthContext from '../auth-context.js'

import { Redirect } from 'react-router-dom'

export default class Register extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<AuthContext.Consumer>
            {auth => {
                return auth.isAuthenticated ? <Redirect to={{ pathname: "/home" }} />
                    :
                    <div>
                        <VLayout>
                            <div>用户名</div>
                            <div><input type="text" /></div>
                            <div>邮箱</div>
                            <div><input type="text" /></div>
                            <div>密码</div>
                            <div><input type="password" /></div>
                            <div>确认密码</div>
                            <div><input type="password" /></div>
                            <input type="submit" value="立即注册" />
                        </VLayout>
                    </div>
            }}
        </AuthContext.Consumer>)
    }
}