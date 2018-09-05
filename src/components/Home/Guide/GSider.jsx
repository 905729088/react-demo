import React from 'react'
// import { Menu, Icon, Switch } from 'antd';
// const { SubMenu } = Menu;
// import GData from './GuideData.js'
// export default class GSider extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             mode: 'inline',
//             theme: 'light',
//         }
//     }
//     render() {
//         const Item = GData.map((v, i) =>
//             (<SubMenu key={v.key} title={<span><Icon type={v.type} /><span>{v.name}</span></span>}>
//                 {v.list.map((v, i) => (<Menu.Item key={v.key}>{v.name}</Menu.Item>))}
//             </SubMenu>))
//         return (
//             <div style={{ float: 'left', borderRight: '1px solid #e8e8e8', height: '100%', overflowY: 'auto' }}>
//                 <Menu
//                     style={{ width: 230, borderRight: 'none' }}
//                     defaultSelectedKeys={['1']}
//                     defaultOpenKeys={['key1']}
//                     mode={this.state.mode}
//                     theme={this.state.theme}
//                 >
//                     <Menu.Item key="1" style={{ marginTop: 0 }}><Icon type="desktop" />
//                         开发环境配置
//                     </Menu.Item>
//                     {Item}
//                 </Menu>
//             </div>
//         );
//     }
// }

import { Tabs, Select } from 'antd';

const TabPane = Tabs.TabPane;
const Option = Select.Option;


export default class GSider extends React.Component {
    constructor(props) {
                super(props);
                this.state = {
                    tabPosition: 'left',
                }
            }
  render() {
    return (
      <div style={{height:'100%'}}>
        <Tabs tabPosition={this.state.tabPosition} style={{height:'100%'}}>
          <TabPane tab="开发环境配置" key="1">开发环境配置</TabPane>
          <TabPane tab="本地操作" key="2">本地操作</TabPane>
          <TabPane tab="平台操作" key="3">平台操作</TabPane>
        </Tabs>
      </div>
    );
  }
}