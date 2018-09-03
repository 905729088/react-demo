import React from 'react'
import Sider from './Sider.jsx';
import Decon from './Decon.jsx'
export default class Demo extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
      }
    handleClick(){

    }
    render(){
        const styles = Demo.styles;
        return(
            <div style={styles.background}>
                   <Sider></Sider>
                   <Decon></Decon>
            </div>
        )
    }
}
Demo.styles={
    background: {
        overflow: 'hidden',
        overflowY:'auto',
        // padding:'33px 0px 33px 50px',
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
    deleft:{
        width:'15%',
        backgroundColor:'white',
        float:'left',
    },
    deright:{
        width:'85%',
        height:'500px',
        backgroundColor:'skyblue',
        float:'right'
    },
    leli:{
        // height:'40px',
        // backgroundColor:'blue',
        lineHeight:'40px',
        borderBottom:'1px solid #e7e8ec',
        textAlign:'center'
    }
}