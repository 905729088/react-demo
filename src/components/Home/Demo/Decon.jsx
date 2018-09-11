import React from 'react'

const Com = {
    user: require('./src/user.jsx').default,
    team: require('./src/team.jsx').default,
    'folder-add': require('./src/folder-add.jsx').default,
    table: require('./src/table.jsx').default,
}

const Decon = props => {
    return <React.Fragment>
        { props.type in Com && React.createElement(Com[props.type]) }
    </React.Fragment>
}

export default Decon
