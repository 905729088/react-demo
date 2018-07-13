import React from 'react'
import { HLayout, VLayout } from './Layout.jsx'

export default class DefaultAppRow extends React.Component {
    constructor(props) {
        super(props)
        this.onClickCopy = this.onClickCopy.bind(this);
    }
    onClickCopy() { 
        console.log('复制');
    }
    render() {
        const styles = DefaultAppRow.styles;
        const appInfo = this.props.appInfo;
        return (<div  style={styles.background}>
            <HLayout style={styles.defaultAppRow}>
                <div style={{ margin: '30px', fontSize: '22px', color: '#0366d6', }}>{appInfo.name}</div>
            </HLayout>
            <div style={styles.defaultAppRowRight} onClick={this.onClickCopy}>
                <span>CLONE</span>
            </div>
        </div>)
    }
}

DefaultAppRow.styles = {
    background: {
        position: 'relative',
        margin:'0 15px 30px 0',
        width: '320px',
	    height: '154px',
        border:'1px solid #d1d2d7',
        boxShadow: '0px 3px 9px 0px rgba(34, 34, 34, 0.07)',
        borderRadius: '4px'
    },
    defaultAppRow: {
        overflow:'hidden',
        display: 'block',
        width: '100%',
        height: '100%',
        textDecoration:'none'
    },
    defaultAppRowLeftLogin: {
        display: 'block',
        margin:'0 20px',
        width: '60px',
        height:'60px',
        fontSize: '18px',
        lineHeight: '60px',
        textAlign:'center',
        border: '1px solid #BBBBBB',
        borderRadius:'100%'
    },
    defaultAppRowRight: {
        position: 'absolute',
        right: '30px',
        bottom:'20px',
        width: '80px',
        height: '30px',
        border: '1px solid #0084c1',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight:'normal',
        textAlign: 'center',
        color:'#ffffff',
        lineHeight: '30px',
        backgroundColor: '#00afff',
        cursor:'pointer'
    }
}