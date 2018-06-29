import React from 'react'
import { HLayout, VLayout } from './Layout.jsx'

export default class DefaultAppRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const styles = DefaultAppRow.styles;
        return (<HLayout  style={styles.background}>
            <HLayout style={styles.defaultAppRowLeft}>
                <span>1.</span>
                <span style={styles.defaultAppRowLeftLogin}>logo</span>
                <span>应用名</span>
            </HLayout>
            <div style={styles.defaultAppRowRight}>
                <span>CLONE</span>
            </div>
        </HLayout>)
    }
}

DefaultAppRow.styles = {
    background: {
        marginBottom:'30px',
        justifyContent: 'space-between',
    },
    defaultAppRowLeft: {
        fontSize: '26px',
        alignItems:'center'
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
        marginTop:'10px',
        width: '120px',
        height: '40px',
        border: '1px solid #BBBBBB',
        borderRadius: '6px',
        fontSize: '18px',
        fontWeight:'normal',
        textAlign: 'center',
        lineHeight: '40px',
        backgroundColor:'#D9D9D9'
    }
}