import React from 'react'
import DefaultAppRow from './DefaultAppRow.jsx'
import AuthContext from '../../../auth-context.js'
import {G} from './../../ACommon/Api'
class DefaultApps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {appList:null};
    }
    componentDidMount() { 
        this.getAppList();
    }
    async getAppList() { 
        const sid = this.props.auth.sid
        const strArr = await G.api.hGetAll('',this.props.auth.DATA_ID, '__H_File_ID__');
        let appList = [];
        for (let val of strArr) { 
            let obj = JSON.parse(val.value);
            appList.push(obj);
        }
        this.setState({appList})
    }
    render() {
        const styles = DefaultApps.styles;
        const appList = this.state.appList;
        let row = '...';
        
        if (appList) {
            row = appList.map((app,i) => 
                <DefaultAppRow key={app.fileId} getLeftAppData={this.props.getLeftAppData} appInfo={app} index={i + 1} sid={this.props.auth.sid} />
            )
        }
        return (<div style={styles.background}>
            <div style={styles.header}>应用库</div>
            <div style={styles.line}></div>
            <div style={styles.defaultAppsMain}>
                {row}
            </div>
        </div>)
    }
}

DefaultApps.styles = {
    background: {
        width: '100%',
        height: '100%',
        background:'#ffffff',
        overflow: 'hidden',
        overflowY:'auto',
        padding:'33px 0px 33px 50px',
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
    defaultAppsMain: {
        marginTop: '50px',
    },
}
export default  props => (
    <AuthContext.Consumer>
         {auth => <DefaultApps {...props} auth={auth}/>}
    </AuthContext.Consumer>
  );