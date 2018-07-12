import React from 'react'
import { HLayout } from './Layout.jsx';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';
import styled from 'styled-components'

export default class AppContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            versions: [],
            currentVer:this.props.match.params.appVer,
            packages: [],
        };
        this.onClickselectAppVer = this.onClickselectAppVer.bind(this);
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
            return packageInfo.name2ID
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
                <Link to={{ pathname: `/treeCode/${appName}/${currentVer}/${name}`, state: { packageid: packages[name] } }} style={styles.appContentMainitemFileName}><span>{name}</span></Link>
            </MyLink>
        ) : null
        console.log("当前版本",this.state.nowversion);
        return (<div style={styles.background}>
            <div style={styles.center}>
                <div style={styles.centerHeader}>
                    <Link to={{ pathname: `/home` }}  style={styles.btnReturn}>
                        <img src="./src/img/ico-menu.png" alt="" style={{marginRight:'3px',verticalAlign:'middle'}} />
                        <span style={{fontSize: '14px'}}>应用主页</span>
                    </Link>
                    <div style={styles.centerHeaderContent}>
                        <span style={{margin:'0px 4px',fontSize: '22px',color:'#3f5368',verticalAlign:'middle'}}>/</span>
                        <span style={{fontSize: '18px',fontWeight:'bold'}}>spitter-MVC</span>
                    </div>
                </div>
                <div style={styles.appContent}>
                    <div style={styles.appContentHeader}>
                        应用文件
                    </div>
                    <div style={styles.appContentTitle}>
                        <div>点此设置该应用的域名</div>
                        <Dropdown
                            styles={{ width: '140px' }}
                            dataList={this.state.versions}
                            onClick={this.onClickselectAppVer}
                        />
                    </div>
                    <div style={styles.appContentMain}>
                         <div style={styles.appContentMainitemTitle} >
                            {match.params.appName}
                         </div>
                        {packageDoms}
                    </div>
                </div>
            </div>
        </div>)
    }
}

AppContent.styles = {
    background: {
        position: 'fixed',
        width: '100%',
        height:'100%',
        backgroundColor:'#E7E8EC'
    },
    center: {
        margin:'2rem auto',
        width:'1080px',
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
        backgroundColor:'#ffffff'
    },
    appContentHeader: {
        fontSize: '24px',
        fontWeight:'bold',
        textAlign: 'left',
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
        height: '540px',
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
   
}
const MyLink = styled.div`
    &:hover{
       background:#f6f8fa;
   }
`