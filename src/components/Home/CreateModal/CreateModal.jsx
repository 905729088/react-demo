import React from 'react'
import AuthContext from '../../../auth-context.js'
import Rotate from './MyWait.jsx';
import styled from 'styled-components'
class CreateModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '上传新的应用',
            index: 0,
            indexStae: false,
            fileInfo: null
        };
        this.handleBack = this.handleBack.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onFileChange = this.onFileChange.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) { 
     
        const fileInfo = nextProps.fileInfo;
        return {fileInfo}
    }
    handleBack(e) {
        e.stopPropagation()
        this.props.history.goBack()
    }

    handleSubmit(auth, e) {
        e.preventDefault()
        const fileInfo = this.state.fileInfo;
        if (fileInfo) {
            const strArr = fileInfo.name.split('.');
            const type = strArr[strArr.length - 1];
            if (type === 'tar' || type === 'zip') {
                this.uploadApp(auth, fileInfo,type)
            } else { 
                alert('请上传zip或者tar结尾的文件')
            }
           
        } else { 
            alert('文件为空')
        }
       
    }

    async uploadApp(auth, fileInfo,type) {
        const sid = auth.sid;
        const userType = auth.userType;
        const tempFileId = await G.api.opentempfile(sid);
        console.log('临时Id',tempFileId);
     
        // await G.api.setlfiledata(sid, tempFileId, 0, await this.readBlob(fileInfo))
        this.setState( {
            index: 0,
            indexStae:true
        });
        let t=await this._uploadTempFile(sid, tempFileId, await this.readBlob(fileInfo), (index) => { 
            this.setState( {
                index: (index*0.9) | 0,
            });
        })
       
        let timer = setInterval(() => { 
            if (this.state.index==100) { 
                clearInterval(timer)
                this.setState( {
                    indexStae:false
                });
            } else {
                this.setState( {
                    index: this.state.index+1,
                });
            }
           
        }, t / 10);
        const fileid = await G.api.temp2lfile(sid,tempFileId)
        const appid = await G.api.uploadapp(sid, fileid,type)
        this.setState({ content: '上传新的应用' });
        if (userType === "admin") { 
           
           await this.saveFileData(sid, auth.user.id, {name:fileInfo.name,fileId:fileid,describe:this.fileDescribe.value||'这个是'+fileInfo.name+'的源文件!'});
            this.fileDescribe.value = '';
        }
        this.props.getLeftAppData();
        this.props.onDel();
       
    }
    async saveFileData(sid, userid, fileConent) { //将应用文件id存到数据库
        const fileId = fileConent.fileId;
        fileConent = JSON.stringify(fileConent);
        await G.api.hset(sid,userid, '__H_File_ID__',userid+'#'+fileId ,fileConent); 
    }
    onFileChange() {
        const fileInfo = this.fileInput.files[0];
        this.setState({content:fileInfo.name});
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
    async _uploadTempFile (sid,tempFileId, typedArray, percentCallback) {
        const fileSize = typedArray.byteLength // B
        const t = fileSize / 8/ (1024*1024) * 1000
        const step = fileSize / 100;
        for (let i = 0; i < 100; i ++) {
            const dataNeedSend = typedArray.slice(i*step, step*(i+1))
             await G.api.setlfiledata(sid, tempFileId, i*step, dataNeedSend)
          if (percentCallback) {
            percentCallback(i)
          }
        }
        return t;
    }
    
    render() {
        const styles = CreateModal.styles;
        const fileInfo = this.state.fileInfo;
        console.log("gggg===>",this.state.fileInfo);
       
        const fileItem = fileInfo ? ( <div style={styles.item}>
            <div style={styles.right}>
                <div style={styles.rightLeft}>
                    <div>
                        <img src={require('./img/ico-app.png')} alt=""/>
                    </div>
                    <DIV style={styles.rightLeftMain}>
                        <div style={styles.title}>{fileInfo ? fileInfo.name : null}</div>
                        <input style={styles.describe} ref={input=>this.fileDescribe=input} type="text" placeholder='添加描述'/>
                    </DIV>
                </div>
                <div style={styles.button} >
                    <Button  onClick={this.handleSubmit.bind(this, this.props.auth)}>
                        <span>发布</span>
                    </Button>
                </div>
            </div>
        </div>): null;
        return (
                <div style={styles.background}  >
                    <div style={styles.header}>我的上传</div>
                    <div style={styles.line}></div>
                    {fileItem}
                    <div style={this.state.indexStae ? { position: 'absolute', zIndex: '999', top: '0', left: '0',display:'flex',justifyContent:'center',alignItems:'center', width: '100%', height: '100%',textAlign:'center', background: 'rgba(0,0,0,0.2)' } : {display:'none'}}>
                        <span style={{position: 'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',fontSize:'18px',fontWeight:'bold'}}>{this.state.index}%</span>
                            <Rotate></Rotate>
                    </div>
               </div>
          )
        }
    }
    
CreateModal.styles = {
    background: {
        overflow: 'hidden',
        overflowY:'auto',
        padding:'33px 50px 33px 50px',
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
    item: {
        overflow:'hidden',
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
    },
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
    &:hover{
        color:#ffffff;
        background-color: #019f57;
    };
`
const DIV = styled.div`
        &>input{
            outline:none;
            &::-webkit-input-placeholder{
                fontSize:20px;
                color:#8a8f99;
            }
        }
`
export default  props => (
    <AuthContext.Consumer>
         {auth => <CreateModal {...props} auth={auth}/>}
    </AuthContext.Consumer>
  );