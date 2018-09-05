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
    const styles = GSider.styles;
    return (
      <div style={{height:'100%',padding: '20px 0px 33px 50px'}}>
        <Tabs tabPosition={this.state.tabPosition} style={{height:'100%'}}>
          <TabPane tab="环境配置" key="1">
          <h1 style={styles.header}>开发环境配置:</h1>
          <div style={styles.line}></div>
          </TabPane>
          <TabPane tab="本地操作" key="2">
            <h1 style={styles.header}>本地操作有以下五点:</h1>
            <div style={styles.line}></div>
            <div>
                <h3 style={styles.h3}>1、引入api包</h3>
            </div>
            <div> 
                <h3 style={styles.h3}>2、代码编辑</h3> 
            </div>
            <div>
                <h3 style={styles.h3}>3、接口调用</h3>   
            </div>
            <div>
                <h3 style={styles.h3}> 4、代码打包</h3>                 
            </div>
            <div>
                <h3 style={styles.h3}>5、代码压缩</h3>   
            </div>
          </TabPane>
          <TabPane tab="平台操作" key="3">
            <h1 style={styles.header}>平台操作有以下五点:</h1>
            <div style={styles.line}></div>
            <div>
                <h3 style={styles.h3}>1、代码上传</h3>   
                
            </div>
            <div>
                <h3 style={styles.h3}>2、设置域名</h3>   
                
            </div>
            <div>
                <h3 style={styles.h3}>3、网站预览</h3>   
                
            </div>
            <div>
                <h3 style={styles.h3}>4、我的应用</h3>   
                
            </div>
            <div>
                <h3 style={styles.h3}>5、开源库</h3>   
                
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
GSider.styles = {
    header: {
        fontSize: '28px',
        fontWeight: 'normal',
        color: '#222222',
        fontFamily: 'SimSun',
        // marginTop: '20px',
    },
    line: {
        
        width: '100%',
        height: '1px',
        backgroundColor: '#E7E8EC'
    },
    h3:{
        color: '#8a8f99', 
        fontFamily: 'SimSun'
    }
}