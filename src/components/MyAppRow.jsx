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
        return (<HLayout style={styles.background}>
            <HLayout style={styles.MyAppRowLeft}>
                <span>{this.props.index}</span>
                <span style={styles.MyAppRowLeftLogin}>logo</span>
                <span><a href={appUri} target="_blank">{appInfo.name}</a></span>
            </HLayout>
            <div style={styles.MyAppRowRight}>
                <Link to={{ pathname: `/tree/${appInfo.name}/last`}} style={styles.MyAppRowRightEdit} ><span>编辑</span></Link>
                <span style={styles.MyAppRowRightDele}>删除</span>
            </div>
        </HLayout>)
    }
}

MyAppRow.styles = {
    background: {
        marginBottom:'30px',
        justifyContent: 'space-between',
    },
    MyAppRowLeft: {
        fontSize: '26px',
        alignItems:'center'
    },
    MyAppRowLeftLogin: {
        display: 'block',
        margin:'0 20px',
        width: '60px',
        height:'60px',
        fontSize: '18px',
        lineHeight: '60px',
        textAlign:'center',
        border: '1px solid #BBBBBB',
        borderRadius:'100%'
    },
    MyAppRowRight: {
        display:'flex',
        width:'200px',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    MyAppRowRightEdit: {
        width: '85px',
        height: '40px',
        lineHeight: '40px',
        alignItems: 'center',
        textAlign: 'center',
        fontSize:'18px',
        border: '1px solid #BBBBBB',
        borderRadius: '6px',
        backgroundColor:'#D9D9D9'
    },
    MyAppRowRightDele: {
        width: '85px',
        height: '40px',
        lineHeight: '40px',
        alignItems: 'center',
        textAlign: 'center',
        fontSize:'18px',
        border: '1px solid #BBBBBB',
        borderRadius: '6px',
    }
}