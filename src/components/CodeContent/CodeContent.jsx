import React from 'react'
import { HLayout } from '../ACommon/Layout.jsx';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { G } from './../ACommon/Api'

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint.css';  
import 'codemirror/addon/hint/show-hint.js'; 
import {Fetch_AppContentApp_File_List} from './../ACommon/action/index.js'
export default class CodeContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            isButton:true
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.updateCode = this.updateCode.bind(this);
    }

    componentDidMount() {
       this.getCode()
    }

    async getCode() {
        let packageid = this.props.codeData.packageid;
        console.log('文本内容',packageid);
        const sid = this.props.sid;
        const uint8 = await G.api.getLFileData(sid, packageid, 0, -1)
        const code = new TextDecoder('utf-8').decode(uint8)
        this.lastCode = code;
        
        this.editor.getCodeMirror().setValue(code);//将内容插入插件中
    }

    async onSubmit() { 
        const content = this.editor.getCodeMirror().getValue();//获取编辑器的值
        if (this.lastCode === content) {
            //console.log('====>不更新');
            this.props.onReturnAppConent({index:6,type:Number,appIndex:this.props.codeData.appIndex},false)
           // this.props.history.push(`/tree/${this.props.match.params.appName}/${this.props.match.params.appVer}`)//重定向
        } else {
            if (this.state.isButton) {
                this.setState({isButton:false})
                const sid = this.props.sid;
                const fileid = await G.api.createFileByData(sid, content);
                const appid = await G.api.uploadAppFile(sid, this.props.codeData.appName, this.props.codeData.packageName, fileid);
                this.props.dispatch(Fetch_AppContentApp_File_List(sid,this.props.codeData.appName,this.props.codeData.appVer));
                this.props.onReturnAppConent({index:6,type:Number,appIndex:this.props.codeData.appIndex},true)
             }
           // console.log('====>更新');
           
         //   this.props.history.push(`/tree/${this.props.match.params.appName}/${this.props.match.params.appVer}`)//重定向
         }
       
       
    }
   
    readBlob(blob) {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.readAsArrayBuffer(blob)
        })
    }
   
    updateCode(newCode) {
		this.setState({
			content: newCode,
		});
	}
    render() {
        const styles = CodeContent.styles;
        const codeData = this.props.codeData;
        const appName = codeData.appName;
        const options = {
                lineNumbers: true,
                mode: {name: "text/x-mysql"}, 
                extraKeys: { "Ctrl": "autocomplete" },   //自动提示配置  
                autoCloseTags: true,
                readOnly: false,          //是否只读
            };
       
     
        return (<div style={styles.background}>
            <div style={styles.header}>我的应用/<span style={{ color: '#019f57' }}>{appName}/{codeData.packageName}</span></div>
            <div style={styles.line}></div>
            <div style={styles.Content}>
                <div style={styles.codeContentMainHeader}>
                    <div style={styles.codeContentMainHeaderLeft}><span>{codeData.packageName}</span></div>
                </div>
                <TextConent style={styles.codeContentMainContent}>
                    <CodeMirror value={this.state.content} onChange={this.updateCode} options={options} ref={(editor) => { this.editor = editor }} />
                </TextConent>
                <HLayout style={{marginTop:'20px'}}>
                    <div style={styles.btnSubmit} onClick={this.onSubmit}>提交</div> 
                    <div style={styles.btnReturn} onClick={()=>this.props.onReturnAppConent({index:6,type:Number,appIndex:codeData.appIndex})}>取消</div> 
                </HLayout>
            </div>
        </div>)
    }
}

CodeContent.styles = {
    background: {
        overflow: 'hidden',
        overflowY:'auto',
        padding:'33px 0 33px 50px',
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
    }, 
    Content: {
        marginTop:'30px',
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0px 8px 9px 0pxrgba(34, 34, 34, 0.08)',
        boxSizing: 'border-box',
    },
    codeContentMainHeader: {
        marginTop:'20px',
        fontSize: '18px',
        height: '48px',
        lineHeight:'48px',
        border: '1px solid #019f57',
        background: '#acd6b7',
    },
    codeContentMainHeaderLeft: {
        float:'left',
        marginLeft: '20px',
        height:'100%'
    },
    codeContentMainHeaderRight: {
        float: 'right',
        marginRight: '20px',
        height:'100%'
    },
    codeContentMainContent: {
        overflow:'hidden',
        position:'relative',
        height:'547px',
        border: '1px solid #dadbe0',
        borderTop: 'none',
        boxSizing: 'border-box',
    },
    codeContentMainContentCover: {
        position: 'absolute',
        zIndex: '9',
        top: '0',
        width: '100%',
        height: '100%'
    },
    btnSubmit: {
        marginRight:"20px",
        width: '80px',
        height: '42px',
        textAlign: 'center',
        fontSize: '16px',
        color:'#fff',
        border: '1px solid #019f57',
        lineHeight: '42px',
        cursor: 'pointer',
        borderRadius: '4px',
        backgroundColor:'#019f57'
    }
    , btnReturn: {
        marginRight:"20px",
        width: '80px',
        height: '42px',
        textAlign:'center',
        border: '1px solid #019f57',
        color:'#019f57',
        lineHeight: '42px',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration:'none'
    }
}
const TextConent = styled.div`
    & .CodeMirror{
        width:100%;
        height:546px;
        white-space:wrap;
      }
`