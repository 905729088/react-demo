import React from 'react'
import ConnectMyApps from './ConnectMyApps.jsx'
import {G} from './../../ACommon/Api'


export default class NewAppList extends React.Component {
    constructor(props) { 
        super(props)
    }
   
    render() {
        const styles = NewAppList.styles;
       
        return (
            <div style={styles.background} >
                <div style={styles.header}>我的应用</div>
                <div style={styles.line}></div>
                <ConnectMyApps handleAppClick={this.props.handleAppClick} ></ConnectMyApps>
            </div >
           )
    }
}
NewAppList.styles = {
    background: {
        width: '100%',
        height: '100%',
        background:'#ffffff',
        overflow: 'hidden',
        overflowY:'auto',
        padding:'33px 0px 33px 50px',
    },
    header: {
        fontSize: '28px',
        fontWeight: 'normal',
        color: '#222222',
        fontFamily:'SimSun'
    },
    line: {
        marginTop:'20px',
        width: '100%',
        height:'1px',
        backgroundColor:'#E7E8EC'
    }
}
