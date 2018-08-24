import React from 'react'
import { HLayout,VLayout } from '../ACommon/Layout.jsx'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { G } from './../ACommon/Api.js';
import { onLogin } from './../ACommon/action/index.js'
import AuthContext from '../../auth-context.js'
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            password: '',
            wHeight:0
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }
    componentDidMount() {
        const msg = JSON.parse(sessionStorage.getItem('current_pass'));
        if (msg) { 
            this.onLogin(this.props.auth.login,msg.name,msg.pass);
        }
     //让第一个界面充满屏幕
     this.setState({ wHeight: window.innerHeight })
     //获取屏幕高度
        window.onresize = () => { this.setState({ wHeight: window.innerHeight }); console.log('123');};
    }
    componentWillUnmount() { 
        window.onresize = null;
    }
    handleInputChange(e) {
        const value = e.target.value
        const name = e.target.name
        this.setState({
            [name]: value
        })
    }

    handleSubmit(login, e) {
        e.preventDefault()
        const name = this.state.name
        const pass = this.state.password
        this.onLogin(login,name,pass);
    }
    onLogin(login,name,pass) { 
       
        if (name && pass) {
            G.api.login(name, pass, 'byname').then(user => {
                this.props.dispatch(onLogin(name,pass,user));//redux数据更换
                login(user);//上下文登录状态改变
            }).catch((err) => {
                console.error(err)
                alert('用户名或密码错误！')
            })
        } else {
            alert('用户名或密码不能为空！')
        }
    }
    render() {
        const styles = Login.styles;
        return (
         <Background style={styles.background} height={this.state.wHeight}>
                <form onSubmit={this.handleSubmit.bind(this,this.props.auth.login)}>
                    <VLayout style={styles.loginForm}>
                            <div style={styles.loginHeader}>
                                <p>登录</p>
                            </div>
                            <div style={styles.loginFormItem}>
                                <div style={styles.loginFormItemHeader}>用户名</div>
                                <input style={styles.loginFormItemInput} placeholder='输入用户名' type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                            </div>
                            <div style={styles.loginFormItem}>
                                <div style={styles.loginFormItemHeader} >密码</div>
                                <div><input style={styles.loginFormItemInput} placeholder='输入密码' type="password" name="password" value={this.state.password} onChange={this.handleInputChange} /></div>
                                <div style={styles.loginFormItemForget}>
                                    <span>忘记密码？</span>
                                </div>
                            </div>
                            <div style={styles.loginFormItem}>
                                <input style={styles.loginFormItemSubmit} type="submit" value="登陆" />
                            </div>
                        </VLayout>
                    </form>
            </Background>
        )
    }
}

export default  props => (
    <AuthContext.Consumer>
         {auth => { 
                return auth.isAuthenticated ? <Redirect to={{ pathname: "/home" }} />
                    :
                 <Login {...props} auth={auth}/>
            }}
    </AuthContext.Consumer>
  );
Login.styles = {
    background: {
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#071A32',
        minHeight:'800px'
    },
    loginHeader: {
        fontSize: '28px',
        textAlign:'center'
    },
    loginForm: {
        padding:'20px 45px',
        width:' 484px',
        height: '464px',
        border:'1px solid #BBBBBB',
        boxShadow: '0px 3px 5px 0px rgba(13, 160, 86, 0.27)',
        boxSizing: 'border-box',
        backgroundColor:'#ffffff'
    },
    loginFormItem: {
        position:'relative',
        marginTop: '30px',
        width:'100%',
    },
    loginFormItemHeader: {
        textAlign: 'left',
        fontSize: '22px',
        fontWeight:'bold'
    },
    loginFormItemInput: {
        marginTop:'20px',
        height: '50px',
        width:'100%',
        textAlign: 'left',
        fontSize: '20px',
        textIndent: '15px',
        color:'#AAAAAA',
        border:'1px solid #BBBBBB',
    },
    loginFormItemForget: {
        marginTop:'10px',
        display: 'flex',
        justifyContent: 'end-start',
        lineHeight:'14px'
    },
    loginFormItemForgetBox: {
        width: '15px',
        height:'15px'
    },
    loginFormItemSubmit: {
        height:'50px',
        width: '100%',
        backgroundColor: '#0da056',
        fontSize: '20px',
        fontWeight:'bold',
        lineHeight: '50px',
        textAlign: 'center',
        color: '#ffffff',
        borderRadius:'4px'
    },
}
const Background = styled.div.attrs({
    height:props=>props.height+'px'
})`
    width:100%;
    height:calc(${props => props.height} - 1.4rem);
`;