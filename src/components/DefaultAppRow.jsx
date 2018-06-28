import React from 'react'
import { HLayout, VLayout } from './Layout.jsx'

export default class MyAppRow extends React.Component {
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
                <span>CLONE</span>
            </div>
        </HLayout>)
    }
}