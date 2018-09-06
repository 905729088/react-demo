import React from 'react';
import { Button } from 'antd'
export default class User extends React.Component {

    render () {
        return <React.Fragment>
            <Button>注册</Button>
            <Button type="primary">登陆</Button>
            <Button type="danger">登出</Button>
        </React.Fragment>
    }
}