import React from 'react';
import { Link } from 'react-router-dom'
import { AppContentApp_Info, Home_Active } from './../../ACommon/action/index.js'
import { Tooltip, Tabs, Select } from 'antd'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
export default class HomeIntroduce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabPosition: 'left',
        }
    }
    render() {
        const styles = HomeIntroduce.styles;
        return (
            // <div style={styles.background}>
            //     <Tabs tabPosition={this.state.tabPosition} style={{ height: '100%' }}>
            //         <TabPane tab="简介" key="1">
            //             <div style={styles.header}>简介</div>
            //             <div style={styles.line}></div>
            //             <div style={styles.conent}>
            //                 <div style={styles.conentHeader}>
            //                     <p style={{ marginBottom: '10px', paddingRight: '50px' }}>&emsp;&emsp;LeirherOS致力于服务前端程序员，使前端人员快速掌握后端完成全栈开发,旨在解决传统开发方式开发成本高、周期长、复杂度高、难维护、前后端配合难的难题，实现以简单、高效、廉价、快捷的单人开发模式开发整个网站！只需花上三个小时来学完以下三个步骤的学习即可独立编写大型商业应用！</p>
            //                     <p style={{marginTop: '50px',}}>&emsp;&emsp;<b style={{ color: 'red' }}>注：</b>开发过程所需的API接口可前往<Link to='/home/ApiManual' style={{ color: 'red' }}>API文档</Link>查询，如需了解详细用法演示请前往<Link to='/home/Demo' style={{ color: 'red' }}>示例DEMO</Link>查看！</p>
            //                 </div>
            //             </div>
            //         </TabPane>
            //         <TabPane tab="了解建站" key="2">
            //             <div style={styles.conentMain} >
            //             <div style={styles.header}>了解建站</div>
            //             <div style={styles.line}></div>
            //                 <div style={styles.conentMainH}>
            //                     &emsp;&emsp;建站大致可分为以下四个步骤:
            //                 </div>
            //                 <div style={styles.conentMainItem}>
            //                     1 、代码编辑
            //                 <p style={styles.care}>请点击查看<Link to='/home/AppContent/HelloWorld' onClick={() => { this.props.dispatch(AppContentApp_Info({ appName: 'HelloWorld', appVer: 'last' })), this.props.dispatch(Home_Active(0)); }} style={{ color: 'red' }}>HelloWorld</Link>示例</p>
            //                 </div>
            //                 <div style={styles.conentMainItem}>
            //                     2 、代码打包
            //                 <p style={styles.care}>将编写好的代码运行npm进行打包,使用压缩工具将打包好的代码压缩成.tar或者.zip的压缩包</p>

            //                 </div>
            //                 <div style={styles.conentMainItem}>
            //                     3 、代码上传
            //                 <p style={styles.care}>将压缩好的代码tar包或者zip包上传至我的应用</p>
            //                 </div>
            //                 <div style={styles.conentMainItem}>
            //                     4 、设置域名
            //                 <p style={styles.care}>1、内网设置格式为:自定义子域名(不少于7位)+vzhan.cn</p>
            //                     <p style={styles.care}>2、外网可自行定义</p>
            //                 </div>
            //             </div>
            //         </TabPane>
            //         <TabPane tab="后端学习" key="3">
            //             <div style={styles.conentMain} >
            //             <div style={styles.header}>后端学习</div>
            //             <div style={styles.line}></div>
            //                 {/* <div style={styles.conentMainH}>
            //                 现在学习Leither OS的后端功能
            //             </div> */}
            //                 <div style={styles.conentMainH}>
            //                     &emsp;&emsp;后端学习请参照以下四个示例:
            //                 </div>
            //                 <div style={styles.conentMainItem}>
            //                     1 、用户鉴权
            //             </div>
            //                 <div style={styles.conentMainItem}>
            //                     2 、数据库
            //             </div>
            //                 <div style={styles.conentMainItem}>
            //                     3 、文件操作
            //             </div>
            //                 <div style={styles.conentMainItem}>
            //                     4 、消息体系
            //             </div>
            //             </div>
            //         </TabPane>
            //         <TabPane tab="成站体验" key="4">
            //             <div style={styles.conentMain} >
            //             <div style={styles.header}>成站体验</div>
            //             <div style={styles.line}></div>
            //                 {/* <div style={{ fontSize: '28px', color: '#8a8f99', fontFamily: 'SimSun' }}>成站体验:</div> */}
            //                 {/* <div style={styles.conentMainH}>
            //                 现在体验氢协作Saas系统：数百家中小企业使用的OA、协作管理系统
            //             </div> */}
            //             <div style={styles.conentMainH}>
            //                     &emsp;&emsp;请前往开源库clone大型商业级应用进行体验:
            //             </div>
            //                 <div style={styles.conentMainItem}>
            //                     <Tooltip placement="topLeft" title="请前往开源库克隆netDist.tar
            //                         体验">
            //                         <Link to='/home/ConnectDefaultApp' onClick={() => this.props.dispatch(Home_Active(5))} style={{ color: 'red' }}>1 、云盘</Link>
            //                     </Tooltip>
            //                 </div>
            //                 <div style={styles.conentMainItem}>
            //                     <Tooltip placement="topLeft" title="请前往开源库克隆Markdown.tar体验">
            //                         <Link to='/home/ConnectDefaultApp' onClick={() => this.props.dispatch(Home_Active(5))} style={{ color: 'red' }}>2 、文档</Link>
            //                     </Tooltip>
            //                 </div>
            //                 <div style={styles.conentMainItem}>
            //                     <Tooltip placement="topLeft" title="请前往开源库克隆mind.tar体验">
            //                         <Link to='/home/ConnectDefaultApp' onClick={() => this.props.dispatch(Home_Active(5))} style={{ color: 'red' }}>3 、脑图</Link>
            //                     </Tooltip>
            //                 </div>
            //             </div>
            //         </TabPane>
            //     <TabPane tab="结语" key="5">
            //         <div style={styles.conentMain} >
            //             <div style={styles.header}>结语</div>
            //             <div style={styles.line}></div>
            //             {/* <div style={{ fontSize: '28px', color: '#8a8f99', fontFamily: 'SimSun' }}>结语:</div> */}
            //             <div style={styles.conentMainH}>
            //                 &emsp;&emsp;恭喜您通过以上步骤的学习,已经具备在本平台开发大型商业应用的能力,下面请开始您的开发之旅!
            //             </div>
            //         </div>
            //     </TabPane>
            //     </Tabs>
            // </div>
            <div style={styles.background}>
                <div style={styles.header}>首页</div>
                <div style={styles.line}></div>
                <div style={styles.conent}>
                    <div style={styles.conentHeader}>
                        <p style={{ marginBottom: '10px', paddingRight: '50px',fontSize:'18px' }}>&emsp;&emsp;LeirherOS致力于服务前端程序员，使前端人员快速掌握后端完成全栈开发,旨在解决传统开发方式开发成本高、周期长、复杂度高、难维护、前后端配合难的难题，实现以简单、高效、廉价、快捷的单人开发模式开发整个网站！只需花上三个小时来学完以下三个步骤的学习即可独立编写大型商业应用！</p>
                        <p style={{marginTop: '20px',}}>&emsp;&emsp;<b style={{ color: 'red' }}>注：</b>开发过程所需的API接口可前往<Link to='/home/ApiManual' style={{ color: 'red' }}>API文档</Link>查询，如需了解详细用法演示请前往<Link to='/home/Demo' style={{ color: 'red' }}>示例DEMO</Link>查看！</p>
                    </div>
                    <div style={styles.conentMain} >
                        <div style={{ fontSize: '28px', color: '#8a8f99', fontFamily: 'SimSun',textIndent: '1em' }}>了解建站:</div>
                        <div style={styles.conentMainH}>
                            建站大致可分为以下四个步骤:
                        </div>
                        <div style={styles.conentMainItem}>
                            1 、代码编辑
                            <p style={styles.care}>请点击查看<Link to='/home/AppContent/HelloWorld' onClick={() => { this.props.dispatch(AppContentApp_Info({ appName: 'HelloWorld', appVer: 'last' })), this.props.dispatch(Home_Active(0)); }} style={{ color: 'red' }}>HelloWorld</Link>示例</p>
                        </div>
                        <div style={styles.conentMainItem}>
                            2 、代码打包
                            <p style={styles.care}>将编写好的代码运行npm进行打包,使用压缩工具将打包好的代码压缩成.tar或者.zip的压缩包</p>

                        </div>
                        <div style={styles.conentMainItem}>
                            3 、代码上传
                            <p style={styles.care}>将压缩好的代码tar包或者zip包上传至我的应用</p>
                        </div>
                        <div style={styles.conentMainItem}>
                            4 、设置域名
                            <p style={styles.care}>1、内网设置格式为:自定义子域名(不少于7位)+vzhan.cn</p>
                            <p style={styles.care}>2、外网可自行定义</p>
                        </div>
                    </div>
                    <div style={styles.conentMain} >
                        <div style={{ fontSize: '28px', color: '#8a8f99', fontFamily: 'SimSun',textIndent: '1em' }}>后端学习:</div>
                        <div style={styles.conentMainH}>
                            后端学习请参照以下四个示例:
                        </div>
                        <div style={styles.conentMainItem}>
                            1 、用户鉴权
                        </div>
                        <div style={styles.conentMainItem}>
                            2 、数据库
                        </div>
                        <div style={styles.conentMainItem}>
                            3 、文件操作
                        </div>
                        <div style={styles.conentMainItem}>
                            4 、消息体系
                        </div>
                    </div>
                    <div style={styles.conentMain} >
                        <div style={{ fontSize: '28px', color: '#8a8f99', fontFamily: 'SimSun',textIndent: '1em' }}>成站体验:</div>
                        <div style={styles.conentMainH}>
                            请前往开源库clone大型商业级应用进行体验:
                        </div>
                        <div style={styles.conentMainItem}>
                            <Tooltip placement="topLeft" title="请前往开源库克隆netDist.tar
                                体验">
                            <Link to='/home/ConnectDefaultApp' onClick={() => this.props.dispatch(Home_Active(5))} style={{ color: 'red' }}>1 、云盘</Link>
                            </Tooltip>
                    </div>
                    <div style={styles.conentMainItem}>
                        <Tooltip placement="topLeft" title="请前往开源库克隆Markdown.tar体验">
                            <Link to='/home/ConnectDefaultApp' onClick={() => this.props.dispatch(Home_Active(5))} style={{ color: 'red' }}>2 、文档</Link>
                        </Tooltip>
                    </div>
                    <div style={styles.conentMainItem}>
                        <Tooltip placement="topLeft" title="请前往开源库克隆mind.tar体验">
                            <Link to='/home/ConnectDefaultApp' onClick={() => this.props.dispatch(Home_Active(5))} style={{ color: 'red' }}>3 、脑图</Link>
                        </Tooltip>
                    </div>
                </div >
                <div style={styles.conentMain} >
                    <div style={{ fontSize: '28px', color: '#8a8f99', fontFamily: 'SimSun',textIndent: '1em' }}>结语:</div>
                    <div style={styles.conentMainH}>
                        <p style={{fontSize: '18px'}}>恭喜您通过以上步骤的学习,已经具备在本平台开发大型商业应用的能力,下面请开始您的开发之旅!</p>
                </div>
                </div>
            </div>
           </div >
        )
    }
}
HomeIntroduce.styles = {
    background: {
        overflow: 'hidden',
        overflowY: 'auto',
        padding: '20px 0px 33px 50px',
        width: '100%',
        height: '100%',
        background: '#fff',
    },
    header: {
        fontSize: '28px',
        fontWeight: 'normal',
        color: '#222222',
        fontFamily: 'SimSun'
    },
    line: {
        marginTop: '20px',
        width: '100%',
        height: '1px',
        backgroundColor: '#E7E8EC'
    }, conentHeader: {
        width: '70%',
        marginLeft: '25px',
        marginTop: '30px',
        fontSize: '16px',
        color: '#222'
    }, conentMain: {
        marginTop: '30px'
    }, conentMainH: {
        marginTop: '20px',
        fontSize: '16px',
        color: '#222222',
        textIndent: '4em'
    },
    conentMainItem: {
        marginTop: '12px',
        fontSize: '16px',
        color: '#0088cc',
        textIndent: '4em'
        // textDecoration:'underline'
    },
    care: {
        marginTop: '10px',
        textIndent: '4em',
        fontSize: '14px',
        color: 'black',
        textDecoration: 'none',
        textIndent: '6em'
    }

}