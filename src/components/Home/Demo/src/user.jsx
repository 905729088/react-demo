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
            style: {},
        }
        this.Pre = React.createRef()
        this.result = this.result.bind(this)
        this.error = this.error.bind(this)
        this.setUserData = this.setUserData.bind(this)
    }
    componentDidMount () {
        this.Pre.current.innerHTML = `let userData = ${JSON.stringify({}, null, 2)}`
    }
    setUserData (event) {
        const target = event.target
        const userData = this.getUserData()
        target.name && (userData[target.name] = target.value)
        console.log(userData);
        this.Pre.current.innerHTML = `let userData = ${JSON.stringify(userData, null, 2)}`
    }
    getUserData () {
        return (new Function(this.Pre.current.innerHTML.replace(/let(\s*userData)/, 'return$1')))()
    }
    reset (key, value) {
        console.log({
            [key]: value,
        });
        const state = {
            Success: '',
            Error: '',
            type: '',
        }
        this.setState({
            ...state,
            [key]: typeof value === 'object' ? JSON.stringify(value, null, 2) : value,
            type: this.status[key],
            key,
        })
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
        console.error(userData);
        
        let R = G.api.login(userData.name, userData.pass, 'byname')
        R.then(this.result)
        R.catch(this.error)
    }
    render () {
        return <React.Fragment>
            <div>
                <span style={{  }}>
                    { this.state.type }返回值：
                </span>
                <pre style={{ height: '180px' }}>
                    {this.state.Success}
                    {this.state.Error}
                </pre>
            </div>
            <div>
                <Input type="text" name="name" 
                    onChange={ this.setUserData } addonBefore="用户名" />
                <Input type="password" name="pass" 
                    onChange={ this.setUserData } addonBefore="密 码" />
                <pre 
                    contentEditable="plaintext-only" 
                    ref={ this.Pre } >
                </pre>
            </div>
            <div>
                <Button onClick={ () => this.register(this.getUserData()) }>注册</Button>
                <pre>
                    { this.register.toLocaleString() }
                </pre>
            </div>
            <div>
                <Button onClick={ () => this.login(this.getUserData()) } type="primary">登陆</Button>
                <pre>
                    { this.login.toLocaleString() }
                </pre>
            </div>
            <div>
                <Button type="danger">登出</Button>
            </div>
            <div>
                <h1>到底了</h1>
            </div>
        </React.Fragment>
    }
}