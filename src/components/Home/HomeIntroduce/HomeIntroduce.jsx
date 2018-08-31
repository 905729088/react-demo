import React from 'react';
import { Link } from 'react-router-dom'
import {AppContentApp_Info,Home_Active} from './../../ACommon/action/index.js'
export default class HomeIntroduce extends React.Component { 
    render() { 
        const styles = HomeIntroduce.styles;
        return (
            <div style={styles.background}>
                <div style={styles.header}>首页</div>
                <div style={styles.line}></div>
                <div style={styles.conent}>
                    <div style={styles.conentHeader}>
                        <p style={{marginBottom:'10px'}}>&emsp;&emsp;LeirherOS致力于服务前端程序员，使前端人员快速掌握后端完成全栈开发,旨在解决传统开发方式开发成本高、周期长、复杂度高、难维护、前后端配合难的难题，<br/> 实现以简单、高效、廉价、快捷的单人开发模式开发整个网站！只需花上三个小时来学完以下三个步骤的学习即可独立编写大型商业应用！</p>
                        <p>&emsp;&emsp;<b style={{color:'red'}}>注：</b>开发过程所需的API接口可前往<Link to='/home/ApiManual' style={{color:'red'}}>API文档</Link>查询，如需了解详细用法演示请前往<Link to='/home/Demo' style={{color:'red'}}>示例DEMO</Link>查看。</p>
                    </div>
                    <div style={styles.conentMain} >
                        <div style={{fontSize:'28px',color:'#8a8f99',fontFamily:'SimSun'}}>了解建站:</div>
                        <div style={styles.conentMainH}>
                        &emsp;&emsp;建站大致可分为以下4个步骤:
                        </div>
                        <div style={styles.conentMainItem}>
                            1 、代码编辑
                            <p style={styles.care}>请点击查看<Link to='/home/AppContent/HelloWorld' onClick={() => { this.props.dispatch(AppContentApp_Info({ appName:'HelloWorld', appVer: 'last'})),this.props.dispatch(Home_Active(0));}} style={{color:'red'}}>HelloWorld</Link>示例</p> 
                        </div>
                        <div style={styles.conentMainItem}>
                            2 、代码打包
                            
                        </div>
                        <div style={styles.conentMainItem}>
                            3 、代码上传
                        </div>
                        <div style={styles.conentMainItem}>
                            4 、设置域名
                        </div>
                    </div>
                    <div style={styles.conentMain} >
                        <div style={{fontSize:'28px',color:'#8a8f99',fontFamily:'SimSun'}}>后端学习:</div>
                        <div style={styles.conentMainH}>
                            现在学习Leither OS的后端功能
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
                        <div style={{fontSize:'28px',color:'#8a8f99',fontFamily:'SimSun'}}>成站体验:</div>
                        <div style={styles.conentMainH}>
                            现在体验氢协作Saas系统：数百家中小企业使用的OA、协作管理系统
                        </div>
                        <div style={styles.conentMainItem}>
                            1 、云盘
                        </div>
                        <div style={styles.conentMainItem}>
                            2 、文档
                        </div>
                        <div style={styles.conentMainItem}>
                            3 、脑图
                        </div>
                    </div>
                    <div style={styles.conentMain} >
                        <div style={{fontSize:'28px',color:'#8a8f99',fontFamily:'SimSun'}}>结语:</div>
                        <div style={styles.conentMainH}>
                            &emsp;&emsp;恭喜您通过以上步骤的学习,已经具备在本平台开发大型商业应用的能力,下面请开始您的开发之旅!
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
HomeIntroduce.styles = {
    background: {
        overflow: 'hidden',
        overflowY:'auto',
        padding:'33px 0px 33px 50px',
        width: '100%',
        height: '100%',
        background: '#fff',
    },
    header: {
        fontSize: '28px',
        fontWeight: 'normal',
        color: '#222222',
        fontFamily:'SimSun'
    },
    line: {
        marginTop:'20px',
        width: '100%',
        height:'1px',
        backgroundColor:'#E7E8EC'
    }, conentHeader: {
        marginTop:'25px',
        fontSize: '16px',
        color:'#222'
    }, conentMain: {
        marginTop:'30px'
    }, conentMainH: {
        marginTop: '12px',
        fontSize: '16px',
        color: '#222222'
    },
    conentMainItem: {
        marginTop: '12px',
        fontSize: '16px',
        // color: '#0088cc',
        // textDecoration:'underline'
    },
    care:{
        marginTop:'10px',
        textIndent:'2em',
        fontSize: '14px',
    }

}