import React from 'react'
import { Link } from 'react-router-dom'
import { HLayout, VLayout } from './Layout.jsx'

export default class MyAppRow extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (<HLayout>
            <div>
                <span>logo</span>
                <span>应用名</span>
            </div>
            <div>
                <Link to="/tree/testApp"><span>编辑</span></Link>
                <span>删除</span>
            </div>
        </HLayout>)
    }
}