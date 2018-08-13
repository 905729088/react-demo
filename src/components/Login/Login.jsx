import React from 'react'
import { HLayout,VLayout } from '../ACommon/Layout.jsx'
import AuthContext from '../../auth-context.js'
import { Redirect } from 'react-router-dom'
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    componentDidMount() {
        const msg = JSON.parse(sessionStorage.getItem('current_pass'));
        if (msg) { 
            this.onLogin(this.props.auth.login,msg.name,msg.pass);
        }
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
        sessionStorage.setItem('current_pass', JSON.stringify({name:name,pass:pass}));
        if (name && pass) {
            G.api.login(name, pass, 'byname').then(user => {
                login(user)
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
            <div style={styles.background}>
                        <VLayout style={styles.center}>
                        <form onSubmit={this.handleSubmit.bind(this, this.props.auth.login)}>
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
                </VLayout>
                    </div>
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
        overflow:'hidden',
        width: '100%',
    },
    center: {
        margin:'160px auto 0',
        width: '486px',
    },
    loginHeader: {
        fontSize: '28px',
        textAlign:'center'
    },
    loginForm: {
        marginTop: '45px',
        padding:'20px 45px',
        width:' 484px',
        height: '464px',
        border:'1px solid #BBBBBB',
        boxShadow: ' rgb(227, 233, 236) 0px 0px 4px 1px',
        boxSizing:'border-box'
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
        backgroundColor: '#1FA0FE',
        fontSize: '20px',
        fontWeight:'bold',
        lineHeight: '50px',
        textAlign: 'center',
        color:'#ffffff'
    },
}