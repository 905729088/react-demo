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

    // async onSubmit() { 
    //    // const file = new Blob([this.state.content], { type: "text/plain;charset=utf-8" });
    //     const sid = sessionStorage.getItem('current_sid');
    //    // console.log('=================>',file);
    //     const fileid=await G.api.createfilebydata(sid,this.state.content);
    //     G.api.uploadappfile(sid, this.props.match.params.appName, this.props.match.params.packageName, fileid)
    //     //     const file=this.file.files[0];
    //     //     console.log(file);
    //     //     const sid = sessionStorage.getItem('current_sid');
    //     //     const tempFileId = await G.api.opentempfile(sid)
    //     //     await G.api.setlfiledata(sid, tempFileId, 0, await this.readBlob(file))
    //     //     //console.log('111111====》',appid);
    //     //     const fileid = await G.api.temp2lfile(sid, tempFileId)
    //     //     // console.log('2222222====》',appid);
    //     //     await G.api.uploadappfile(sid, this.props.match.params.appName, this.props.match.params.packageName, fileid)
    //     //     //await G.api.uploadapp(sid, fileid)
    //     //     console.log('========>',appid);
    //     //    // await G.api.getvar("version",sid, this.props.match.params.appName,'lastver') 
    //     //     //await G.api.version(sid, this.props.match.params.appName,'lastver','') 
    //     //     //   console.log('应用更新结果====》',appid);
    //     //     this.props.history.push(`/tree/${this.props.match.params.appName}/${this.props.match.params.appVer}`)//重定向
    //     //  //}
       
       
    // }
    async onSubmit() { 
        if (this.lastCode === this.state.content) {
            console.log('不更新');
            this.props.history.push(`/tree/${this.props.match.params.appName}/${this.props.match.params.appVer}`)//重定向
        } else {
            console.log('更新',this.props.match.params.appName,this.props.match.params.packageName);
            const sid = sessionStorage.getItem('current_sid');
            const fileid=await G.api.createfilebydata(sid,this.state.content);
            const appid = await G.api.uploadappfile(sid, this.props.match.params.appName, this.props.match.params.packageName, fileid)
            await G.api.Version(sid, this.props.match.params.appName,'lastver','') 
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
                <div style={styles.codeContentHeader}>
                    <div> 代码详情</div>
                </div>
                <div style={styles.codeContentMain}>
                    <HLayout style={styles.codeContentMainHeader}>
                        <div style={styles.codeContentMainHeaderLeft}><span>{match.params.packageName}</span></div>
                    </HLayout>
                    <div style={styles.codeContentMainContent}>
                        <textarea style={styles.codeContentMainContentText} ref={textarea => {this.textarea = textarea}} onChange={this.onTextarea} value={this.state.content} />
                    </div>
                </div>
                <HLayout style={{marginTop:'20px'}}>
                    <Link to={{ pathname: `/tree/${appName}/${match.params.appVer}` }} style={styles.btnReturn}>返回</Link> 
                    <div style={styles.btnSubmit} onClick={this.onSubmit}>提交</div> 
                    {/* <Link to={{ pathname: `/tree/${appName}` }} style={styles.btnSubmit} onClick={this.onSubmit}>提交</Link>   */}
                </HLayout>
               
            </div>
        </div>)
    }
}

CodeContent.styles = {
    background: {
        position: 'relative',
    },
    center: {
        position: 'absolute',
        width:'1200px',
        left: '50%',
        transform:'translateX(-50%)',
    },
    codeContentHeader: {
        display:'flex',
        marginTop:'100px',
        fontSize: '26px',
        fontWeight:'bold',
        textAlign: 'left',
        justifyContent: 'space-between', 
    
    },
    codeContentHeaderEdition: {
        width: '160px',
        height: '30px',
        textIndent:'20px',
        border: '1px solid #BBBBBB',
        borderRadius: '6px',
        fontSize:'18px',
        outline: 'none',
        color:'#AAAAAAA'
    },
    codeContentHeaderEditionOption: {
        fontSize: '18px',
        color:'red'
    },
    codeContentMain: {
        marginTop:'20px',
        width: '100%',
    },
    codeContentMainHeader: {
        fontSize: '18px',
        height: '60px',
        lineHeight:'60px',
        border: '1px solid #BBBBBB',
        justifyContent: 'space-between',
        background:'#E3E9EC'
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
        height:'540px',
        border: '1px solid #BBBBBB',
        borderTop:'none'
    },
    codeContentMainContentText:{
         width: '100%',
        height: '100%',
        fontSize:'18px',
        resize:'none',
    },
    btnSubmit: {
        marginRight:"20px",
        width: '90px',
        height: '35px',
        textAlign:'center',
        border: '1px solid #BBBBBB',
        lineHeight: '35px',
        cursor:'pointer'
    }
    , btnReturn: {
        marginRight:"20px",
        width: '90px',
        height: '35px',
        textAlign:'center',
        border: '1px solid #BBBBBB',
        lineHeight: '35px',
        cursor:'pointer'
    }
}