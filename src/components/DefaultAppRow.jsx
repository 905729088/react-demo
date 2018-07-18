import React from 'react'
import { HLayout, VLayout } from './Layout.jsx'
import styled from 'styled-components'
export default class DefaultAppRow extends React.Component {
    constructor(props) {
        super(props)
        this.onClickCopy = this.onClickCopy.bind(this);
    }
    async onClickCopy() { 
        const istrue = window.confirm('您确定要克隆这个应用？');
        if (istrue) { 
            const sid = this.props.sid;
            const tempFileId = this.props.appInfo.fileId;
            const strArr = this.props.appInfo.name.split('.');
            const type=strArr[strArr.length-1]
            await G.api.uploadapp(sid, tempFileId,type);
        }
       
    }
    render() {
        const styles = DefaultAppRow.styles;
        const appInfo = this.props.appInfo;
        return (<Background  style={styles.background}>
            <div style={styles.defaultTitle}>{appInfo.name}</div>
            <div style={styles.defaultDescribe}>{appInfo.describe}</div>
            <MyCopy style={styles.defaultCopy} onClick={this.onClickCopy}>
                <span>CLONE</span>
            </MyCopy>
        </Background>)
    }
}

DefaultAppRow.styles = {
    background: {
        position: 'relative',
        float:'left',
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
        bottom:'18px',
        width: '62px',
        height: '24px',
        border: '1px solid #00afff',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight:'normal',
        textAlign: 'center',
        lineHeight: '24px',
        cursor:'pointer'
    }
}
const MyCopy = styled.div`
    color:#00afff;
    background-color: #ffffff;
    &:hover{
        color:#ffffff;
        background-color: #00afff;
    }
`
const Background = styled.div`
    margin:0 21px 20px 0;
    &:nth-child(3n){
        margin-right:0px;
    }
`