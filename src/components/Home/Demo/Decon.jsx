import React from 'react'

const Com = {
    user: require('./src/user.jsx').default,
}

const Decon = props => {
    return <React.Fragment>
        { props.type in Com && React.createElement(Com[props.type]) }
    </React.Fragment>
}

export default Decon
