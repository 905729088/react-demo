import React from 'react'
import ConnectDefaultAppRow from './ConnectDefaultAppRow.jsx'
import {Fetch_DefaultApp_Data} from './../../ACommon/action/index.js'
export default class DefaultApps extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() { 
        this.props.dispatch(Fetch_DefaultApp_Data(this.props.DATA_ID));
    }
    render() {

        const styles = DefaultApps.styles;
        const appList = this.props.appList;
        let row = '...';
        
        if (appList) {
            row = appList.map((app,i) => 
                <ConnectDefaultAppRow key={app.fileId} appInfo={app} index={i + 1} sid={this.props.sid} />
            )
        }
        return (<div style={styles.background}>
            <div style={styles.header}>开源库</div>
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
