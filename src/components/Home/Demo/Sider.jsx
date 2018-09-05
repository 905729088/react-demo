import React from 'react'
import { Menu } from 'antd';
import Icon from '../../../_reset_antd/Icon/index.jsx';
const { SubMenu } = Menu;
import Data from './DemoData.js'

export default class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: ['sub1'],
            rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10']
        }
        this.onOpenChange = this.onOpenChange.bind(this);
    }
    onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    render() {
        const listItem = Data.map((v, i) =>
            (<SubMenu key={v.key} title={<span><Icon type={v.type} /><span>{v.name}</span></span>}>
                {v.list.map((v, i) => (<Menu.Item key={v.key}>{v.name}</Menu.Item>))}
            </SubMenu>))
        console.log(listItem)
        return (
            <div style={{ float: 'left', borderRight: '1px solid #e8e8e8', height: '100%', overflowY: 'auto' }}>
                <Menu
                    style={{ width: 230, borderRight: 'none' }}
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                >
                    {listItem}
                </Menu>
            </div>
        );
    }
}

// ReactDOM.render(<Sider />, mountNode);