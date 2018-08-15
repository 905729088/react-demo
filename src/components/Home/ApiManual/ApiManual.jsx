import React from 'react';
export default class ApiManual extends React.Component { 
    render() { 
        const styles = ApiManual.styles;
        return (<div style={styles.background} >
            {/* <iframe style={styles.main} src="/src/components/Home/ApiManual/api.html" frameborder="0"></iframe> */}
           
        </div>)
    }
}
ApiManual.styles = {
    background: {
        width: '100%',
        height: '100%',
        background:'#fff'
    },
    main: {
        width: '100%',
        height: '100%',
        background:'#fff'
    }
}