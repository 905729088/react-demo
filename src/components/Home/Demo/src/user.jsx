import React from 'react';
import { Button, Input } from 'antd'
import * as api from '../../../ACommon/Api'

const G = api.G

export default class User extends React.Component {
    constructor(props){
        super(props)
        this.name = ''
        this.password = ''
        this.status = {
            Success: '成功的',
            Error: '错误的',
        }
        this.state = {
            Success: '',
            Error: '',
            type: '',
            sid: '',
            name: '',
        }
        this.Pre = React.createRef()
        this.result = this.result.bind(this)
        this.error = this.error.bind(this)
        this.setUserData = this.setUserData.bind(this)
    }
    componentDidMount () {
        this.Pre.current.innerHTML = `let userData = ${JSON.stringify({
            name: 'test',
            pass: '123',
        }, null, 2)}`
    }
    setUserData (event) {
        const target = event.target
        const userData = this.getUserData()
        target.name && (userData[target.name] = target.value)
        console.log(userData);
        this.Pre.current.innerHTML = `let userData = ${JSON.stringify(userData, null, 2)}`
    }
    getUserData () {
        return (new Function(this.Pre.current.innerHTML.replace(/let(\s+userData)/, 'return$1')))()
    }
    reset (key, value) {
        const state = {
            key,
            Success: '',
            Error: '',
            type: this.status[key],
        }

        if (typeof value === 'object') {
            state[key] = JSON.stringify(value, null, 2)
            state['name'] = value && value.name
            state['sid'] = value && value.sid
        } else {
            state[key] = value
        }
        console.log(state);
        this.setState(state)
    }
    result (result){
        this.reset('Success', result)
    }
    error (error) {
        this.reset('Error', error.message)
    }
    register (userData ) {
        let R = G.api.register(JSON.stringify(userData))
        R.then(this.result)
        R.catch(this.error)
    }
    login (userData) {
        let R = G.api.login(userData.name, userData.pass, 'byname')
        R.then(this.result)
        R.catch(this.error)
    }
    logout (sid) {
        let R = G.api.logout(sid, '')
        R.then(this.result)
        R.catch(this.error)
    }
    render () {
        return <React.Fragment>
            <div className="all">当前用户的sid：{ this.state.sid }</div>
            <div className="item">
                <span>
                    { this.state.type }返回值：
                </span>
                <pre style={{ height: '180px' }}>
                    {this.state.Success}
                    {this.state.Error}
                </pre>
            </div>
            <div className="item">
                <Input type="text" name="name"
                    onChange={ this.setUserData } defaultValue="test" addonBefore="用户名" />
                <Input type="password" name="pass"
                    onChange={ this.setUserData } defaultValue="123" addonBefore="密 码" />
                <pre 
                    contentEditable="plaintext-only"
                    ref={ this.Pre } >
                </pre>
            </div>
            <div className="item">
                <Button onClick={ () => this.register(this.getUserData()) }>注册</Button>
                <pre>
                    { this.register.toLocaleString() }
                </pre>
            </div>
            <div className="item">
                <Button onClick={ () => this.login(this.getUserData()) } type="primary">登陆</Button>
                <pre>
                    { this.login.toLocaleString() }
                </pre>
            </div>
            <div className="item">
                <Button onClick={ () => this.logout(this.state.sid) } type="danger">登出</Button>
                <pre>
                    { this.logout.toLocaleString() }
                </pre>
            </div>
            <div className="all">
                <h1>到底了</h1>
            </div>
        </React.Fragment>
    }
}