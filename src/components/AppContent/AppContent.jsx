import React from 'react'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';
import styled from 'styled-components'
import SetDomain from './setDomain.jsx';
import { G } from './../ACommon/Api';
import AuthContext from './../../auth-context.js';
import AppView from './AppView.jsx'
 class AppContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            versions: [],
            currentVer:this.props.appInfo.appVer,
            packages: [],
            domain:{},//域名信息
            isSetDomain:false,//设置域名界面是否显示
            isShowView:false, //是否显示预览见面
            ip:null  //预览的ip地址

        };
        this.onClickselectAppVer = this.onClickselectAppVer.bind(this);
        this.onClickRelease = this.onClickRelease.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onShowSetDomain = this.onShowSetDomain.bind(this);
        this.onClickShowView = this.onClickShowView.bind(this);
        this.onClickCloseView = this.onClickCloseView.bind(this);
    }

    async componentDidMount() {
        //请求数据
        this.getAsyncInfo();
    }
    static getDerivedStateFromProps(nextProps, prevState) { 
        const versions = nextProps.apppContent.versions;
        const packages = nextProps.apppContent.packages;
        const domain = nextProps.domain;
        return {versions,packages,domain}
    }
    async getAsyncInfo() {
       
        const appName = this.props.appInfo.appName;
        const sid = sessionStorage.getItem('current_sid')
        if (appName && sid) {
            const versions = await G.api.getVar(sid, 'appversions', appName)
            const packages = await this.getPackages(this.props.appInfo.appVer)//this.props.match.params.appVer
            this.setState({
                versions,
                packages
            })
        }

        
    }
    async getPackages(ver) {
       
        const appName = this.props.appInfo.appName
        const sid = sessionStorage.getItem('current_sid');
        const packageInfo = await G.api.getVar(sid, 'apppackage', appName, ver)
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
        if (val !== this.props.appInfo.appVer) {
            this.getAsyncInfo();
            this.setState({
                currentVer:val
            })
            const active = { index: 6, type: 'appinfo', appIndex: this.props.appInfo.appIndex };
            const appInfo = { appName: this.props.appInfo.appName, appVer: val ,appIndex:this.props.appInfo.appIndex};
           
            this.props.handleAppClick(active,appInfo);
        }
    }

    async onClickRelease() {//发布版本 
        const istrue=window.confirm('您确定要发布新的版本？');
        if (istrue) {
            const sid = sessionStorage.getItem('current_sid')
            const appName = this.props.appInfo.appName
            await G.api.version(sid, appName, 'lastver', '') //设置新的版本
            const versions = await G.api.getVar(sid, 'appversions', appName);
            this.props.onUpdataVerList(versions);
        } 
          
    }

    async onClickDelete() { 
        const sid = sessionStorage.getItem('current_sid');
        const istrue = window.confirm('您确定要删除这个应用？');
        if (istrue) {
              await G.api.unInstallApp(sid, this.props.appInfo.appName);
              this.props.handleClick({index:4,type:Number,appIndex:-1});
              this.props.getLeftAppData();
        } 
    }
   
     onClickShowView(ip) {//展现例子
         const isShowView = true;
        this.setState({ip,isShowView});
     }
     onClickCloseView() {//关闭例子
         console.log("++");
        const isShowView = false;
        this.setState({isShowView});
    }
    onShowSetDomain() { //显示和关闭设置域名界面
        this.setState({isSetDomain:!this.state.isSetDomain})
    }
     render() {
       
        const props = this.props;
        const styles = AppContent.styles
        const currentVer = this.state.currentVer
        const packages = this.state.packages;
        const packageNames = Object.keys(packages)
        const appName = this.props.appInfo.appName;
        let packageDoms = '...'
        packageDoms = packageNames && packageNames.length? packageNames.map((name, i) =>
            <MyLink style={styles.appContentMainitem} key={i}>
                <div style={styles.appContentMainitemFileName} onClick={() => {
                    this.props.onOpenCode({ index: 7, type: Number, appIndex: this.props.appInfo.appIndex }, { appName: appName, appVer: currentVer, packageid: packages[name],packageName:name==="main"?name+'.html':name ,appIndex:this.props.appInfo.appIndex})
                }}>
                    <span>{name==="main"?name+'.html':name}</span>
                </div>
            </MyLink>
         ) : null
        let setDomain = this.state.isSetDomain ? <SetDomain style={{ display: 'none' }} onShowSetDomain={this.onShowSetDomain} appName={appName}/>: null;
        //预览界面
         const appView = this.state.isShowView ? <AppView onClickCloseView={this.onClickCloseView} ip={this.state.ip} /> : null;

         return (<div style={styles.background}>
             <div style={{ position:'relative',paddingBottom:'50px',minHeight:'100%'}}>
                <div style={styles.header}>我的应用/<span style={{ color: '#019f57' }}>{props.appInfo.appName}</span></div>
                <div style={styles.line}></div>
                    <div style={styles.appContent}>
                        <div style={styles.appContentTitle}>
                         <div style={styles.domain}>
                                <span onClick={this.onShowSetDomain} style={{textDecoration:'underline',cursor:'pointer'}} >点此设置该应用的域名</span>
                                <span onClick={()=>this.onClickShowView(this.state.domain.inner)} style={this.state.domain.inner?{marginLeft:'10px',cursor:'pointer'}:{display:'none'}}>内网访问：{this.state.domain.inner}</span>
                                <span onClick={()=>this.onClickShowView(this.state.domain.out)} style={this.state.domain.out?{marginLeft:'10px',cursor:'pointer'}:{display:'none'}}>外网访问：{this.state.domain.out}</span>
                         </div>
                        <div style={styles.appContentTitleRight}>
                            <Dropdown
                                styles={{ width: '107px' }}
                                dataList={this.state.versions}
                                onClick={this.onClickselectAppVer}
                            />
                            <div style={styles.appContentRelease} onClick={this.onClickRelease}>发布版本</div>
                        </div>
                        
                        </div>
                        <div style={styles.appContentMain}>
                            <div style={styles.appContentMainitemTitle} >
                                {props.appInfo.appName}
                            </div>
                            {packageDoms}
                        </div>
                 </div>
                 <img onClick={this.onClickDelete} style={styles.delet} src={require('./img/ico-del.png')} alt=""/>
             </div>
             {setDomain}
             {appView}
        </div>)
    }
}

AppContent.styles = {
    background: {
        overflow: 'hidden',
        overflowY:'auto',
        padding:'33px 50px 33px 50px',
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
    }, 
    
    appContent: {
        marginTop: '38px',
        width: '100%',
    },
    appContentHeader: {
        position:'relative',
        fontSize: '24px',
        fontWeight:'bold',
        textAlign: 'left',
    },
    appContentRelease: {
        marginLeft:'10px',
        width: '107px',
        height: '30px',
        textAlign:'center',
        border: '1px solid #d1d5da',
        color:'#32475e',
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
    domain:{
        disaply:'flex',
        color:'#8a8f99',
    },
    appContentTitleRight: {
        display:'flex',
        justifyContent: 'space-between',
       
    },
    appContentMain: {
        marginTop:'20px',
        width: '100%',
    },
    appContentMainitemTitle: {
        fontSize: '18px',
        fontWeight:'bold',
        height: '48px',
        lineHeight:'48px',
        border: '1px solid #019f57',
        boxSizing: 'border-box',
        paddingLeft: '23px',
        backgroundColor: '#acd6b7'
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
        color: '#8a8f99',
        textDecoration:'none'
    },
    delet: {
        position: 'absolute',
        bottom: '0px',
        right:'0px',
        cursor: 'pointer'
    }
}
const MyLink = styled.div`
    cursor:pointer;
    &:hover{
       background:#f6f8fa;
   }
`

export default  props => (
    <AuthContext.Consumer>
         {auth => <AppContent {...props} auth={auth}/>}
    </AuthContext.Consumer>
  );