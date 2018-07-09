import React from 'react'
import { HLayout,VLayout } from './Layout.jsx'
import AuthContext from '../auth-context.js'
import { styled } from 'styled-components';
import { Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';
export default class Login extends React.Component{
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
           // this.onLogin(login,name,pass);
        }
       console.log('======>',msg)
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
        return(<AuthContext.Consumer>
            {auth => { 
                return auth.isAuthenticated ? <Redirect to={{ pathname: "/home" }} />
                    :
                    <div style={styles.background}>
                        <VLayout style={styles.center}>
                            <div style={styles.loginHeader}>
                                <p>登录到xx云平台</p>
                            </div>
                            <form onSubmit={this.handleSubmit.bind(this, auth.login)}>
                                <VLayout style={styles.loginForm}>
                                    <div style={styles.loginFormItem}>
                                        <div style={styles.loginFormItemHeader}>用户名</div>
                                        <input style={styles.loginFormItemInput} placeholder='输入用户名' type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                                    </div>
                                    <div style={styles.loginFormItem}>
                                        <div style={styles.loginFormItemHeader} >密码</div>
                                        <div><input style={styles.loginFormItemInput} placeholder='输入用户名' type="password" name="password" value={this.state.password} onChange={this.handleInputChange} /></div>
                                        <div style={styles.loginFormItemForget}>
                                            <input ref={checkbox=>this.checkbox=checkbox} style={styles.loginFormItemForgetBox} type="checkbox" />
                                            <span>记住密码</span>
                                        </div>
                                    </div>
                                    <div style={styles.loginFormItem}>
                                        <input style={styles.loginFormItemSubmit} type="submit" value="登陆" />
                                    </div>
                                </VLayout>
                            </form>

                        </VLayout>
                    </div>
            }}
        </AuthContext.Consumer>)
    }
}



Login.styles = {
    background: {
        position:'relative',
    },
    center: {
        position: 'absolute',
        left: '50%',
        transform:'translateX(-50%)',
    },
    loginHeader: {
        marginTop:'160px',
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
        backgroundColor: '#AAAAAA',
        fontSize: '20px',
        fontWeight:'bold',
        lineHeight: '50px',
        textAlign:'center'
    }
}