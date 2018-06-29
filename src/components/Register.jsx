import React from 'react'
import { HLayout, VLayout } from './Layout.jsx'
import AuthContext from '../auth-context.js'

import { Redirect } from 'react-router-dom'

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            pass: '',
            repass: '',
            email: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(e) {
        const value = e.target.value
        const name = e.target.name
        this.setState({
            [name]: value
        })
    }
    handleSubmit(e) {
        console.log('state',this.state)
        e.preventDefault()
    }
    render() {
        const styles = Register.styles;
        return (<AuthContext.Consumer>
            {auth => {
                return auth.isAuthenticated ? <Redirect to={{ pathname: "/home" }} />
                    :
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <VLayout style={styles.RegisterForm}>
                                <div style={styles.RegisterFormItem}>
                                    <div  style={styles.RegisterFormItemHeader}>用户名</div>
                                    <input style={styles.RegisterFormItemInput} placeholder='输入用户名' type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                                </div>
                                <div  style={styles.RegisterFormItem}>
                                    <div  style={styles.RegisterFormItemHeader}>邮箱</div>
                                    <input style={styles.RegisterFormItemInput} placeholder='输入邮箱' type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                                </div>
                                <div  style={styles.RegisterFormItem}>
                                    <div  style={styles.RegisterFormItemHeader}>密码</div>
                                   <input style={styles.RegisterFormItemInput} placeholder='输入密码' type="password"  name="pass" value={this.state.pass} onChange={this.handleInputChange} />
                                </div>
                                <div  style={styles.RegisterFormItem}>
                                    <div  style={styles.RegisterFormItemHeader}>确认密码</div>
                                    <input style={styles.RegisterFormItemInput} placeholder='确认密码' type="password"  name="repass" value={this.state.repass} onChange={this.handleInputChange} />
                               </div>
                                <div  style={styles.RegisterFormItem}>
                                    <input  style={styles.RegisterFormItemSubmit} type="submit" value="立即注册" />
                               </div>
                            </VLayout>
                        </form>
                    </div>
            }}
        </AuthContext.Consumer>)
    }
}
Register.styles = {
    RegisterForm: {
        margin: '100px auto',
        padding:'20px 45px 50px 45px',
        width:' 650px',
        border:'1px solid #BBBBBB',
        boxShadow: ' rgb(227, 233, 236) 0px 0px 4px 1px',
        boxSizing:'border-box'
    },
    RegisterFormItem: {
        marginTop: '30px',
        width:'100%',
    },
    RegisterFormItemHeader: {
        textAlign: 'left',
        fontSize: '22px',
        fontWeight:'bold'
    },
    RegisterFormItemInput: {
        marginTop:'20px',
        height: '50px',
        width:'100%',
        textAlign: 'left',
        fontSize: '20px',
        textIndent: '15px',
        color:'#AAAAAA',
        border:'1px solid #BBBBBB',
    },
    RegisterFormItemSubmit: {
        height:'50px',
        width: '100%',
        backgroundColor: '#AAAAAA',
        fontSize: '20px',
        fontWeight:'bold',
        lineHeight: '50px',
        textAlign:'center'
    }
}