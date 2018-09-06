import React from 'react'
import { Menu } from 'antd';
import Icon from '../../../_reset_antd/Icon/index.jsx';
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
    }
    render() {
        return (
                <Menu mode="horizontal">
                    { this.state.listItems }
                </Menu>
        );
    }
}
