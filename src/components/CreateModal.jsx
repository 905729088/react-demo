import React from 'react'
import AuthContext from '../auth-context.js'

export default class CreateModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleBack = this.handleBack.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleBack(e) {
        e.stopPropagation()
        this.props.history.goBack()
    }

    handleSubmit(auth, e) {
        e.preventDefault()
       // console.log('file---', this.fileInput.files[0])
        const sid = auth.sid
        const fileInfo = this.fileInput.files[0]
       
        this.uploadApp(sid, fileInfo)
    }

    async uploadApp(sid, fileInfo) {
        const tempFileId = await G.api.opentempfile(sid)
      //  console.log('tempFileId---', tempFileId,fileInfo)
        await G.api.setlfiledata(sid, tempFileId, 0, await this.readBlob(fileInfo))
        console.log('1');
        const fileid = await G.api.temp2lfile(sid, tempFileId)
        console.log('2');
        const appid = await G.api.uploadapp(sid, fileid)
        console.log('3',appid);
        // const appInfo = await G.api.getvar(sid, 'appinfo', appid)
        // console.log('4');
        //console.log('appid', appid)
       // console.log('appInfo', appInfo)
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

    render() {
        const styles = CreateModal.styles
        return (<AuthContext.Consumer>
            {auth => (
                <div style={styles.modal}>
                    <form style={styles.content} onSubmit={this.handleSubmit.bind(this, auth)}>
                        <div style={styles.contentHeader}>新建应用</div>
                        <div style={styles.contentText}>
                            <textarea style={styles.contentTextConent} />
                        </div>
                        <div style={styles.contentFile}>
                            <label htmlFor="getfile" style={styles.contentFileMain}>上传</label>
                            <input id='getfile' type="file" style={{display:'none'}} ref={input => {this.fileInput = input}} />
                        </div>
                        <div style={styles.contentSubmit}>
                            <div  style={styles.contentSubmitH}  onClick={this.handleBack}>返回</div>
                            <input style={styles.contentSubmitF} type="submit" value="发布" />
                        </div>
                    </form>
                </div>
            )}
        </AuthContext.Consumer>)
        }
    }
    
CreateModal.styles = {
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)",
    },
    content: {
        position: "absolute",
        width:'930px',
        background: "#fff",
        top:'130px',
        left: "50%",
        right: "10%",
        transform:'translateX(-50%)',
        padding: '15px 15px 100px 50px',
        border: "2px solid #444",
        borderRadius:'6px'
    },
    contentHeader: {
      marginTop:'30px',
      fontSize:'28px'
    },
    contentText: {
        marginTop:'20px',
        width: '680px',
        height: '280px',
        fontSize:'28px'
    },
    contentTextConent: {
        width: '100%',
        height: '100%',
        fontSize:'18px',
        resize:'none',
    },
    contentFile: {
        marginTop:'20px',
        width: '100%',
    },
    contentFileMain: {
        display:'block',
        height:'85px',
        width: '185px',
        lineHeight: '85px',
        fontSize: '18px',
        fontWeight:'bold',
        textAlign:'center',
        border:'1px dashed #BBBBBB'
    },
    contentSubmit: {
        marginTop: '20px',
        height:'50px'
    },
    contentSubmitH: {
        float: 'left',
        marginRight:'45px',
        width: '190px',
        height: '50px',
        border: '1px solid #BBBBBB',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '50px',
        borderRadius:'6px'
    },
    contentSubmitF: {
        float:'left',
        width: '190px',
        height: '50px',
        border: '1px solid #BBBBBB',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '50px',
        borderRadius: '6px',
        backgroundColor: '#AAAAAA',
        color:'#ffffff'
      }
}