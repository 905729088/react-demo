import React from 'react'
import { Layout, VLayout } from './Layout.jsx'
import MyAppRow from './MyAppRow.jsx'

export default class MyApps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appList: null
        }
    }

    componentDidMount() {
        this.getAppList()
    }

    async getAppList() {
        const sid = this.props.sid
        const appList = await G.api.getvar(sid, 'appinfos')
        this.setState({
            appList
        })
    }

    render() {
        const styles = MyApps.styles
        let row = '...'
        const appList = this.state.appList
        if (appList) {
            row = appList.map((app,i) => 
                <MyAppRow key={app.iD} appInfo={app} index={i + 1} sid={this.props.sid} />
            )
        }
        return (<div  style={styles.background}>
            <div  style={styles.myAppsHeader}>我的上传</div>
            <div style={styles.myAppsMain}>
                {row}
            </div>
        </div>)
    }
}

MyApps.styles = {
    background: {
       paddingTop:'50px',
        overflow: 'hidden',
    },
    myAppsHeader: {
        fontSize: '24px',
        fontWeight:'bold'
    },
    myAppsMain: {
        marginTop: '30px',
        paddingRight:'35px',
        height: '460px',
        overflowY:'auto',
        fontWeight: 'bold',
    },
}