import React from 'react'
import { Layout, VLayout } from './Layout.jsx'
import MyAppRow from './MyAppRow.jsx'

export default class MyApps extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div>
            <div>我的上传</div>
            <VLayout>
                <MyAppRow />
            </VLayout>
        </div>)
    }
}