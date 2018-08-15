import React from 'react';
export default class HomeIntroduce extends React.Component { 
    render() { 
        const styles = HomeIntroduce.styles;
        return (
            <div style={styles.background}>
                <div style={styles.header}>首页</div>
                <div style={styles.line}></div>
                <div style={styles.conent}>
                    <div style={styles.conentHeader}>
                        <p style={{marginBottom:'10px'}}>Leither OS诞生于2016年，是基于Chrome OS开发的云操作系统！</p>
                        <p>我们致力服务于初学的前端程序员，帮助他们迅速成长为全端高手！</p>
                    </div>
                    <div style={styles.conentMain} >
                        <div style={{fontSize:'28px',color:'#8a8f99',fontFamily:'SimSun'}}>步骤一:</div>
                        <div style={styles.conentMainH}>
                            现在体验30秒建站
                        </div>
                        <div style={styles.conentMainItem}>
                            1 、修改代码
                        </div>
                        <div style={styles.conentMainItem}>
                            2 、设置域名
                        </div>
                        <div style={styles.conentMainItem}>
                            3 、浏览效果
                        </div>
                    </div>
                    <div style={styles.conentMain} >
                        <div style={{fontSize:'28px',color:'#8a8f99',fontFamily:'SimSun'}}>步骤二:</div>
                        <div style={styles.conentMainH}>
                            现在体验Leither OS的后端功能
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
                        <div style={{fontSize:'28px',color:'#8a8f99',fontFamily:'SimSun'}}>步骤三:</div>
                        <div style={styles.conentMainH}>
                            现在体验氢协作Saas系统：数百家中小企业使用的OA、协作管理系统
                        </div>
                        <div style={styles.conentMainItem}>
                            1 氢协作
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
        color: '#0088cc',
        textDecoration:'underline'
    }
}