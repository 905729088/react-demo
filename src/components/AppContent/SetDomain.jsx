import React from 'react';
import { G } from './../ACommon/Api';
export default class SetDomain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nowInnerNetwork:null,//当前子域名
            isNowInnerNetwork:true,//是否可用设置子域名
            nowOutNetwork:null,//当前外网的域名
            isNowOutNetwork:true//是否可用设置外网域名
        }
        this.onSetInnerNetWork=this.onSetInnerNetWork.bind(this);
        this.onSetOutNetWork=this.onSetOutNetWork.bind(this);
    }
   async componentDidMount () {
        const sid=this.props.sid;
        const userId = this.props.userId;
        const DATA_ID=this.props.DATAID;
        const nowInnerNetwork=await G.api.hGet(sid,DATA_ID,'INNERNETWORK',userId+'#'+this.props.appName);
        const nowOutNetwork=await G.api.hGet(sid,DATA_ID,'OUTNETWORK',userId+'#'+this.props.appName);
        this.setState({nowInnerNetwork,nowOutNetwork});
   }

   async onSetInnerNetWork(){
        if(!this.state.isNowInnerNetwork){
            return;
        }
        this.setState({isNowInnerNetwork:false});
        const innerNetwork=this.innerNetwork.value;
        if(innerNetwork.length>15){
            const regExp=/vzhan.cn$/;
            const isTrue=regExp.test(innerNetwork)
           if(isTrue){
               const sid=this.props.sid;
               const userId = this.props.userId;
               const DATA_ID=this.props.DATAID;
               const isRepeat=await this.checkrepeat(sid,DATA_ID,'INNERNETWORK',innerNetwork);
               if(isRepeat){
                    this.setState({isNowInnerNetwork:true});
                    alert("域名已经存在");
                    return;
               }else{
                     //删除之前的域名
                    const oldInnerNetwork=await G.api.hGet(sid,DATA_ID,'INNERNETWORK',userId+'#'+this.props.appName);

                    if(oldInnerNetwork){
                        await G.api.delDomain(sid,oldInnerNetwork);
                    }
                    //设置域名
                    await G.api.hSet(sid,DATA_ID, 'INNERNETWORK',userId+'#'+this.props.appName,innerNetwork);//将域名存入
                    const Appinfo=await G.api.getVar(sid, "appinfo",this.props.appName);
                    const info={
                        app:this.props.appName,
                        ver:'last',
                        author:Appinfo.author
                    }
                    await G.api.setDomain(sid,innerNetwork,info,()=>{
                        alert('域名设置成功');
                        this.setState({nowInnerNetwork:innerNetwork,isNowInnerNetwork:true});
                        this.props.upDataDomain();
                        this.props.onShowSetDomain();
                        // console.log('');
                    },(name,err)=>{
                        console.log('域名设置失败',err);
                        this.setState({isNowInnerNetwork:true});
                        });
                    this.innerNetwork.value=null;
               }
              
           }else{
            alert('域名不规范');
            this.setState({isNowInnerNetwork:true});
           }
        }else{
            alert('域名长度不符合要求');
            this.setState({isNowInnerNetwork:true});
        }
    }
    async onSetOutNetWork(){
        const outNetwork=this.outNetwork.value;
        if(!this.state.isNowOutNetwork||!outNetwork){
            return;
        }
        this.setState({isNowOutNetwork:false});
       
       
        const regExp=/vzhan.cn$/;
        const isTrue=regExp.test(outNetwork);
        if(!isTrue){
            const sid=this.props.sid;
            const userId = this.props.userId;
            const DATA_ID=this.props.DATAID;
            const isRepeat=await this.checkrepeat(sid,DATA_ID,'OUTNETWORK',outNetwork);
            if(isRepeat){
                this.setState({isNowOutNetwork:true});
                alert("域名已经存在");
                return;
            }else{
                 //删除之前的域名
                const oldOutNetwork=await G.api.hGet(sid,DATA_ID,'OUTNETWORK',userId+'#'+this.props.appName);

                if(oldOutNetwork){
                    await G.api.delDomain(sid,oldOutNetwork);
                }
                //设置域名
                await G.api.hSet(sid,DATA_ID, 'OUTNETWORK',userId+'#'+this.props.appName,outNetwork);//将域名存入
                const Appinfo=await G.api.getVar(sid, "appinfo",this.props.appName);
                const info={
                    app:this.props.appName,
                    ver:'last',
                    author:Appinfo.author
                }
                await G.api.setDomain(sid,outNetwork,info,()=>{
                    alert('域名设置成功');
                    this.setState({ nowOutNetwork: outNetwork, isNowOutNetwork: true });
                    this.props.upDataDomain();
                    this.props.onShowSetDomain();
                    // console.log('');
                },(name,err)=>{
                    console.log('域名设置失败',err);
                    this.setState({isNowOutNetwork:true});
                    });
                this.outNetwork.value=null;
            }
           
        }else{
            this.setState({isNowOutNetwork:true});
            alert('域名不规范');
        }
    }
    async checkrepeat(sid,DATA_ID,key,setValue){
        let isRepeat=false;
        const AllData=await G.api.hGetAll(sid,DATA_ID, key);
        for(let i=0;i<AllData.length;i++){
            if(AllData[i].value===setValue){
                isRepeat=true;
                break;
            }else{
                isRepeat=false;
            }
        }
        return isRepeat;
    }
    render() {
        const styles=SetDomain.styles;
        return (<div style={styles.background}>
            <div style={styles.center}>
                <div style={styles.header}>设置域名</div>
                <div style={styles.line}></div>
                <div style={styles.item}>
                    <div style={styles.itemHeader}>设置在本网站的子域名。当前子域名：{this.state.nowInnerNetwork}</div>
                    <input style={styles.itemInput} type='text' ref={input=>this.innerNetwork=input} maxLength='35' />
                    <div style={styles.button} onClick={this.onSetInnerNetWork}>确认设置</div>
                </div>
                <div style={styles.item}>
                    <div style={styles.itemHeader}>设置外网域名。当前外网域名：{this.state.nowOutNetwork}</div>
                    <input style={styles.itemInput} type='text' ref={input=>this.outNetwork=input}/>
                    <div style={styles.button} onClick={this.onSetOutNetWork}>确认设置</div>
                </div>
                <img style={styles.close} onClick={this.props.onShowSetDomain} src={require('./img/close.png')} alt=""/>
            </div>
        </div>)
    }
}
SetDomain.styles = {
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
    },itemInput:{
        marginTop:'10px',
        border: 'solid 1px #d1d5da',
        height:'34px',
        width:'100%',
        borderRadius:'4px',
        outline:'none',
        textIndent:'10px'
    },button:{
        marginTop:'20px',
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
