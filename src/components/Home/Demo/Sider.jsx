import React from 'react'
import { Menu, Icon } from 'antd';
import Data from './DemoData.js'

export default class Sider extends React.Component {
    constructor(props) {
        super(props)
        const listItems = Data.map((item, i) => <Menu.Item key={ i } 
            onClick={ e => props.callback(e.key)}>
                <Icon type={ item.type } />
                <span>{ item.name }</span>
        </Menu.Item>)
        this.state = {
            listItems,
        }
        props.callback(0)
    }
    render() {
        return (
                <Menu mode="horizontal" defaultSelectedKeys={["0"]}>
                    { this.state.listItems }
                </Menu>
        );
    }
}
