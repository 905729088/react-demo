import React from 'react'
import MyAppRow from './MyAppRow.jsx'

export default class MyApps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appList: null,
        }
    }
    render() {
        const styles = MyApps.styles
        let row = '...'
        const appList = this.props.appList;
        if (appList) {
            row = appList.map((app,i) => 
                <MyAppRow key={app.iD} appInfo={app} index={i + 1} sid={this.props.sid}  onClick={this.props.onClick}/>
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
        height: '600px',
        overflowY:'auto',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'flex-start',
        flexFlow:'row wrap',
        alignContent: 'flex-start'
    },
}