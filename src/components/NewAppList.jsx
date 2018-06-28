import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, VLayout } from './Layout.jsx'
import MyApps from './MyApps.jsx'


export default class NewAppList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<VLayout>
            <div>
                <div>创建新应用</div>
                <Link to="/create">
                    <div>+上传应用</div>
                </Link>
            </div>
            <MyApps></MyApps>
        </VLayout>)
    }
}