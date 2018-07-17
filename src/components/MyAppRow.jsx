import React from 'react'
import { Link } from 'react-router-dom'
import { HLayout, VLayout } from './Layout.jsx'

export default class MyAppRow extends React.Component{
    constructor(props) {
        super(props)
        this.onClickDelete=this.onClickDelete.bind(this);
    }
    async onClickDelete() { 
        const sid = this.props.sid;
        const istrue=window.confirm('您确定要删除这个应用？');
        if (istrue) {
              await G.api.uninstallapp(sid, this.props.appInfo.name);
              this.props.onClick();
        } 
      
    }
    render() {
        const styles = MyAppRow.styles;
        const appInfo = this.props.appInfo
        //console.log('appInfo=====>',appInfo);
        const appUri = `http://${G.currentIP}/entry?author=${appInfo.author}&app=${appInfo.name}&ver=last`
        return (<div style={styles.background}>
            <Link  to={{ pathname: `/tree/${appInfo.name}/last` }}style={styles.MyAppRowTitle}>
               <div  style={styles.MyAppRowTitleContent} ><span>{appInfo.name}</span></div>
            </Link>
            <div style={styles.MyAppRowPreview}>
                <a href={appUri} target="_blank"   >
                    <img src={require('../img/ico-yan.png')} alt=""/>
                </a>
                <div style={styles.MyAppRowPreviewDelete} onClick={this.onClickDelete}>
                     <img  src={require('../img/ico-delete.png')} alt=""/>
                </div>
               
            </div>
       </div>
        )
    }
}

MyAppRow.styles = {
    background: {
        position: 'relative',
        margin:'0 15px 30px 0',
        width: '320px',
	    height: '154px',
        border:'1px solid #d1d2d7',
        boxShadow: '0px 3px 9px 0px rgba(34, 34, 34, 0.07)',
        borderRadius: '4px'
    },
    MyAppRowTitle: {
        display:'block',
        width: '100%',
        height: '100%',
        textDecoration:'none'
    },
    MyAppRowTitleContent: {
        margin:'30px',
        fontSize: '22px',
        color: '#0366d6',
    },
    MyAppRowPreview: {
        position: 'absolute',
        right: '24px',
        bottom:'24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight:'normal',
        color: '#868e96',
        fontSize: '14px',
        textDecoration:'none'
    },
    MyAppRowPreviewDelete: {
        marginLeft: '10px',
        cursor:'pointer'
    },

}