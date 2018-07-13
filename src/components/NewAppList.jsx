import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, VLayout } from './Layout.jsx'
import AuthContext from '../auth-context.js'
import MyApps from './MyApps.jsx'
import CreateModal from './CreateModal.jsx';

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
                <VLayout style={styles.background} >
                        <CreateModal onClick={this.handleClick}/>
                        <MyApps sid={this.props.auth.sid} user={this.props.auth.user} appList={this.state.appList}></MyApps>
               
                </VLayout >
           )
    }
}
NewAppList.styles = {
    background: {
        paddingTop:'20px',
        boxSizing: 'border-box',
    },
    
}
export default  props => (
    <AuthContext.Consumer>
         {auth => <NewAppList {...props} auth={auth}/>}
    </AuthContext.Consumer>
  );