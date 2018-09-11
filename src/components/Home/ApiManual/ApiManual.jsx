import React from 'react';
export default class ApiManual extends React.Component {
    render() {
        const styles = ApiManual.styles;
        return (<div style={styles.background} >
            <iframe style={styles.main} src={location.origin + "/api.html"} frameBorder="0"></iframe>
        </div>)
    }
}
ApiManual.styles = {
    background: {
        width: '100%',
        height: '100%',
        background: '#fff'
    },
    main: {
        width: '100%',
        height: '100%',
        background: '#fff'
    }
}