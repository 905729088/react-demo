import React from 'react'
import { HLayout, VLayout } from './Layout.jsx'
import DefaultAppRow from './DefaultAppRow.jsx'

export default class DefaultApps extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const styles = DefaultApps.styles;
        return (<div style={styles.background}>
            <div  style={styles.defaultAppsHeader}>选择默认应用</div>
            <div style={styles.defaultAppsMain}>
                <DefaultAppRow />
                <DefaultAppRow />
                <DefaultAppRow />
                <DefaultAppRow />
                <DefaultAppRow />
                <DefaultAppRow />
                <DefaultAppRow />
                <DefaultAppRow />
                <DefaultAppRow />
            </div>
        </div>)
    }
}

DefaultApps.styles = {
    background: {
        padding:'10px 0 0 40px',
        width:'520px',
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    defaultAppsHeader: {
        fontSize: '24px',
        fontWeight:'bold'
    },
    defaultAppsMain: {
        marginTop: '30px',
        paddingRight:'35px',
        height: '670px',
        overflowY:'auto',
        fontWeight: 'bold',
    },
}