import React from 'react'
import { HLayout,VLayout } from '../Layout.jsx'
import AuthContext from '../../auth-context.js'
import { Redirect } from 'react-router-dom'
import Footer from '../Footer.jsx';
import styled from 'styled-components';
import Waves from './Waves.jsx'
class Introduce extends React.Component{
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
            this.onIntroduce(this.props.auth.login,msg.name,msg.pass);
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
        this.onIntroduce(login,name,pass);
    }
    onIntroduce(login, name, pass) { 
        if (name&&pass) { 
            sessionStorage.setItem('current_pass', JSON.stringify({name:name,pass:pass}));
        }
       
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
        const styles = Introduce.styles;
        return (
            <div style={styles.background}>
                        <VLayout style={styles.center}>
                            <div style={styles.loginHeader}>
                            <p>为前端程序员打造</p>
                            </div>   
                            <div style={styles.loginHeaderDescribe}>
                                <p>3分钟，几步简单的操作，掌握整个团队的开发技术。有兴趣欢迎内测......</p>
                            </div>
                            <form onSubmit={this.handleSubmit.bind(this, this.props.auth.login)}>
                                <HLayout style={styles.loginForm}>
                                    <div style={styles.loginFormItem}>
                                        <HLayout style={styles.loginFormItemText}>
                                            <i style={styles.loginFormItemUser}></i>
                                        </HLayout>
                                            <MyInput style={styles.loginFormItemInput}  type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder='用户名' />
                                        </div>
                                    <div style={styles.loginFormItem}>
                                        <HLayout style={styles.loginFormItemText} >
                                            <i style={styles.loginFormItemPass}></i>
                                       </HLayout>
                                        <div><MyInput style={styles.loginFormItemInput}  type="password" name="password" value={this.state.password} onChange={this.handleInputChange}  placeholder='密码' /></div>
                                    </div>
                                    <div style={styles.loginFormItemLast}>
                                        <input id='IntroduceSubmit' style={styles.loginFormItemSubmit} type="submit" value="" />
                                        <label htmlFor="IntroduceSubmit" style={styles.loginFormItemSubmitC}>
                                            <span style={styles.loginFormItemSubmitL}>立即登录</span>
                                            <i style={styles.loginFormItemSubmitJ}></i>
                                        </label>
                                     </div>
                                </HLayout>
                            </form>
                            <HLayout style={styles.loginDescribe}>
                                <HLayout style={styles.loginDescribeItem}>
                                    <div style={styles.loginDescribeItemLeftDeploy}></div>
                                    <div style={styles.loginDescribeItemRight}>
                                        <div style={styles.loginDescribeItemRightTop}>快速部署</div>
                                        <div style={styles.loginDescribeItemRightBottom}>操作便捷，快速简单</div>
                                    </div>
                                 </HLayout>
                                <HLayout style={styles.loginDescribeItem}>
                                    <div style={styles.loginDescribeItemLeftEdit}></div>
                                    <div style={styles.loginDescribeItemRight}>
                                        <div style={styles.loginDescribeItemRightTop}>在线编辑</div>
                                        <div  style={styles.loginDescribeItemRightBottom}>在线编辑代码，一键发布</div>
                                  </div>
                               </HLayout>
                                <HLayout style={styles.loginDescribeItem}>
                                    <div style={styles.loginDescribeItemLeftSafe}></div>
                                    <div style={styles.loginDescribeItemRight}>
                                        <div style={styles.loginDescribeItemRightTop}>安全稳定</div>
                                        <div style={styles.loginDescribeItemRightBottom}>代码安全，运行稳定</div>
                                    </div>
                                </HLayout>
                            </HLayout>
                        </VLayout>
                     <Waves></Waves>
                    <Footer/>
                    </div>
        )
    }
}

export default  props => (
    <AuthContext.Consumer>
         {auth => { 
                return auth.isAuthenticated ? <Redirect to={{ pathname: "/home" }} />
                    :
                 <Introduce {...props} auth={auth}/>
            }}
    </AuthContext.Consumer>
  );

Introduce.styles = {
    background: {
        position: 'relative',
        height:'100%',
    },
   
    center: {
        position: 'absolute',
        zIndex:'1',
        left: '50%',
        transform:'translateX(-50%)',
    },
    loginHeader: {
        marginTop:'20%',
        fontSize: '50px',
        fontWeight:'bold',
        textAlign:'center'
    },
    loginHeaderDescribe: {
        marginTop:'20px',
        fontSize: '16px',
        textAlign: 'center',
        color: '#828ea1'
    },
    loginForm: {
        marginTop: '45px',
        padding:'10px 13px 5px 13px',
        border:'1px solid #dcdee0',
        boxShadow: '0px 8px 9px 0px rgba(34, 34, 34, 0.03)',
        boxSizing: 'border-box',
        borderRadius: '4px'
    },
    loginFormItem: {
        position:'relative',
        marginRight: '14px',
        width:'366px',
    },
    loginFormItemLast: {
        position:'relative',
        width:'245px',
    },
    loginFormItemText: {
        position: 'absolute',
        left: '24px',
        top:'15px',
        textAlign: 'left',
        fontSize: '16px',
        color:'#22272f'
    },
    loginFormItemUser: {
        display: 'block',
        marginRight:'10px',
        width: '21px',
        height:'24px',
        background:`url('${require('../../img/ico-user.png')}') no-repeat 100%/100%`
    },
    loginFormItemPass: {
        display: 'block',
        margin:'2px 10px 0 0',
        width: '20px',
        height:'23px',
        background:`url('${require('../../img/ico-pass.png')}') no-repeat 100%/100%`
    },
    loginFormItemInput: {
        height: '58px',
        paddingLeft:'55px',
        width:'100%',
        textAlign: 'left',
        lineHeight:'58px',
        fontSize: '20px',
        color:'#22272f',
        border: '1px solid #BBBBBB',
        boxSizing: 'border-box',
        boxShadow:'inset 0px 2px 3px 0px rgba(0, 0, 0, 0.03)',
	    borderRadius: '4px',
        border: 'solid 1px #dcdee0',
        outline: 'none',
        backgroundColor:'#fff'
    },
    loginFormItemSubmit: {
        height:'58px',
        width: '100%',
        backgroundColor: '#00afff',
        lineHeight: '58px',
        borderRadius: '4px',
       
    },
    loginFormItemSubmitC: {
        position: 'absolute',
        top:'0',
        width: '100%',
        height: '100%',
        display:'flex',
        alignItems: 'center',
        justifyContent:'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#fff',
        cursor:'pointer'
    },
    loginFormItemSubmitJ: {
        display: 'block',
        marginTop: '2px',
        height:'52px',
        width: '32px',
        background:`url('${require('../../img/ico-arrow.png')}') no-repeat 100%/100%`
    },
    loginFormItemSubmitL: {
        marginLeft: '-10px',
        paddingRight: '10px',
        fontSize:'22px',
        fontWeight:'normal'
    },
    loginDescribe: {
        justifyContent:'space-between',
        marginTop: '55px',
        width:'100%'
    },
    loginDescribeItem: {
        width:'200px'
    },
    loginDescribeItemLeftDeploy: {
        width: '64px',
        height: '65px',
        background:`url('${require('../../img/ico-deploy.png')}') no-repeat 100%/100%`
    },
    loginDescribeItemLeftEdit: {
        width: '64px',
        height: '65px',
        background:`url('${require('../../img/ico-edit.png')}') no-repeat 100%/100%`
    },
    loginDescribeItemLeftSafe: {
        width: '64px',
        height: '65px',
        background:`url('${require('../../img/ico-safe.png')}') no-repeat 100%/100%`
    },
    loginDescribeItemRight: {
        marginLeft:'5px',
        paddingTop:'10px'
    },
    loginDescribeItemRightTop: {
        fontSize: '18px',
        fontWeight:'bold'
     },
     loginDescribeItemRightBottom: {
         fontSize: '14px',
         color: '#828ea1'
      }
}

const MyInput = styled.input`
        &::-webkit-input-placeholder{
            fontSize:20px;
            color:#22272f;
        }
`