import React from 'react';
import Rotate from './MyWait.jsx';
export default class Waiting extends React.Component{
   
    render(){
        const styles = Waiting.styles;
        return(
            <div style={styles.background}>
                <Rotate/>
            </div>
        );
    }
}
Waiting.styles={
    background:{
        position: 'fixed',
        zIndex: '999',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.2)' 
    }
}