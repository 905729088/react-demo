import React from 'react'
import AuthContext from '../../../auth-context.js'
import MyApps from './MyApps.jsx'


 class NewAppList extends React.Component {
    constructor(props) { 
        super(props)
        this.state = { appList: null };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.getAppList()
    }
    handleClick() { 
        this.getAppList();
    }
    async getAppList() {
        const sid = this.props.auth.sid
        const appList = await G.api.getvar(sid, 'appinfos')
        this.setState({
            appList
        })
    }
    render() {
        const styles = NewAppList.styles;
       
        return (
            <div style={styles.background} >
                <div style={styles.header}>我的应用</div>
                <div style={styles.line}></div>
                <MyApps sid={this.props.auth.sid} handleAppClick={this.props.handleAppClick} user={this.props.auth.user} appList={this.state.appList} onClick={this.handleClick}></MyApps>
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
export default  props => (
    <AuthContext.Consumer>
         {auth => <NewAppList {...props} auth={auth}/>}
    </AuthContext.Consumer>
  );