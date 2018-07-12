import React from 'react'
import AuthContext from '../auth-context.js'
import { HLayout } from './Layout.jsx'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const styles = Header.styles
        return (<AuthContext.Consumer>
            {auth => {
                const setDom = auth.isAuthenticated ? <div>
                    {auth.user.name}
                    <span onClick={auth.logout}>登出</span>
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
    }
}