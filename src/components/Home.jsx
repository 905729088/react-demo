import React from 'react'
import { HLayout ,VLayout} from './Layout.jsx'
import NewAppList from './NewAppList.jsx'
import DefaultApps from './DefaultApps.jsx'

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state={active:true}
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(){
        this.setState({active:!this.state.active})
    }
    render() {
        const styles = Home.styles;
        const active=this.state.active;
        const Item=active?<NewAppList/>:<DefaultApps/>;
        return (<div style={styles.background} >
            <VLayout style={styles.center}>
                <div  style={styles.mainHeader}>
                    <div style={active?styles.mainHeaderItemActive:styles.mainHeaderItem} onClick={this.handleClick}>我的应用</div>
                    <div style={!active?styles.mainHeaderItemActive:styles.mainHeaderItem} onClick={this.handleClick}>应用库</div>
                </div>
                {Item}
                
            </VLayout>
        </div>)
    }
}
Home.styles = {
    background: {
        position: 'fixed',
        top:'0',
        width: '100%',
        height: '100%',
        backgroundColor:'#E7E8EC'
    },
    center: {
        margin:'2rem auto',
        padding:'40px 30px 45px 30px',
        width: '1080px',
        height:'750px',
        borderRadius: '6px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        boxShadow: '0px 8px 9px 0px rgba(34, 34, 34, 0.08)'
    },
    mainHeader: {
        display: 'flex',
        paddingBottom:'24px',
        justifyContent: 'flex-start',
        alignItems:'center',
        fontSize: '16px',
        borderBottom:'1px solid #dcdee0'
    },
    mainHeaderItemActive: {
       marginRight:'24px',
       fontSize: '24px',
       fontWeight:'bold',
       cursor:'pointer'
    },
    mainHeaderItem: {
        marginRight:'24px',
        cursor:'pointer'
     },
}