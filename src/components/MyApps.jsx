import React from 'react'
import { Layout, VLayout } from './Layout.jsx'
import MyAppRow from './MyAppRow.jsx'

export default class MyApps extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const styles = MyApps.styles;
        return (<div  style={styles.background}>
            <div  style={styles.myAppsHeader}>我的上传</div>
            <div style={styles.myAppsMain}>
                <MyAppRow />
                <MyAppRow />
                <MyAppRow />
                <MyAppRow />
                <MyAppRow />
                <MyAppRow />
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