import React from 'react'
import { Link } from 'react-router-dom'
import { HLayout, VLayout } from './Layout.jsx'

export default class MyAppRow extends React.Component{
    constructor(props) {
        super(props)
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
               <a href={appUri} target="_blank"  style={styles.MyAppRowPreview} >
                   <img src='./src/img/ico-yan.png' alt=""/>
               <span style={{marginLeft:'5px'}}>预览效果</span>
               </a>
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
        right: '29px',
        bottom:'25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'flex-start',
        color: '#868e96',
        fontSize: '14px',
        textDecoration:'none'
    },
   

}