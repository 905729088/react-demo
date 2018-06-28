import React from 'react'
import { HLayout } from './Layout.jsx'
import NewAppList from './NewAppList.jsx'
import DefaultApps from './DefaultApps.jsx'

export default class Home extends React.Component{
    render(){
        return (<div>
            <HLayout>
                <NewAppList />
                <DefaultApps />
            </HLayout>
        </div>)
    }
}