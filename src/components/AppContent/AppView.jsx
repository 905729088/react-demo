import React from 'react';
export default class AppView extends React.Component{
    constructor(props){
        super(props);
        this.state = {ip:null};
    }
    componentDidMount() {
        const ip = this.props.ip;
        this.setState({ip})
    }
    
    render(){
        const styles = AppView.styles;
        console.log('===>',this.state.ip);
        return (<div style={styles.background}>
            <div style={{ position: 'relative' }}>
                <img onClick={this.props.onClickCloseView} style={{position:'absolute',right:'0px',top:'0px',cursor:'pointer'}} src={require('./img/close.png')} alt=""/>
                <iframe style={styles.main} src={this.state.ip} frameBorder="0"></iframe>
            </div>
        </div>)
    }
}
AppView.styles={
    background:{
        position:'fixed',
        zIndex:'99999',
        top:'0',
        left:'0',
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    main: {
        width: '800px',
        height: '600px',
        background:'#ffffff'
    }
}