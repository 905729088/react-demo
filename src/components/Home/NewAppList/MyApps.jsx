import React from 'react'
import MyAppRow from './MyAppRow.jsx'
import {Fetch_HomeMyApp_Data,AppContentApp_Info} from './../../ACommon/action/index.js'
export default class MyApps extends React.Component {
    constructor(props) {
        super(props);
        this.handleAppClick = this.handleAppClick.bind(this);
    }
    componentDidMount() { 
        this.props.dispatch(Fetch_HomeMyApp_Data(this.props.sid));
    }
    handleAppClick(info) { 
        this.props.dispatch(AppContentApp_Info(info));
        this.props.history.push('/home/AppContent/'+info.name)
    }
    render() {
        const styles = MyApps.styles
        let row = '...'
        const appList = this.props.myApps;
        if (appList) {
            row = appList.map((app,i) => 
                <MyAppRow key={app.iD} appInfo={app} index={i + 1} sid={this.props.sid} handleAppClick={this.handleAppClick}/>
            )
        }
        return (<div  style={styles.background}>
            <div style={styles.myAppsMain}>
                {row}
            </div>
        </div>)
    }
}

MyApps.styles = {
    background: {
       paddingTop:'20px',
        overflow: 'hidden',
    },
   
    myAppsMain: {
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'flex-start',
        flexFlow:'row wrap',
        alignContent: 'flex-start'
    },
}