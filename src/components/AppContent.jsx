import React from 'react'
import { HLayout } from './Layout.jsx';
import { Link } from 'react-router-dom';
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
        const sid = this.props.location.state.sid
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
        const sid = this.props.location.state.sid
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
        const versions = this.state.versions.map((ver, i) =>
            <option style={styles.appContentHeaderEditionOption} key={i}>{ver}</option>
        )
        const packages = this.state.packages
        const packageNames = Object.keys(packages)
        console.log('this.state.versions', this.state.versions);
        
        let packageDoms = '...'
        packageDoms = packageNames && packageNames.length? packageNames.map((name, i) =>
            <HLayout style={styles.appContentMainitem} key={i}>
                <Link to={{ pathname: `/code/${currentVer}/${name}`, state: { packageid: packages[name] } }} style={styles.appContentMainitemFileName}><span>{name}</span></Link>
            </HLayout>
        ) : null
        return (<div style={styles.background}>
            <div style={styles.center}>
                <div style={styles.appContentHeader}>
                    <div> {match.params.appName}</div>
                    <div>
                        <input type="text" style={styles.appContentHeaderEdition} placeholder='版本管理' list='verList' />
                        <datalist id='varList'>
                            {versions}
                        </datalist>
                    </div>
                   
                </div>
                <div style={styles.appContentMain}>
                    {packageDoms}
                </div>
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
    appContentHeaderEdition: {
        width: '160px',
        height: '30px',
        textIndent:'20px',
        border: '1px solid #BBBBBB',
        borderRadius: '6px',
        fontSize:'18px',
        outline: 'none',
        color:'#AAAAAAA'
    },
    appContentHeaderEditionOption: {
        fontSize: '18px',
        color:'red'
    },
    appContentMain: {
        marginTop:'20px',
        width: '100%',
        height: '540px',
        overflowY:'auto'
    },
    appContentMainitem: {
        fontSize: '18px',
        height: '60px',
        lineHeight:'60px',
        border:'1px solid #BBBBBB',
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
    },
}