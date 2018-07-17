import React from 'react'
import AuthContext from '../auth-context.js'
import { HLayout } from './Layout.jsx'
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
                        <img src={require('../img/ico-login-user.png')} alt=""/>
                        <span style={{verticalAlign:'top'}}>{auth.user.name}</span>
                    </div>
                </div> : <div style={styles.mainRight}>
                        <Link style={styles.mainRightLogin} to="/login">登陆</Link>
                        {/* <Link style={styles.mainRightReiser} to="/join">注册</Link> */}
                    </div>
                return (<div style={styles.background}>
                    <HLayout style={styles.main}>
                        <div style={styles.mainLeft}>
                            <i style={styles.mainLeftLogo}></i>
                            <span style={styles.mainLeftText}>云平台</span>
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
        position: 'fixed',
        top:'0',
        width:'100%',
        zIndex:'10',
        fontSize: '0.46rem',
        color: '#101010',
        boxShadow:'0px 2px 2px 0px rgba(34, 34, 34, 0.08)',
        borderBottom: '1px solid #eeeeee',
        backgroundColor:'#ffffff'
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
    mainLeftLogo: {
        display:'block',
        width: '37px',
        height: '37px',
        background:`url('${require('../img/logo-image.png')}') no-repeat 100%/100%`
    },
    mainLeftText: {
        marginLeft:'10px',
        fontSize: '18px',
        fontWeight:'bold'
    },
    mainRight: {
       height:'100%',
       lineHeight:'1.4rem',
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
        float:'left',
        width:'2.4rem',
        fontWeight:'bold',
        borderLeft: '1px solid #eee',
        borderRight:'1px solid #eee',
    },
    mainRightReiser: {
        float:'left',
        width:'2rem',
        height:'100%',
        backgroundColor: '#00afff',
        borderLeft:'1px solid #eee',
        color:'#fff'
    },
    mainMenu: {
        position:'absolute',
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