import React from 'react'
import { HLayout, VLayout } from './Layout.jsx'
import DefaultAppRow from './DefaultAppRow.jsx'
import AuthContext from '../auth-context.js'
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
        const appList = await G.api.getvar(sid, 'appinfos')
        this.setState({
            appList
        })
    }
    render() {
        const styles = DefaultApps.styles;
        const appList = this.state.appList;
        let row = '...';
        if (appList) {
            row = appList.map((app,i) => 
                <DefaultAppRow key={app.iD} appInfo={app} index={i + 1} sid={this.props.sid} />
            )
        }
        return (<div style={styles.background}>
            <div style={styles.defaultAppsMain}>
                {row}
            </div>
        </div>)
    }
}

DefaultApps.styles = {
    background: {
        paddingTop:'20px',
        overflow: 'hidden',
    },
    defaultAppsMain: {
        marginTop: '10px',
        height: '580px',
        overflowY:'auto',
        fontWeight: 'bold',
        display: 'flex',
        flexFlow:'row wrap',
        justifyContent: 'flex-start',
    },
}
export default  props => (
    <AuthContext.Consumer>
         {auth => <DefaultApps {...props} auth={auth}/>}
    </AuthContext.Consumer>
  );