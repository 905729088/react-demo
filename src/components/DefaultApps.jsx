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
            <div>选择默认应用</div>
            <VLayout>
                <DefaultAppRow />
            </VLayout>
        </div>)
    }
}

DefaultApps.styles = {
    background: {
        width:'520px',
        boxSizing: 'border-box',
    }
}