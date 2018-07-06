import React from 'react'
import { HLayout } from './Layout.jsx';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';
export default class AppContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            versions: [],
            currentVer: 'last',
            packages: [],
        }
    }

    componentDidMount() {
        this.getAsyncInfo()
    }

    async getAsyncInfo() {
        const appName = this.props.match.params.appName
        const sid = sessionStorage.getItem('current_sid')
        if (appName && sid) {
            const versions = await G.api.getvar(sid, 'appversions', appName)
            const packages = await this.getPackages()
            
            this.setState({
                versions,
                packages
            })
        }
    }
    async getPackages(ver='last') {
        const appName = this.props.match.params.appName
        const sid = sessionStorage.getItem('current_sid')
        const packageInfo = await G.api.getvar(sid, 'apppackage', appName, ver)
        if (packageInfo) {
            return packageInfo.name2ID
        }
        return []
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
            <HLayout style={styles.appContentMainitem} key={i}>
                <Link to={{ pathname: `/treeCode/${appName}/${currentVer}/${name}`, state: { packageid: packages[name] } }} style={styles.appContentMainitemFileName}><span>{name}</span></Link>
            </HLayout>
        ) : null
        return (<div style={styles.background}>
            <div style={styles.center}>
                <div style={styles.appContentHeader}>
                    <div> {match.params.appName}</div>
                    <Dropdown
                        styles={{ width: '160px' }}
                        dataList={this.state.versions}
                    />
                </div>
                <div style={styles.appContentMain}>
                    {packageDoms}
                </div>
                <HLayout style={{marginTop:'20px'}}>
                    <Link to={{ pathname: `/home` }} style={styles.btnReturn}>返回</Link> 
                </HLayout>
            </div>
        </div>)
    }
}

AppContent.styles = {
    background: {
        position: 'relative',
    },
    center: {
        position: 'absolute',
        width:'1200px',
        left: '50%',
        transform:'translateX(-50%)',
    },
    appContentHeader: {
        display:'flex',
        marginTop:'160px',
        fontSize: '26px',
        fontWeight:'bold',
        textAlign: 'left',
        justifyContent: 'space-between',
    },
   
    appContentMain: {
        marginTop:'20px',
        width: '100%',
        height: '540px',
        overflowY: 'auto',
        borderTop:'1px solid #BBBBBB',
    },
    appContentMainitem: {
        fontSize: '18px',
        height: '60px',
        lineHeight:'60px',
        border: '1px solid #BBBBBB',
        borderTop:'none',
    },
    appContentMainitemFileName: {
        width: '400px',
        marginLeft: '20px',
    },
    appContentMainitemFileDescribe: {
        boxSizing: 'border-box',
        paddingRight:'40px',
        width: '100%',
        textIndent:'50px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow:'hidden'
    },btnReturn: {
        marginRight:"20px",
        width: '90px',
        height: '35px',
        textAlign:'center',
        border: '1px solid #BBBBBB',
        lineHeight: '35px',
        cursor:'pointer'
    }
}