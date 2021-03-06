import React from 'react';
import { Tag, Button, Collapse } from 'antd'
import { G } from '../../../ACommon/Api'
import { getTestUser } from './TestlApi.js'

export default class Table extends React.Component{
    constructor(props){
        super(props)
        this.G = G.api
        this.color = ['red', 'orange', 'violet', 'green', 'blue', 'indigo', 'purple']
        const Pre = React.createRef
        this.Pre = {
            add: Pre(),
            del: Pre(),
            set: Pre(),
            get: Pre(),
        }
        const list = [
        {
            tit: 'add',
            pre: `
let info = {
    id: '001',
    name: '杯子',
    parice: 12.00,
}
let R = G.api.hSet(userData.sid, '', '__TEST_TABLE_DATA__', info.id, JSON.stringify(info))
return R`
        }, {
            tit: 'del',
            pre: `let R = G.api.hDel(userData.sid, '', '__TEST_TABLE_DATA__', '001')\nreturn R`
        }, {
            tit: 'set',
            pre: `
let info = {
    id: '001',
    name: '杯子',
    parice: 15.00,
}
let R = G.api.hSet(userData.sid, '', '__TEST_TABLE_DATA__', info.id, JSON.stringify(info))
return R`
        }, {
            tit: 'get',
            pre: `let R = G.api.hGetAll(userData.sid, '', '__TEST_TABLE_DATA__')\nreturn R`
        }]
        const listText = ['增', '删', '改', '查']
        const listItems = list.map((v, i) => <Collapse.Panel key={ i }
            header={ <Tag color={ this.color[i + 2] }>{ listText[i] }：</Tag> }>
            <pre 
                style={{ height: '380px' }}
                contentEditable="plaintext-only"
                ref={ this.Pre[v.tit] } >
                { v.pre }
            </pre>
            <Button onClick={ () => this.commit(v.tit) }>提交</Button>
        </Collapse.Panel>)

        this.state = {
            Result: '',
            userData: '',
            listItems,
            Success: '',
            Error: '',
            key: '',
        }
        this.testUser = getTestUser()
        console.log(this.testSid)
    }
    
    componentDidMount(){
        this.testUser.then(userData => {
            this.setState({
                userData,
            })
        })
    }
    async commit(tit){
        const fnCode = this.Pre[tit].current.innerText.replace(/G\.api/g, 'G')
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
                <Tag color={ this.color[0] }>测试用：</Tag>
                <pre style={{ height: '180px' }}>
                    {'let userData =' + JSON.stringify(this.state.userData, null, 2)}
                </pre>
            </div>
            <div className="item">
                <Tag color={ this.color[0] }>返回值：</Tag>
                <pre style={{ height: '180px' }}>
                    {'let Result =' + (this.state.key === "Success" ? this.state.Success : this.state.Error)}
                </pre>
            </div>
            <Collapse bordered={false} className="all" defaultActiveKey={['0']} accordion>
                {this.state.listItems}
            </Collapse>
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