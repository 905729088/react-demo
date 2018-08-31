import React from 'react'
import NewAppList from './NewAppList/NewAppList.jsx'
 import ConnectDefaultApp from './DefaultApps/ConnectDefaultApp.jsx';
import ConnectCreateModal from './CreateModal/ConnectCreateModal.jsx';
import HomeIntroduce from './HomeIntroduce/HomeIntroduce.jsx';
import Guide from './Guide/Guide.jsx';
import Demo from './Demo/Demo.jsx';
import ApiManual from './ApiManual/ApiManual.jsx';
import ConnectAppContent from './../AppContent/ConnectAppContent.jsx';
import CodeContent from './../CodeContent/ConnectCodeContent.jsx';
import styled from 'styled-components';
import {CreateModelFile_DATA,Fetch_Home_HelloWorld,Fetch_HomeMyApp_Data,AppContentApp_Info,Fetch_AppContentApp_File_List,Fetch_AppContentApp_Version_List,Fetch_AppContentApp_Doamin} from './../ACommon/action/index.js'

import { Route, Redirect, Switch } from 'react-router-dom'
import {Link,NavLink} from 'react-router-dom'
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            wHeight: 0,
            wWidth:0,
            active: 1,
        }
        this.getData = this.getData.bind(this);//我的应用数据请求
        this.handleClick = this.handleClick.bind(this);
        this.handleAppClick = this.handleAppClick.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    async componentDidMount() { 
        //获取我的应用数据
        this.getData();
       // console.log('000000000000000000=====>',this.props);
        //让第一个界面充满屏幕
        this.setState({ wHeight: window.innerHeight,wWidth:window.innerWidth})
         //获取屏幕高度
        window.onresize = () => { this.setState({ wHeight: window.innerHeight ,wWidth:window.innerWidth});};
    }

    getData() { 
        
        if (this.props.userInfo) {
            if (this.props.userInfo.sid) {
                this.props.dispatch(Fetch_HomeMyApp_Data(this.props.userInfo.sid))
                this.props.dispatch(Fetch_Home_HelloWorld(this.props.userInfo.sid,this.props.userInfo.userId,this.props.userInfo.DATA_ID));
                clearTimeout(this.timer);
            } else { 
                this.timer = setTimeout(() => { this.getData()});
            }
        } else { 
            this.timer = setTimeout(() => { this.getData()});
        }
       
    }
    componentWillUnmount() { 
        window.onresize = null;
        clearTimeout(this.timer);
    }
    handleClick(index) {//切换页面
         this.setState({ active: index });
    }

    async handleAppClick(info) {//切换页面  //打开文件列表即进入ApppContent
        this.setState({ active: 0 });
        this.props.dispatch(AppContentApp_Info(info));
        this.props.dispatch(Fetch_AppContentApp_File_List(this.props.userInfo.sid,info.appName, info.appVer));
        this.props.dispatch(Fetch_AppContentApp_Version_List(this.props.userInfo.sid,info.appName));
        this.props.dispatch(Fetch_AppContentApp_Doamin(this.props.userInfo.sid,info.appName,this.props.userInfo.userId,this.props.userInfo.DATA_ID));
    }
    
    //上传文件
    onFileChange() {
        const file = this.fileInput.files[0];
        this.props.dispatch(CreateModelFile_DATA(file));
        
    }
    
    render() {
        const styles = Home.styles;
        const active = this.state.active;
        //左边模块
        const myApps = this.props.myApps?
            this.props.myApps.map((app, i) => (
                <NavLink
                    to={"/home/AppContent/" + app.name}
                    style={this.props.selectApp&&active===0?(this.props.selectApp.appName===app.name?styles.leftItemActive:styles.leftItem):styles.leftItem}
                    onClick={() => { this.handleAppClick({ appName: app.name, appVer: 'last' }) }}
                    key={app.iD} >{app.name}</NavLink>)
            ) : null;
    
        return (<Background  style={styles.background} height={this.state.wHeight} width={this.state.wWidth}>
            <div style={styles.left}>
                <div style={styles.leftHeader}>
                    <NavLink to="/home/Introduce" style={styles.leftItem} activeStyle={styles.leftItemActive} onClick={() => { this.handleClick(1)}}>
                        <img style={{ marginRight: '15px' }} src={active ==1?require('./img/ico-home-active.png'):require('./img/ico-home.png')}  alt="" />
                        <span>首页</span>
                    </NavLink>
                    <NavLink to="/home/Guide"  style={styles.leftItem} activeStyle={styles.leftItemActive} onClick={() => { this.handleClick(2)}} >
                        <img style={{ marginRight: '15px' }} src={active ==2?require('./img/ico-text-active.png'):require('./img/ico-text.png')} alt="" />
                        <span>开发指南</span>
                    </NavLink>
                    <NavLink to="/home/ApiManual"  style={styles.leftItem} activeStyle={styles.leftItemActive} onClick={() => { this.handleClick(3)}} >
                        <img style={{ marginRight: '15px' }} src={active ==3?require('./img/ico-text-active.png'):require('./img/ico-text.png')} alt="" />
                        <span>API手册</span>
                    </NavLink>
                    <NavLink to="/home/Demo"  style={styles.leftItem} activeStyle={styles.leftItemActive} onClick={() => { this.handleClick(4)}} >
                        <img style={{ marginRight: '15px' }} src={active ==4?require('./img/ico-text-active.png'):require('./img/ico-text.png')} alt="" />
                        <span>示例DEMO</span>
                    </NavLink>
                    <NavLink to="/home/ConnectDefaultApp" style={styles.leftItem} activeStyle={styles.leftItemActive} onClick={() => { this.handleClick(5)}} >
                        <img style={{ marginRight: '15px' }} src={active ==5?require('./img/ico-app-active.png'):require('./img/ico-app.png')} alt="" />
                        <span>开源库</span>
                    </NavLink>
                </div>
                <div style={styles.leftApps}>
                    <div style={styles.leftAppsTitle}>
                        我的应用
                    </div>
                    {myApps}
                    <Link to="/home/NewAppList" style={styles.leftAppsMore}  onClick={() => { this.handleClick(-1)}} >
                        <span>查看更多</span>
                    </Link>
                </div>
                <div style={styles.upload} onClick={() => { this.props.history.push('/home/ConnectCreateModal');this.handleClick(-1) }}>
                     <label htmlFor="getfile" >
                        <img src={require('./img/upload.png')} alt="" />
                    </label>
                    <input id='getfile' type="file" style={{ display: 'none' }} onChange={this.onFileChange} ref={input => {this.fileInput = input}} />
                </div>
            </div>
            <div  style={styles.right}>
                <Switch>
                    <Route exact path="/home/Introduce" component={HomeIntroduce} />
                    <Route path="/home/ApiManual" component={ApiManual} />
                    <Route path="/home/ConnectDefaultApp" component={ConnectDefaultApp} />
                    <Route path="/home/NewAppList" component={NewAppList} />
                    <Route path="/home/ConnectCreateModal" component={ConnectCreateModal} />
                    <Route path="/home/AppContent" component={ConnectAppContent} />
                    <Route path="/home/CodeContent" component={CodeContent} />
                    <Route path="/home/Guide" component={Guide} />
                    <Route path="/home/Demo" component={Demo} />
                    <Redirect from='/home' to='/home/Introduce' />
                </Switch>
            </div>
        </Background>)
    }
}
Home.styles = {
    background: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        overflow:'hidden',
        backgroundColor: '#E7E8EC',
        minWidth: '1200px',
        minHeight:'640px'
    },
    left: {
        flex:'1',
        height: '810px',
    },
    leftHeader: {
        overflow:'hidden',
        margin:'30px auto 30px',
        width: '80%',
    },
    leftItemActive: {
        marginBottom:'1px',
        paddingLeft: "20px",
        height:'46px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#019f57',
        color:'#fff',
        cursor: 'pointer',
    },
    leftItem: {
        marginBottom:'1px',
        paddingLeft: "20px",
        height:'46px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'#ffffff',
        cursor: 'pointer',
    },
    leftApps: {
        overflow:'hidden',
        margin:'30px auto 20px',
        width: '80%',
    },
    leftAppsTitle: { 
        paddingLeft: "17px",
        height:'46px',
        fontSize: '16px',
        color: '#019f57',
        lineHeight:'46px'
    }, leftAppsMore: {
        display:'block',
        marginBottom:'1px',
        paddingLeft: "20px",
        height: '46px',
        color:'#019f57',
        backgroundColor:'#ffffff',
        cursor: 'pointer',
        lineHeight: '46px',
        textDecoration: 'underline',
    },
    upload: {
        display:'block',
        width:'118px',
        margin:'30px 15%',
        height:'42px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color:'#fff',
        cursor: 'pointer',
        borderRadius: '2px',
        backgroundColor: '#ffffff',
        border: 'solid 1px #019f57',
        boxShadow: '0px 7px 10px 0px rgba(34, 34, 34, 0.09)'
    },
    right: {
        paddingTop: '1px',
        maxWidth:'1500px',
        flex: '4',
    }
}
const Background = styled.div.attrs({
    height: props => props.height + 'px',
    width:props=>props.width+'px'
})`
    width:${props => props.width};
    height:calc(${props => props.height} - 1.4rem);
`;