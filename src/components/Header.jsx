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
                const setDom = auth.isAuthenticated ? <div>welcome {auth.user.name}<span onClick={auth.logout}>登出</span></div> : <div><Link to="/login">登陆</Link> / <Link to="/join">注册</Link></div>
                return (<div style={styles.background}>
                    <HLayout style={styles.main}>
                        <div>云平台</div>
                        {setDom}
                    </HLayout>
                </div>)
            }}
        </AuthContext.Consumer>)
    }
}

Header.styles = {
    background: {
        background: '#e0d9d9',
        fontSize: '0.5rem',
        color: '#101010',
    },
    main: {
        justifyContent: 'space-between',
        maxWidth: '100%',
        borderStyle: 'none',
        height: '1.7rem',
        margin: '0 30px',
        alignItems: 'center',
    }
}