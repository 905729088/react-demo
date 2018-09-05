import React from 'react'
export default class Decon extends React.Component{
    render(){
        const styles = Decon.styles;
        return(
            <div style={styles.background}>
                <div style={styles.header}>用户API</div>
            </div>
        )
    }
}
Decon.styles={
    background:{
        width:'100%',
        height:'100%',
        marginLeft: '230px',
        // backgroundColor:'pink'
    }
}