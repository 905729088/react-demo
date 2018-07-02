import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, VLayout } from './Layout.jsx'
import AuthContext from '../auth-context.js'
import MyApps from './MyApps.jsx'


export default class NewAppList extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() { 
       // console.log('123123123',AuthContext.user)
    }
    render() {
        const styles = NewAppList.styles;
        return (
            <AuthContext.Consumer>
                {auth => (
                    <VLayout style={styles.background} >
                    <div >
                        <div style={styles.createHeader}>创建新应用</div>
                        <Link to="/create" >
                            <div style={styles.createMain}>
                                <span style={styles.createMainLeft}>+</span>
                                    <span>上传应用</span>
                                </div>
                        </Link>
                    </div>
                    <MyApps></MyApps>
                </VLayout>
                )} 
            </AuthContext.Consumer>
           )
    }
}
NewAppList.styles = {
    background: {
        padding:'10px 0 0 50px',
        borderRight:'1px solid #BBBBBB',
        boxSizing: 'border-box',
    },
    createHeader: {
        fontSize: '28px',
        fontWeight:'bold'
    },
    createMain: {
        margin:'40px 0 0 0',
        width: '275px',
        height:'85px',
        fontSize: '26px',
        lineHeight: '85px',
        textAlign:'center',
        border: '1px solid #BBBBBB',
        borderRadius:'6px'
    },
    createMainLeft: {
        margin: '20px',
        fontSize:'36px'
    }
}