import React from 'react'
import { HLayout, VLayout } from '../ACommon/Layout.jsx'
import AuthContext from '../../auth-context.js'

import { Redirect } from 'react-router-dom'
import styled from 'styled-components';
export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wHeight:0
        }
     
    }
    componentDidMount() {
     //让第一个界面充满屏幕
     this.setState({ wHeight: window.innerHeight })
     //获取屏幕高度
        window.onresize = () => { this.setState({ wHeight: window.innerHeight })};
    }
    componentWillUnmount() { 
        window.onresize = null;
    }
    render() {
        const styles = Register.styles;
        return (<AuthContext.Consumer>
            {auth => {
                return auth.isAuthenticated ? <Redirect to={{ pathname: "/home" }} />
                    :
                    <Background  style={styles.background} height={this.state.wHeight}> 
                        <div  style={styles.center}>
                            <div style={{fontSize: '22px',fontWeight:'bold'}}>欢迎参加内侧</div>
                            <img style={{marginTop:'30px'}} src={require('./img/QRcode.png')} alt="" />
                            <p style={{marginTop:'20px',fontSize:'14px',color:'#222'}}>欢迎加入我们，Leither OS 内测群</p>
                    </div>
                    
                    </Background>
            }}
        </AuthContext.Consumer>)
    }
}
Register.styles = {
    background: {
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#071A32',
        minHeight:'800px'
    }, center: {
        padding: '40px 40px 60px',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems:'center',
        width:' 432px',
        border:'1px solid #BBBBBB',
        boxShadow: '0px 3px 5px 0px rgba(13, 160, 86, 0.27)',
        boxSizing: 'border-box',
        backgroundColor:'#ffffff'
    }
}
const Background = styled.div.attrs({
    height:props=>props.height+'px'
})`
    width:100%;
    height:calc(${props => props.height} - 1.4rem);
`;