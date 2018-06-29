import React from 'react'
import { HLayout } from './Layout.jsx'
import NewAppList from './NewAppList.jsx'
import DefaultApps from './DefaultApps.jsx'

export default class Home extends React.Component{
    
    render() {
        const styles = Home.styles;
        return (<div >
            <HLayout style={styles.background}>
                <NewAppList />
                <DefaultApps/>
            </HLayout>
        </div>)
    }
}
Home.styles = {
    background: {
        margin: '55px auto',
        padding:'40px 0 45px 0',
        width: '1400px',
        border:'1px solid #BBBBBB',
        borderRadius: '6px',
        boxSizing:'border-box'
    }
}