import React from 'react'
import { HLayout } from './Layout.jsx';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';
import styled from 'styled-components'
import Footer from './Footer.jsx';
export default class AppContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            versions: [],
            currentVer:this.props.match.params.appVer,
            packages: [],
        };
        this.onClickselectAppVer = this.onClickselectAppVer.bind(this);
        this.onClickRelease = this.onClickRelease.bind(this);
    }

    componentDidMount() {
        this.getAsyncInfo()
    }
    
    async getAsyncInfo() {
       
        const appName = this.props.match.params.appName
        const sid = sessionStorage.getItem('current_sid')
        if (appName && sid) {
            const versions = await G.api.getvar(sid, 'appversions', appName)
            const packages = await this.getPackages(this.props.match.params.appVer)//this.props.match.params.appVer
            this.setState({
                versions,
                packages
            })
        }
    }
    async getPackages(ver) {
        const appName = this.props.match.params.appName
        const sid = sessionStorage.getItem('current_sid')
        const packageInfo = await G.api.getvar(sid, 'apppackage', appName, ver)
        if (packageInfo) {
            let obj = {};
            for (let key in packageInfo.entryTemplate) { 
                obj[key] = packageInfo.entryTemplate[key];
            }
            for (let key in packageInfo.name2ID) { 
                obj[key] = packageInfo.name2ID[key];
            }
            return obj;
        }
        return []
    }
    onClickselectAppVer(val) { //选择版本后重新跳转路由
        //console.log(this.props.match.params.appName,this.props.match.params.appVer,this.props.history);
        if (val !== this.props.match.params.appVer) {
            this.getAsyncInfo();
            this.setState({
                currentVer:val
            })
            this.props.history.push(`/tree/${this.props.match.params.appName}/${val}`)//重定向
        }
    }

    async onClickRelease() {//发布版本 
        const istrue=window.confirm('您确定要发布新的版本？');
        if (istrue) {
            const sid = sessionStorage.getItem('current_sid')
            const appName = this.props.match.params.appName
            await G.api.version(sid, appName, 'lastver', '') //设置新的版本
            const versions = await G.api.getvar(sid, 'appversions', appName)
            this.setState({
                versions
            })
        } 
          
    }
    render() {
        const match = this.props.match
        const styles = AppContent.styles
        const currentVer = this.state.currentVer
        const packages = this.state.packages
       
        const packageNames = Object.keys(packages)
        const appName = this.props.match.params.appName;
        let packageDoms = '...'
        packageDoms = packageNames && packageNames.length? packageNames.map((name, i) =>
            <MyLink style={styles.appContentMainitem} key={i}>
                <Link to={{ pathname: `/treeCode/${appName}/${currentVer}/${name==="main"?name+'.html':name}`, state: { packageid: packages[name] } }} style={styles.appContentMainitemFileName}><span>{name==="main"?name+'.html':name}</span></Link>
            </MyLink>
        ) : null
        
        return (<div style={styles.background}>
            <div style={styles.center}>
                <div style={styles.centerHeader}>
                    <Link to={{ pathname: `/home` }}  style={styles.btnReturn}>
                        <img src={require('../img/ico-menu.png')} alt="" style={{marginRight:'3px',verticalAlign:'middle'}} />
                        <span style={{fontSize: '14px'}}>应用主页</span>
                    </Link>
                    <div style={styles.centerHeaderContent}>
                        <span style={{margin:'0px 4px',fontSize: '22px',color:'#3f5368',verticalAlign:'middle'}}>/</span>
                        <span style={{fontSize: '18px',fontWeight:'bold'}}>{match.params.appName}</span>
                    </div>
                </div>
                <div style={styles.appContent}>
                    <div style={styles.appContentHeader}>
                        <span>应用文件</span>
                        <div style={styles.appContentRelease} onClick={this.onClickRelease}>发布版本</div>
                    </div>
                    <div style={styles.appContentTitle}>
                        <div>点此设置该应用的域名</div>
                        <div>
                            <Dropdown
                                styles={{ width: '140px' }}
                                dataList={this.state.versions}
                                onClick={this.onClickselectAppVer}
                            />
                        </div>
                       
                    </div>
                    <div style={styles.appContentMain}>
                         <div style={styles.appContentMainitemTitle} >
                            {match.params.appName}
                         </div>
                        {packageDoms}
                    </div>
                    {/* <div style={styles.delet}>删除</div> */}
                </div>
            </div>
            <Footer/>>
        </div>)
    }
}

AppContent.styles = {
    background: {
        position: 'fixed',
        width: '100%',
        height:'100%',
        backgroundColor: '#E7E8EC',
    },
    center: {
        margin:'2rem auto',
        width: '1080px',
       
    },
    centerHeader: {
        overflow:'hidden',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '40px',
        lineHeight:'40px'
    },
    btnReturn: {
        overflow:'hidden',
        textDecoration: 'none',
        color: '#0366d6',
     },
    centerHeaderContent: {
        overflow:'hidden',
        paddingLeft:'3px',
        color: '#0366d6'
    },
    appContent: {
        marginTop: '10px',
        padding:'30px',
        width: '100%',
        boxSizing:'border-box',
        backgroundColor: '#ffffff',
        boxShadow: '0px 8px 9px 0px rgba(34, 34, 34, 0.08)'
    },
    appContentHeader: {
        position:'relative',
        fontSize: '24px',
        fontWeight:'bold',
        textAlign: 'left',
    },
    appContentRelease: {
        float:'right',
        width: '140px',
        height: '30px',
        textAlign:'center',
        border: '1px solid #BBBBBB',
        color:'#777',
        lineHeight: '30px',
        fontSize: '14px',
        fontWeight:'normal',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration:'none'
    },
    appContentTitle: {
        marginTop:'20px',
        display:'flex',
        fontSize: '16px',
        textAlign: 'left',
        justifyContent: 'space-between',
        color: '#999999'
    },
    
    appContentMain: {
        marginTop:'20px',
        width: '100%',
        height: '600px',
        overflowY: 'auto',
    },
    appContentMainitemTitle: {
        fontSize: '18px',
        fontWeight:'bold',
        height: '48px',
        lineHeight:'48px',
        border: '1px solid #b8dbff',
        boxSizing: 'border-box',
        paddingLeft: '23px',
        backgroundColor: '#f1f8ff'
    },
    appContentMainitem: {
        fontSize: '18px',
        height: '38px',
        lineHeight:'38px',
        border: '1px solid #dadbe0',
        borderTop: 'none',
        boxSizing: 'border-box',
        paddingLeft: '25px',
    },
    appContentMainitemFileName: {
        display: 'block',
        height:'100%',
        color: '#0366d6',
        textDecoration:'none'
    },
    delet: {
        float: 'right',
        cursor: 'pointer'
    }
}
const MyLink = styled.div`
    &:hover{
       background:#f6f8fa;
   }
`