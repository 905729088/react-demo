import React from 'react'
import NewAppList from './NewAppList/NewAppList.jsx'
import DefaultApps from './DefaultApps/DefaultApps.jsx'
import CreateModal from './CreateModal/CreateModal.jsx';
import HomeIntroduce from './HomeIntroduce/HomeIntroduce.jsx';
import ApiManual from './ApiManual/ApiManual.jsx';
import AppContent from './../AppContent/AppContent.jsx';
import CodeContent from './../CodeContent/CodeContent.jsx';
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            active: {index:1,type:Number,appIndex:-1},
            myApps: [],//我的应用列表
            appInfo: {},//应用信息
            apppContent: {},//应用文件信息
            codeData:null,//打开具体代码文件信息
            fileInfo:null ,//上传文件
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleAppClick = this.handleAppClick.bind(this);
        this.onUpdataVerList = this.onUpdataVerList.bind(this);
        this.getAsyncInfo = this.getAsyncInfo.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onDelFile = this.onDelFile.bind(this);
        this.onOpenCode = this.onOpenCode.bind(this);
        this.onReturnAppConent = this.onReturnAppConent.bind(this);
    }
    async componentDidMount() { 
       
        //获取我的应用数据
        const sid = sessionStorage.getItem('current_sid');
        const AppArr = await G.api.getvar(sid, "appinfos");
         if (AppArr.length >= 4) {
                this.setState({myApps:AppArr.slice(0,4)})
         } else { 
            this.setState({myApps:AppArr})
          }
     
    }
    handleClick(active) {//切换页面
         this.setState({ active: active });
    }

    async handleAppClick(active, appInfo) {//切换页面  //打开文件列表即进入ApppContent
        console.log('====>',appInfo);
        const apppContent =await this.getAsyncInfo(appInfo.appName);
        this.setState({ active, appInfo,apppContent});
    }
    //更新版本列表
    onUpdataVerList(versions) { 
        const packages = this.state.apppContent.packages;
        const apppContent = { versions, packages };
      
        this.setState({ apppContent });
       
    }
    //ApppContent的数据
    async getAsyncInfo(appName) {
        const sid = sessionStorage.getItem('current_sid')
        if (appName && sid) {
            const versions = await G.api.getvar(sid, 'appversions', appName)
            const packages = await this.getPackages(appName,'last')//this.props.match.params.appVer
            const apppContent = { versions, packages };
            return apppContent;
        }
        
        
    }
    async getPackages(appName,ver) {
        const sid = sessionStorage.getItem('current_sid');
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
    //上传文件
    onFileChange() {
        const fileInfo = this.fileInput.files[0];
        this.setState({ fileInfo: fileInfo });
    }
    onDelFile() {
        console.log("删除");
        this.setState({ fileInfo: null });
    }
    //打开具体文件
    onOpenCode(active, codeData) { 
        this.setState({ active,codeData});
    };
    //codeContnet 返回AppContent
    async onReturnAppConent(active, isUpdata) { 
      
        if (isUpdata) {
            const apppContent = await this.getAsyncInfo(this.state.appInfo.appName);
            this.setState({active,apppContent});
           
        } else { 
            this.setState({active});
        }
        
    }
    render() {
        const styles = Home.styles;
        const active = this.state.active;
      
        //左边模块
        const myApps = this.state.myApps.length > 0 ?
            this.state.myApps.map((app, i) => (
                <div
                    style={active.appIndex == i ? styles.leftItemActive : styles.leftItem}
                    onClick={() => { this.handleAppClick({ index: 6, type: 'appinfo', appIndex: i }, { appName: app.name, appVer: 'last' ,appIndex:i}) }}
                    key={app.iD} >{app.name}</div>)
            ) : null;
        //右边模块
         //初始化右边模块
        const rightArrs = [<HomeIntroduce />, <ApiManual />, <DefaultApps />, <NewAppList handleAppClick={this.handleAppClick} />, <CreateModal onDel={this.onDelFile} fileInfo={this.state.fileInfo} />, <AppContent handleAppClick={this.handleAppClick} onOpenCode={this.onOpenCode} onUpdataVerList={this.onUpdataVerList} apppContent={this.state.apppContent} appInfo={this.state.appInfo} />, <CodeContent onReturnAppConent={this.onReturnAppConent} codeData={this.state.codeData}/>];
        let rightItem = null;
        if (active.type===Number) { 
             rightItem = rightArrs[active.index - 1];
        } else if(active.type==='appinfo'){
            rightItem = rightArrs[5];
        }
        return (<div style={styles.background} >
            <div style={styles.left}>
                <div style={styles.leftHeader}>
                    <div style={active.index == 1 ? styles.leftItemActive : styles.leftItem} onClick={() => { this.handleClick({index:1,type:Number,appIndex:-1})}}>
                        <img style={{ marginRight: '15px' }} src={active.index ==1?require('./img/ico-home-active.png'):require('./img/ico-home.png')}  alt="" />
                        <span>首页</span>
                    </div>
                    <div style={active.index ==2 ? styles.leftItemActive : styles.leftItem} onClick={() => { this.handleClick({index:2,type:Number,appIndex:-1})}}>
                        <img style={{ marginRight: '15px' }} src={active.index ==2?require('./img/ico-text-active.png'):require('./img/ico-text.png')} alt="" />
                        <span>API手册</span>
                    </div>
                    <div style={active.index ==3 ? styles.leftItemActive : styles.leftItem} onClick={() => { this.handleClick({index:3,type:Number,appIndex:-1})}}>
                        <img style={{ marginRight: '15px' }} src={active.index ==3?require('./img/ico-app-active.png'):require('./img/ico-app.png')} alt="" />
                        <span>应用库</span>
                    </div>
                </div>
                <div style={styles.leftApps}>
                    <div style={styles.leftAppsTitle}>
                        我的应用
                    </div>
                    {myApps}
                    <div style={styles.leftAppsMore} onClick={() => { this.handleClick({index:4,type:Number,appIndex:-1})}} >
                        <span>查看更多</span>
                    </div>
                </div>
                <div style={styles.upload} onClick={() => { this.handleClick({index:5,type:Number,appIndex:-1})}}>
                     <label htmlFor="getfile" style={styles.contentFileMain}>
                        <img src={require('./img/upload.png')} alt="" />
                    </label>
                    <input id='getfile' type="file" style={{ display: 'none' }} onChange={this.onFileChange} ref={input => {this.fileInput = input}} />
                </div>
            </div>
            <div style={styles.right}>{rightItem}</div>
        </div>)
    }
}
Home.styles = {
    background: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height:'calc(100% - 1.4rem)',
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
        marginBottom:'1px',
        paddingLeft: "20px",
        height: '46px',
        color:'#019f57',
        backgroundColor:'#ffffff',
        cursor: 'pointer',
        lineHeight: '46px',
        textDecoration:'underline'
    },
    upload: {
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
        paddingTop:'1px',
        flex: '4',
    }
}