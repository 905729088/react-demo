import React from 'react';
export default class SetDomain extends React.Component{
    constructor(props){
        super(props)
        this.onYes=this.onYes.bind(this);
    }
   async onYes(){
        const sid = sessionStorage.getItem('current_sid');
        const Appinfo=await G.api.getvar(sid, "appinfo",this.props.appName);
        const info={
            app:this.props.appName,
            ver:'last',
            author:Appinfo.author
        }
       
    //    //设置
    //    G.api.setdomain(sid,'mytest.c1n',info,()=>{
    //     console.log('ok');
    // },(name,err)=>{
    //     console.log('删除失败',err);
    // });
       //查看
        
       G.api.showdomain(sid,(data)=>{
        console.log('ok',data);
    },(name,err)=>{
        console.log('修改失败',err);
    });
        //删除
        // G.api.deldomain(sid,'mytest.c1n',()=>{
        //     console.log('ok');
        // },(name,err)=>{
        //     console.log('修改失败',err);
        // });
    }
    render(){
        return (<div>
            <input type='text' ref={input=>this.input=input}/>
            <div onClick={this.onYes}>确定</div>
        </div>)
    }
}