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
            <div style={styles.defaultTitle}>{appInfo.name}</div>
            <div style={styles.defaultDescribe}>{appInfo.describe}</div>
            <div style={styles.defaultCopy} onClick={this.onClickCopy}>
                <span>CLONE</span>
            </div>
        </div>)
    }
}

DefaultAppRow.styles = {
    background: {
        position: 'relative',
        float:'left',
        margin: '0 15px 30px 0',
        padding:'20px',
        width: '320px',
        height: '154px',
        border: '1px solid #d1d2d7',
        boxShadow: '0px 3px 9px 0px rgba(34, 34, 34, 0.07)',
        borderRadius: '4px'
    },
    defaultTitle: {
        fontSize: '22px',
        color: '#0366d6', 
    },
    defaultDescribe: {
        marginTop: '10px',
        fontSize:'12px',
        height: '33px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontWeight:'normal'
    },
    defaultCopy: {
        position: 'absolute',
        right: '20px',
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