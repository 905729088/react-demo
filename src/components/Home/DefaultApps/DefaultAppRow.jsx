import React from 'react'
import styled from 'styled-components'
import { G } from './../../ACommon/Api'
import Rotate from './../../ACommon/MyWait.jsx';
export default class DefaultAppRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCover:false
        }
        this.onClickCopy = this.onClickCopy.bind(this);
        this.SectionToChinese = this.SectionToChinese.bind(this);
       
    }
    
    async onClickCopy() { 
        const istrue = window.confirm('您确定要克隆这个应用？');
        if (istrue) { 
            const sid = this.props.sid;
            this.setState({isCover:true});
            const tempFileId = this.props.appInfo.fileId;
            const strArr = this.props.appInfo.name.split('.');
            const type=strArr[strArr.length-1]
            await G.api.uploadApp(sid, tempFileId, type);
            this.props.getLeftAppData();
            this.setState({isCover:false});
        }
       
    }
    SectionToChinese(section) {
        const chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
        const chnUnitSection = ["","万","亿","万亿","亿亿"];
        const chnUnitChar = ["","十","百","千"];
        let strIns = '', chnStr = '';
        let unitPos = 0;
        let zero = true;
        while(section > 0){
            let v = section % 10;
            if(v === 0){
                if(!zero){
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            }else{
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }

    render() {
        const styles = DefaultAppRow.styles;
        const appInfo = this.props.appInfo;
       
        //阿拉伯转汉字
        const index =  this.SectionToChinese(this.props.index);
       

        return (<div style={styles.background}>
            <div style={styles.left}>
                应用{index}：
            </div>
            <div style={styles.right}>
                <div style={styles.rightLeft}>
                    <div>
                        <img src={require('./img/ico-app.png')} alt=""/>
                    </div>
                    <div style={styles.rightLeftMain}>
                        <div style={styles.title}>{appInfo.name}</div>
                        <div style={styles.describe}>{appInfo.describe}</div>
                    </div>
                </div>
                <MyCopy style={styles.leftLeft} onClick={this.onClickCopy}>
                    <span>CLONE</span>
                </MyCopy>
            </div>
            <div style={this.state.isCover ? styles.MyWait : {display:'none'}} >
                <Rotate></Rotate>
            </div>
        </div>)
    }
}

DefaultAppRow.styles = {
    background: {
        float: 'left',
        marginBottom:'40px',
        paddingRight:'4%',
        width: '50%',
       
    },
    left: {
        fontSize: '16px',
        color:'#2222222'
    },
    right: {
        marginTop:'10px',
        padding:'30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        width: '100%',
        height: '120px',  
        border: '1px solid #d1d2d7',
        boxShadow: ' 0px 6px 9px 0px rgba(34, 34, 34, 0.04)',
        borderRadius: '4px'
    },
    rightLeft: {
        display: 'flex',
        justifyContent: 'flex-start',
        height:'100%',
     
    },
    rightLeftMain: {
        padding: '5px 0px 0 20px',
        height:'100%',
    },
    title: {
        fontSize: '20px',
        color: '#222222', 
    },
    describe: {
        marginTop: '10px',
        fontSize:'12px',
        height: '33px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontWeight: 'normal',
        color:'#8a8f99'
    },
    leftLeft: {
        width: '80px',
        height: '42px',
        border: '1px solid #019f57',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight:'normal',
        textAlign: 'center',
        lineHeight: '42px',
        cursor:'pointer'
    }, MyWait: {
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
const MyCopy = styled.div`
    color:#ffffff;
    background-color: #019f57;
   
`
// &:hover{
//     color:#ffffff;
//     background-color: #019f57;
// }