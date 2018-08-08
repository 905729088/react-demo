import React from 'react'
import AuthContext from '../../../../auth-context.js'
import Rotate from './MyWait.jsx';
export default class CreateModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '上传新的应用',
            index: 0,
            indexStae:false
        };
        this.handleBack = this.handleBack.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onFileChange = this.onFileChange.bind(this);
    }

    handleBack(e) {
        e.stopPropagation()
        this.props.history.goBack()
    }

    handleSubmit(auth, e) {
        e.preventDefault()
        const fileInfo = this.fileInput.files[0];
        if (this.state.content!=='上传新的应用') { 
            this.uploadApp(auth, fileInfo)
        }
       
    }

    async uploadApp(auth, fileInfo) {
        const sid = auth.sid;
        const userType = auth.userType;
        const tempFileId = await G.api.opentempfile(sid);
        console.log('临时Id',tempFileId);
        const strArr = fileInfo.name.split('.');
        const type=strArr[strArr.length-1]
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
        
        this.props.onClick();
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
        const content = this.state.content;
      
        return (<AuthContext.Consumer>
            {auth => (
                <div>
                    <form style={styles.content} onSubmit={this.handleSubmit.bind(this, auth)}>
                        <div style={styles.contentFile}>
                            <label htmlFor="getfile" style={styles.contentFileMain}>
                                <img src={require('../../../../img/ico-add.png')} style={content === "上传新的应用"?styles.contentFileMainImg : styles.contentFileMainImgNo} alt="" />
                                <span> {content}</span>
                            </label>
                            <input id='getfile' type="file" style={{ display: 'none' }} onChange={this.onFileChange} ref={input => {this.fileInput = input}} />
                        </div>
                        <input style={auth.userType === "admin" ? styles.contentFileDescribe : {display:'none'}} type="text" ref={describe => {this.fileDescribe = describe}} placeholder='添加文件描述'/>
                        <input style={styles.contentSubmitF} type="submit" value="发布" />
                    </form>
                    <div style={this.state.indexStae ? { position: 'absolute', zIndex: '999', top: '0', left: '0',display:'flex',justifyContent:'center',alignItems:'center', width: '100%', height: '100%',textAlign:'center', background: 'rgba(0,0,0,0.2)' } : {display:'none'}}>
                        <span style={{position: 'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',fontSize:'18px',fontWeight:'bold'}}>{this.state.index}%</span>
                            <Rotate></Rotate>
                    </div>
                </div>
            )}
        </AuthContext.Consumer>)
        }
    }
    
CreateModal.styles = {
    content: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems:'center',
        width:'100%',
        background: "#fff",
        borderRadius:'6px'
    },
    contentFile: {
        marginRight:'21px',
        width: '320px',
    },
    contentFileMain: {
        display:'block',
        height:'68px',
        width: '320px',
        lineHeight: '68px',
        fontSize: '18px',
        textAlign: 'center',
        borderRadius: '4px',
        border:'1px dashed #BBBBBB'
    },
    contentFileDescribe: {
        display: 'block',
        padding:'0 20px',
        marginRight:'21px',
        height:'68px',
        width: '320px',
        lineHeight: '68px',
        fontSize: '18px',
        color:'#757575',
        textAlign: 'center',
        borderRadius: '4px',
        border: '1px dashed #BBBBBB',
        outline:'none'
    },
    contentFileMainImg: {
        marginTop: '-5px', 
        verticalAlign: 'middle'
    },
    contentFileMainImgNo: {
        display:'none'
    },
    contentSubmitF: {
        float:'left',
        width: '88px',
        height: '40px',
        border: '1px solid #0084c1',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '40px',
        borderRadius: '4px',
        backgroundColor: '#00afff',
        color:'#ffffff'
      }
}