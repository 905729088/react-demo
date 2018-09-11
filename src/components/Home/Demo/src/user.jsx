import React from 'react';
import { Button, Input } from 'antd'
import { G } from '../../../ACommon/Api'

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
            value: '',
        }
        this.G = G.api
        const Pre = React.createRef
        this.Pre = {
            userdata: Pre(),
            register: Pre(),
            login: Pre(),
            logout: Pre(),
        }
        this.result = this.result.bind(this)
        this.error = this.error.bind(this)
        this.setUserData = this.setUserData.bind(this)
    }
    componentDidMount () {
        this.Pre.userdata.current.innerHTML = `let userData = ${JSON.stringify({
            name: 'test',
            pass: '123',
        }, null, 2)}`

        this.Pre.register.current.innerHTML = `let R = G.api.register(JSON.stringify(userData))\n
        return R`

        this.Pre.login.current.innerHTML = `let R = G.api.login(userData.name, userData.pass, 'byname')\n
        return R`

        this.Pre.logout.current.innerHTML = `let R = G.api.logout(Result.sid, '')\n
        return R`
    }
    setUserData (event) {
        const target = event.target
        const userData = this.getUserData()
        target.name && (userData[target.name] = target.value)
        console.log(userData);
        this.Pre.userdata.current.innerHTML = `let userData = ${JSON.stringify(userData, null, 2)}`
    }
    getUserData () {
        return (new Function(this.Pre.userdata.current.innerHTML.replace(/let(\s+userData)/, 'return$1')))()
    }
    reset (key, value) {
        const state = {
            key,
            value,
            Success: '',
            Error: '',
            type: this.status[key],
        }

        if (typeof value === 'object') {
            state[key] = JSON.stringify(value, null, 2)
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
    runlApi (api) {
        const userData = this.getUserData()
        let fnCode = this.Pre[api].current.innerText.replace(/G\.api/g, 'G')
        const fn = new Function('G' , 'userData', 'Result', fnCode)
        const R = fn(this.G, userData, this.state.value)
        R.then(this.result)
        R.catch(this.error)
    }
    render () {
        return <React.Fragment>
            <div className="all">当前用户的sid：{ this.state.value && this.state.value.sid }</div>
            <div className="item">
                <span>
                    { this.state.type }返回值：
                </span>
                <pre style={{ height: '180px' }}>
                    {'let Result =' + this.state.Success}
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
                    ref={ this.Pre.userdata } >
                </pre>
            </div>
            <div className="item">
                <Button onClick={ () => this.runlApi('register') }>注册</Button>
                <pre ref={ this.Pre.register } contentEditable="plaintext-only">
                </pre>
            </div>
            <div className="item">
                <Button onClick={ () => this.runlApi('login') } type="primary">登陆</Button>
                <pre contentEditable="plaintext-only" ref={ this.Pre.login } contentEditable="plaintext-only">
                </pre>
            </div>
            <div className="item">
                <Button onClick={ () => this.runlApi('logout') } type="danger">登出</Button>
                <pre contentEditable="plaintext-only" ref={ this.Pre.logout } contentEditable="plaintext-only">
                </pre>
            </div>
            <div className="all">
                <h1>到底了</h1>
            </div>
        </React.Fragment>
    }
}