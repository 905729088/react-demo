import React from 'react';
import { Tag, Button, Input } from 'antd'
import { G } from '../../../ACommon/Api'
import { getTestUser } from './TestlApi'

export default class Windows extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Result: '',
            userData: '',
            Success: '',
            Error: '',
            key: '',
        }
        this.Pre = React.createRef()
        this.G = G.api
        this.testUser = getTestUser()
    }
    componentDidMount(){
        this.testUser.then(userData => {
            this.setState({
                userData,
            })
        })
        this.Pre.current.innerHTML = `
function getVar(G, userData) {
    let R = G.api.getVar(userData.sid, 'now')
    return R
}`
    }
    async commit(){
        const fnCode = this.Pre.current.innerText.replace(/G\.api/g, 'G') + '\nreturn getVar(G, userData)'
        const fn = new Function('G' , 'userData', fnCode)
        console.log(fnCode, await this.testUser)
        fn(this.G, await this.testUser)
        .then(result => {
            this.reset('Success', result)
        })
        .catch(error => {
            this.reset('Error', error.message)
        })
    }
    render () {
        return <React.Fragment>
            <div className="item">
                <Tag color='red'>测试用：</Tag>
                <pre style={{ height: '180px' }}>
                    {'let userData =' + JSON.stringify(this.state.userData, null, 2)}
                </pre>
            </div>
            <div className="item">
                <Tag color='orange'>返回值：</Tag>
                <pre style={{ height: '180px' }}>
                    {'let Result =' + (this.state.key === "Success" ? this.state.Success : this.state.Error)}
                </pre>
            </div>
            <div className="all">
                <Tag color='violet'>DEMO：</Tag>
                <pre style={{ height: '330px' }} contentEditable="plaintext-only" ref={ this.Pre }></pre>
                <Button onClick={ () => this.commit() }>运行</Button>
            </div>
        </React.Fragment>
    }
    reset (key, value) {
        const state = {
            key,
            value,
            Success: '',
            Error: '',
        }

        if (typeof value === 'object') {
            state[key] = JSON.stringify(value, null, 2)
        } else {
            state[key] = value
        }
        console.log(state);
        this.setState(state)
    }
}