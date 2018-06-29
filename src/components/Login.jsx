import React from 'react'
import { HLayout,VLayout } from './Layout.jsx'
import AuthContext from '../auth-context.js'
import { styled } from 'styled-components';

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            password: ''
        }
        this.changeName = this.changeName.bind(this)
        this.changePass = this.changePass.bind(this)
    }
    changeName(event){
        this.setState({})
    }
    changePass(event) {
        this.setState({})
    }
    render() {
        const styles = Login.styles;
        return(<AuthContext.Consumer>
            {auth => (
                <div style={styles.background}>
                    <VLayout style={styles.center}>
                        <div  style={styles.loginHeader}>
                            <p>登录到xx云平台</p>
                        </div>
                        <form>
                            <VLayout style={styles.loginForm}>
                                <div style={styles.loginFormItem}>
                                    <div style={styles.loginFormItemHeader}>用户名</div>
                                    <input style={styles.loginFormItemInput} placeholder='输入用户名' type="text" />
                                </div>
                                <div style={styles.loginFormItem}>
                                    <div style={styles.loginFormItemHeader} >密码</div>
                                    <div><input style={styles.loginFormItemInput} placeholder='输入用户名' type="password" /></div>
                                </div>
                                <div style={styles.loginFormItem}>
                                    <input style={styles.loginFormItemSubmit} type="submit" value="登陆" />
                                </div>
                            </VLayout>
                        </form>
                       
                    </VLayout>
                </div>
            )}
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