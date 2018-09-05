import React from 'react'
import { Menu } from 'antd';
import Icon from '../../../_reset_antd/Icon/index.jsx';
const { SubMenu } = Menu;
import Data from './DemoData.js'

export default class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'inline',
            theme: 'light',
        }
    }
    changeMode(value) {
        this.setState({
            mode: value ? 'vertical' : 'inline',
        });
    }

    changeTheme(value) {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
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
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode={this.state.mode}
                    theme={this.state.theme}
                >
                    {listItem}
                </Menu>
            </div>
        );
    }
}

// ReactDOM.render(<Sider />, mountNode);