import React from 'react'
import MyAppRow from './MyAppRow.jsx'

export default class MyApps extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const styles = MyApps.styles
        let row = '...'
        const appList = this.props.myApps;
        if (appList) {
            row = appList.map((app,i) => 
                <MyAppRow key={app.iD} appInfo={app} index={i + 1} sid={this.props.sid} handleAppClick={this.props.handleAppClick}/>
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