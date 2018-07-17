import React from 'react'
import { HLayout } from './Layout.jsx';
import { Link } from 'react-router-dom'

export default class CodeContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content : ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onTextarea = this.onTextarea.bind(this);
    }

    componentDidMount() {
        this.getCode()
    }

    async getCode() {
        let packageid;
        if (this.props.location.state) {

            packageid= this.props.location.state.packageid;
        } else { 
            packageid = sessionStorage.getItem('current_fileId');
        }
        sessionStorage.setItem('current_fileId',packageid);
        const sid = sessionStorage.getItem('current_sid')
        const uint8 = await G.api.getlfiledata(sid, packageid, 0, -1)
        const code = new TextDecoder('utf-8').decode(uint8)
        this.lastCode = code;
        this.setState({
            content: code
        })
    }

    async onSubmit() { 
        if (this.lastCode === this.state.content) {
            console.log('不更新');
            this.props.history.push(`/tree/${this.props.match.params.appName}/${this.props.match.params.appVer}`)//重定向
        } else {
            console.log('更新',this.props.match.params.appName,this.props.match.params.packageName);
            const sid = sessionStorage.getItem('current_sid');
            const fileid=await G.api.createfilebydata(sid,this.state.content);
            const appid = await G.api.uploadappfile(sid, this.props.match.params.appName, this.props.match.params.packageName, fileid)
            await G.api.version(sid, this.props.match.params.appName,'lastver','') 
            //   console.log('应用更新结果====》',appid);
            this.props.history.push(`/tree/${this.props.match.params.appName}/${this.props.match.params.appVer}`)//重定向
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
    onTextarea() {
        this.setState({
            content: this.textarea.value
        });
       
    }
    render() {
        const match = this.props.match
        const styles = CodeContent.styles;
        const appName = this.props.match.params.appName;
        return (<div style={styles.background}>
            <div style={styles.center}>
                <div style={styles.centerHeader}>
                    <Link to={{  pathname: `/tree/${appName}/${match.params.appVer}`}}  style={styles.centerHeaderReturn}>
                        <img src="./src/img/ico-menu.png" alt="" style={{marginRight:'3px',verticalAlign:'middle'}} />
                        <span style={{fontSize: '14px'}}>spitter-MVC</span>
                    </Link>
                    <div style={styles.centerHeaderContent}>
                        <span style={{margin:'0px 4px',fontSize: '22px',color:'#3f5368',verticalAlign:'middle'}}>/</span>
                        <span style={{fontSize: '18px',fontWeight:'bold'}}>webpack.config.js</span>
                    </div>
                </div>
                <div style={styles.Content}>
                    <div style={styles.codeContentHeader}>
                        <div> 代码详情</div>
                    </div>
                    <div style={styles.codeContentMainHeader}>
                        <div style={styles.codeContentMainHeaderLeft}><span>{match.params.packageName}</span></div>
                    </div>
                    <div style={styles.codeContentMainContent}>
                        <textarea style={styles.codeContentMainContentText} ref={textarea => {this.textarea = textarea}} onChange={this.onTextarea} value={this.state.content} />
                    </div>
                    <HLayout style={{marginTop:'20px'}}>
                        <div style={styles.btnSubmit} onClick={this.onSubmit}>提交</div> 
                        <Link to={{ pathname: `/tree/${appName}/${match.params.appVer}` }} style={styles.btnReturn}>返回</Link> 
                    </HLayout>
                </div>
            </div>
        </div>)
    }
}

CodeContent.styles = {
    background: {
        position: 'fixed',
        width: '100%',
        height:'100%',
        backgroundColor: '#E7E8EC',
    },
    center: {
        margin:'2rem auto',
        width: '1080px',
        boxSizing:'border-box',
    },
    centerHeader: {
        overflow:'hidden',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '40px',
        lineHeight:'40px'
    },
    centerHeaderReturn: {
        overflow:'hidden',
        textDecoration: 'none',
        color: '#0366d6',
     },
    centerHeaderContent: {
        overflow:'hidden',
        paddingLeft:'3px',
        color: '#0366d6'
    },
    Content: {
        marginTop:'10px',
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0px 8px 9px 0pxrgba(34, 34, 34, 0.08)',
        boxSizing: 'border-box',
        padding:'30px'
    },
    codeContentHeader: {
        fontSize: '24px',
        fontWeight:'bold',
        textAlign: 'left',
        color: '#32475e'
    },
    codeContentMainHeader: {
        marginTop:'20px',
        fontSize: '18px',
        height: '48px',
        lineHeight:'48px',
        border: '1px solid #b8dbff',
        background: '#f1f8ff',
        borderBottom:'none'
    },
    codeContentMainHeaderLeft: {
        width: '400px',
        marginLeft: '20px',
    },
    codeContentMainHeaderRight: {
        boxSizing: 'border-box',
        paddingRight:'40px',
        width: '300px',
        textAlign:'right'
    },
    codeContentMainContent: {
        height:'485px',
        border: '1px solid #dadbe0',
        borderTop: 'none',
        boxSizing: 'border-box',
    },
    codeContentMainContentText: {
        padding:'16px 34px',
        width: '100%',
        height: '100%',
        fontSize:'18px',
        resize: 'none',
        border: 'none',
        outline:'none'
    },
    btnSubmit: {
        marginRight:"20px",
        width: '90px',
        height: '35px',
        textAlign: 'center',
        fontSize: '16px',
        color:'#fff',
        border: '1px solid #0084c1',
        lineHeight: '35px',
        cursor: 'pointer',
        borderRadius: '4px',
        backgroundColor:'#00afff'
    }
    , btnReturn: {
        marginRight:"20px",
        width: '90px',
        height: '35px',
        textAlign:'center',
        border: '1px solid #0084c1',
        color:'#00afff',
        lineHeight: '35px',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration:'none'
    }
}