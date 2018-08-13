import React from 'react'
import AuthContext from '../../auth-context.js'
import { HLayout } from '../ACommon/Layout.jsx'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLogout: false };
        this.handleClick = this.handleClick.bind(this);
        this.changeState = this.changeState.bind(this);
    }
    handleClick() { 
        this.setState({ isLogout:!this.state.isLogout})
    }
    changeState(auth) { 
        auth.logout();
        this.setState({ isLogout:false})
    }
    onClickLogin() { 
        
    }
    render() {
        const styles = Header.styles
        return (<AuthContext.Consumer>
            {auth => {
                const setDom = auth.isAuthenticated ? <div>
                    <div style={styles.userInfo} onClick={this.handleClick} >
                        <img width='20' height='20' style={{marginRight:'6px',verticalAlign:'middle'}} src={require('../../img/ico-login-user.png')} alt=""/>
                        <span style={{verticalAlign:'middle'}}>{auth.user.name}</span>
                    </div>
                </div> : <div style={styles.mainRight}>
                        <Link style={styles.mainRightLogin} to="/login">登录</Link>
                        <Link style={styles.mainRightReiser} to="/join">注册</Link>
                    </div>
                return (<div style={styles.background}>
                    <HLayout style={styles.main}>
                        <div style={styles.mainLeft}>
                            <img src={require('./img/li.png')} />
                            <img style={{marginLeft:'10px'}} src={require('./img/Leither.png')}/>
                        </div>
                        {setDom}
                        <div style={this.state.isLogout ? styles.mainMenu : {display:'none'}}>
                            <i style={styles.mainMenuT}></i>
                            <MyLogin style={styles.mainMenuItem} onClick={() => {this.changeState(auth)}}>登出</MyLogin>
                        </div>
                    </HLayout>
                    
                </div>)
            }}
        </AuthContext.Consumer>)
    }
}

Header.styles = {
    background: {
        position: 'absolute',
        paddingTop:'12px',
        minWidth: '1200px',
        width:'100%',
        zIndex:'10',
        fontSize: '0.46rem',
        color: '#101010',
    },
    main: {
        position:'relative',
        justifyContent: 'space-between',
        maxWidth: '100%',
        borderStyle: 'none',
        height: '1.4rem',
        margin: '0 1rem',
        alignItems: 'center',
    },
    mainLeft: {
        display:'flex',
        fontSize: '18px',
        fontWeight: 'bold',
        alignItems:'center'
    },
    mainRight: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems:'center',
        height:'100%',
        textAlign: 'center',
        fontSize: '15px',
    },
    userInfo: {
        height:'32px',
        lineHeight:'32px',
        textAlign: 'center',
        cursor:'pointer'
     },
    mainRightLogin: {
        width: '2.4rem',
        color:'#fff'
    },
    mainRightReiser: {
        width: '66px',
        height: '32px',
        lineHeight:'32px',
        backgroundColor: '#389f70',
        color: '#fff',
        borderRadius:'4px'
    },
    mainMenu: {
        position: 'absolute',
        zIndex:'9',
        right: '0px',
        top: '1.2rem',
        width:'2.4rem',
        backgroundColor: '#555',
        borderLeft:'1px solid #eee',
        color: '#fff',
        borderRadius: '4px',
        boxShadow: '0px 8px 9px 0pxrgba(0, 0, 255, 0.8)',
    },
    mainMenuT: {
        position:'absolute',
        left: '50%',
        transform:'translateX(-50%)',
        top: '-6px',
        borderWidth: '0px 6px 6px 6px',
        borderStyle: 'solid',
        borderColor:'transparent transparent #555 transparent',
    },mainMenuItem: {
       
        width: '100%',
        height:"0.8rem",
        color: '#fff',
        fontSize:'14px',
        lineHeight: '0.8rem',
        textAlign:'center',
        cursor:'pointer'
    }
}
const MyLogin = styled.div`
    background:##555;
    &:hover{
        background:#333;
    }
`