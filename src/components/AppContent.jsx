import React from 'react'

export default class AppContent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const match = this.props.match
        
        return (<div>
            <div>{match.appName}</div>

            <div>123</div>
        </div>)
    }
}