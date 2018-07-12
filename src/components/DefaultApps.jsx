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