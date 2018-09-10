import React from 'react'
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
        <Tabs tabPosition={this.state.tabPosition} style={{height:'100%',overflowY:'auto'}}>
          <TabPane tab="环境配置" key="1">
          <h1 style={styles.header}>环境配置:</h1>
          <div style={styles.line}></div>
          </TabPane>
          <TabPane tab="本地操作" key="2" style={{position:'relative'}}>

            <h1 style={styles.header}>本地操作:</h1>
            <div style={styles.line}></div>
            <div style={styles.box1}>
                <h3 style={styles.h3}>一、引入api包</h3>
                <ul style={styles.ul}>
                    <li>
                        1、项目中用到Angular、React、Vue框架的使用以下方式导入：
                        <p style={{fontSize: '14px',marginLeft:'20px',marginTop:'20px'}}>①、使用npm载入API接口包</p>
                        <p style={{fontSize: '14px',marginLeft:'20px',marginTop:'20px'}}>$npm install @leither/l-api</p>
                        <p style={{fontSize: '14px',marginLeft:'20px'}}>②、初始化API接口包</p>
                        <p style={{fontSize: '14px',marginLeft:'20px'}}>initLAPI( 'http://+url+/webapi/');</p> 
                        <p style={{fontSize: '14px',marginLeft:'20px'}}>参数说明：url：leither所在服务器的ip地址，类型String；</p> 
                        <img src={require("../img/apiimport.png")} alt=""/>
                    </li>
                    <li style={{marginTop: '20px'}}>
                        2、未使用框架的使用以下方式导入：
                        <p style={{fontSize: '14px',marginLeft:'20px',marginTop:'20px'}}>初始化API接口包：</p>
                        <p style={{fontSize: '14px',marginLeft:'20px'}}>initLAPI( 'http://+url+/webapi/');</p> 
                        <p style={{fontSize: '14px',marginLeft:'20px'}}>参数说明：url：leither所在服务器的ip地址，类型String；</p> 
                        <img src={require("../img/apiimport2.png")} alt=""/>
                    </li>
                </ul>
            </div>
            <div style={styles.box1}> 
                <h3 style={styles.h3}>二、代码编辑</h3> 
                <p style={{fontSize: '14px',marginLeft:'80px'}}>下面您可以选择使用前端框架或者不使用前端框架进行代码编辑了</p> 
            </div>
            <div style={styles.box1}>
                <h3 style={styles.h3}>三、接口调用</h3>
                <p style={{fontSize: '14px',marginLeft:'80px'}}>接口的调用使用方式为：<br/>&emsp;&emsp;G.api.接口名称('参数1','参数2','参数3',...)</p> 
                <img style={{marginLeft: '80px',}} src={require("../img/login.png")} alt=""/>   
            </div>
            <div style={styles.box1}>
                <h3 style={styles.h3}>四、代码打包</h3> 
                <p style={{fontSize: '14px',marginLeft:'80px'}}>代码打包之前请将index.html文件更名为:main.html</p> 
                <p style={{fontSize: '14px',marginLeft:'80px',marginTop:'20px'}}>1、使用前端框架的项目,请使用webpack或者其他构建工具进行代码打包</p> 
                <p style={{fontSize: '14px',marginLeft:'80px',marginTop:'20px'}}>2、未使用前端框架的项目,请将代码归类存放在一个文件夹下</p>              
            </div>
            <div style={styles.box1}>
                <h3 style={styles.h3}>五、代码压缩</h3>  
                <p style={{fontSize: '14px',marginLeft:'80px'}}>请将打包好的代码使用压缩工具压缩成.tar或者.zip的压缩包</p>  
            </div>
          </TabPane>
          <TabPane tab="平台操作" key="3">
            <h1 style={styles.header}>平台操作:</h1>
            <div style={styles.line}></div>
            <div style={styles.box1}>
                <h3 style={styles.h3}>一、代码上传</h3>   
                <p style={{fontSize: '14px',marginLeft:'80px'}}>点击上传按钮将压缩好的代码tar包或者zip包上传至我的应用</p> 
            </div>
            <div style={styles.box1}>
                <h3 style={styles.h3}>二、设置域名</h3>   
                <p style={{fontSize: '14px',marginLeft:'80px'}}>点击查看更多打开我的应用,找到并打开刚刚上传的应用,点击设置域名进行域名设置</p>
                <img style={{marginLeft: '80px',}} src={require("../img/setvzhan.png")} alt=""/>
                <p style={{fontSize: '14px',marginLeft:'80px'}}>1、内网设置格式为:自定义子域名(不少于7位)+vzhan.cn;</p>
                <p style={{fontSize: '14px',marginLeft:'80px'}}>2、外网可自行定义</p>
            </div>
            <div style={styles.box1}>
                <h3 style={styles.h3}>三、网站预览</h3>   
                <p style={{fontSize: '14px',marginLeft:'80px'}}>打开我的应用,找到上传的应用点击预览进行查看</p>
                <img style={{marginLeft: '80px',}} src={require("../img/see.png")} alt=""/>
            </div>
            <div style={styles.box1}>
                <h3 style={styles.h3}>四、我的应用</h3> 
                <p style={{fontSize: '14px',marginLeft:'80px'}}>在我的应用里面,您可以进行代码修改、应用预览等操作，其中修改操作中，您可以进行设置域名、版本管理、发布版本、上传文件等操作</p>  
                <img style={{marginLeft: '80px',}} src={require("../img/up.png")} alt=""/>
            </div>
            <div style={styles.box1}>
                <h3 style={styles.h3}>五、开源库</h3>   
                <p style={{fontSize: '14px',marginLeft:'80px'}}>在开源库中,您可以clone开源库中的应用进行学习和操作</p>
                <img style={{marginLeft: '80px',}} src={require("../img/clone1.png")} alt=""/>
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
        marginBottom:'30px',
        width: '100%',
        height: '1px',
        backgroundColor: '#E7E8EC'
    },
    h3:{
         
        fontFamily: 'SimSun',
        marginLeft: '30px',
    },
    box1:{
        width:'100%',
        height:'100%',
        fontSize: '18px',
        marginBottom:'20px'
    },
    ul:{
        paddingLeft: '60px',
        color: '#8a8f99',
    }
}