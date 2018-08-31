import React from 'react'
export default class Guide extends React.Component{
    render(){
        const styles = Guide.styles;
        return(
            <div style={styles.background}>
                <div style={styles.header}>开发指南</div>
                <div style={styles.line}></div>
            </div>
        )
    }
}
Guide.styles={
    background: {
        overflow: 'hidden',
        overflowY:'auto',
        padding:'33px 0px 33px 50px',
        width: '100%',
        height: '100%',
        background: '#fff',
    },
    header: {
        fontSize: '28px',
        fontWeight: 'normal',
        color: '#222222',
        fontFamily:'SimSun'
    },
    line: {
        marginTop:'20px',
        width: '100%',
        height:'1px',
        backgroundColor:'#E7E8EC'
    }
}