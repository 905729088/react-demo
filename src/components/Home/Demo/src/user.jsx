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
            userdata: {},
        }
        this.result = this.result.bind(this)
        this.error = this.error.bind(this)
        this.setUserData = this.setUserData.bind(this)
    }
    addUserDate () {
        const userdata = this.state.userdata;
        userdata[this.addKey] = this.addValue
        !this.addValue && delete userdata[this.addKey]
        console.log(userdata);
        this.setState({
            userdata,
        })
    }
    setUserData (event) {
        const target = event.target
        const userdata = this.state.userdata;
        target.name && (userdata[target.name] = target.value)
        console.log(userdata);
        this.setState({
            userdata,
        })
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
    register (userdata ) {
        let R = G.api.register(JSON.stringify(userdata))
        R.then(this.result)
        R.catch(this.error)
    }
    login (userdata) {
        let R = G.api.login(userdata.name, userdata.pass, 'byname')
        R.then(this.result)
        R.catch(this.error)
    }
    render () {
        const userdata = this.state.userdata
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
                    
                <Input style={{ width: '50%' }} type="text" 
                    onChange={ e => this.addKey = e.target.value} addonBefore="key" />
                <Input style={{ width: '50%' }} type="text" 
                    onChange={ e => this.addValue = e.target.value } addonBefore="value" 
                    addonAfter={ <Button onClick={ () => this.addUserDate() } >添加</Button> } />
                <pre style={{ height: '140px' }}>
                    let userdata = { JSON.stringify(userdata, null, 2) }
                </pre>
            </div>
            <div>
                <Button onClick={ () => this.register(userdata) }>注册</Button>
                <pre>
                    { this.register.toLocaleString() }
                </pre>
            </div>
            <div>
                <Button onClick={ () => this.login(userdata) } type="primary">登陆</Button>
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