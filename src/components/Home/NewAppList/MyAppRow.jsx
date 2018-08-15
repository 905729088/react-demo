import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes} from 'styled-components'
export default class MyAppRow extends React.Component{
    constructor(props) {
        super(props)
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickY = this.onClickY.bind(this);
    }
    async onClickDelete() { 
        const sid = this.props.sid;
        const istrue=window.confirm('您确定要删除这个应用？');
        if (istrue) {
              await G.api.uninstallapp(sid, this.props.appInfo.name);
              this.props.onClick();
        } 
      
    }
    onClickY() { 
        console.log(this.props.index)
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
        const styles = MyAppRow.styles;
        const appInfo = this.props.appInfo
        const appUri = `http://${G.currentIP}/entry?author=${appInfo.author}&app=${appInfo.name}&ver=last`;
         //阿拉伯转汉字
        const index = this.SectionToChinese(this.props.index);
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
                        <div style={styles.describe}>{appInfo.describe?appInfo.describe:'...'}</div>
                    </div>
                </div>
                <div style={styles.button} >
                    <Button style={styles.buttonM} onClick={() => this.props.handleAppClick({ index: 6, type: 'appinfo', appIndex: this.props.index-1 }, { appName: appInfo.name, appVer: 'last',appIndex:this.props.index-1})}>
                        <span>修改</span>
                    </Button>
                    <Button  onClick={this.onClickCopy}>
                        <a className='MyAppPreview' href={appUri} target="_blank">预览</a>
                    </Button>
                </div>
            </div>
       </div>
        )
    }
}

MyAppRow.styles = {
    background: {
       
        float: 'left',
        marginBottom:'40px',
        paddingRight:'4%',
        width: '50%',
        fontWeight:'normal'
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
        boxShadow: '0px 3px 9px 0px rgba(34, 34, 34, 0.07)',
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
    button:{ 
        display: 'flex',
        justifyContent: 'flex-start',
    },
    buttonM: {
        marginRight:'20px'
    }
}
const Button = styled.div`
    width:80px;
    height: 42px;
    border: 1px solid #019f57;
    border-radius:4px;
    font-size: 16px;
    font-weight:normal;
    text-align:center;
    line-height:42px;
    cursor:pointer;
    color:#019f57;
    background-color: #ffffff;
    & > a.MyAppPreview{
        display:block;
        width:100%;
        height:100%;
        color:#019f57;
        text-decoration:none;
        color:#ffffff;
        background-color: #019f57;
    };
`

