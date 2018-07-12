import React from 'react'
import AuthContext from '../auth-context.js'
import { HLayout } from './Layout.jsx';
export default class CreateModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {content:'上传新的应用'};
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
       // console.log('file---', this.fileInput.files[0])
       
        const sid = auth.sid
        const fileInfo = this.fileInput.files[0];
        if (this.state.content!=='上传新的应用') { 
            this.uploadApp(sid, fileInfo)
        }
       
    }

    async uploadApp(sid, fileInfo) {
        const tempFileId = await G.api.opentempfile(sid)
      //  console.log('tempFileId---', tempFileId,fileInfo)
        await G.api.setlfiledata(sid, tempFileId, 0, await this.readBlob(fileInfo))
        const fileid = await G.api.temp2lfile(sid, tempFileId)
        const appid = await G.api.uploadapp(sid, fileid)
        this.setState({ content: '上传新的应用' });
        console.log('更新');
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

    render() {
        const styles = CreateModal.styles;
        const content = this.state.content;
        return (<AuthContext.Consumer>
            {auth => (
                <div>
                    <form style={styles.content} onSubmit={this.handleSubmit.bind(this, auth)}>
                        <div style={styles.contentFile}>
                            <label htmlFor="getfile" style={styles.contentFileMain}>{content}</label>
                            <input id='getfile' type="file" style={{ display: 'none' }} onChange={this.onFileChange} ref={input => {this.fileInput = input}} />
                        </div>
                        <input style={styles.contentSubmitF} type="submit" value="发布" onClick={this.props.onClick} />
                    </form>
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
        marginRight:'37px',
        width: '242px',
    },
    contentFileMain: {
        display:'block',
        height:'68px',
        width: '242px',
        lineHeight: '68px',
        fontSize: '18px',
        fontWeight:'bold',
        textAlign: 'center',
        borderRadius: '4px',
        border:'1px dashed #BBBBBB'
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
        borderRadius: '6px',
        backgroundColor: '#00afff',
        color:'#ffffff'
      }
}