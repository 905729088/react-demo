import React from 'react';
import { G } from '../ACommon/Api';
export default class UpLoad extends React.Component{
    constructor(props){
        super(props);
        this.state={
            file:''//上传的文件
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.onRelease = this.onRelease.bind(this);
    }
   async componentDidMount () {
     
   }
    //上传文件
    onFileChange() {
        const file = this.fileInput.files[0];
        this.setState({file});
        //his.props.dispatch(CreateModelFile_DATA(file));
    }
   async onRelease() { 
        
       
       console.log(this.props.sid,this.props.appName,this.state.file.name);
       //return;
       const istrue = window.confirm('您确定要上传这个文件？');
       if (istrue) {
           if (this.state.file === '') { 
               alert('上传文件不能为空');
               return;
           }
           const sid = this.props.sid;
           const appName = this.props.appName
           const ver=this.props.appVer
           const fileid = await G.api.openTempFile(sid);
           await G.api.setLFileData(sid, fileid, 0,await this.readBlob(this.state.file)) 
           const fileid2 = await G.api.temp2LFile(sid,fileid)
           await G.api.uploadAppFile(sid, appName, this.state.file.name, fileid2);
           this.setState({file:''});
           this.props.upLoad();
           this.props.onShow();
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
   
    render() {
        const styles=UpLoad.styles;
        return (<div style={styles.background}>
            <div style={styles.center}>
                <div style={styles.header}>新上传的文件</div>
                <div style={styles.line}></div>
                <div style={styles.item}>
                    
                    <div style={styles.itemHeader}>
                        <span>上传的文件：</span>
                        <span>{this.state.file.name}</span>
                    </div>
                    <div style={styles.bottom}>
                        <div style={styles.button} onClick={() => { console.log("12123") }}>
                            <label htmlFor="getSinglefile" style={{display:'block',width:'100%',height:'100%'}}>
                                    上传
                            </label>
                            <input id='getSinglefile' type="file" style={{ display: 'none' }} onChange={this.onFileChange} ref={input => {this.fileInput = input}} />
                        </div>
                        <div style={styles.button} onClick={this.onRelease}>发布</div>
                    </div>
                    
                </div>
                <img style={styles.close} onClick={this.props.onShow} src={require('./img/close.png')} alt=""/>
            </div>
        </div>)
    }
}
UpLoad.styles = {
    background: {
        position: 'fixed',
        top: '0px',
        left:'0px',
        width: '100%',
        height: '100%',
        backgroundColor:'rgba(0,0,0,0.1)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }, center:{
        position: 'relative',
        width:'556px',
        paddingBottom:'30px',
        backgroundColor:'#ffffff',
        boxShadow: '0px 6px 9px 0px rgba(34, 34, 34, 0.04)',
        borderRadius: '4px'
    }, header: {
        padding:'25px 30px 0px 30px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#22272f',
    },
    line: {
        marginTop:'20px',
        width: '100%',
        height:'1px',
        backgroundColor:'#E7E8EC'
    },item:{
        margin:'25px 30px 0px 30px',
    },itemHeader:{
        fontSize:'12px',
        color: '#22272f'
    },
    bottom: {
        display: 'flex',
        marginTop:'20px',
        justifyContent:'flex-start'
    }
    ,button: {
        marginRight:'20px',
        width: '100px',
	    height: '36px',
	    backgroundColor: '#019f57',
	    borderRadius: '4px',
        textAlign:'center',
        lineHeight:'36px',
        color:'#ffffff',
        cursor:'pointer'
    },close:{
        position:'absolute',
        right:'10px',
        top:'10px',
        cursor:'pointer'
    }
}
