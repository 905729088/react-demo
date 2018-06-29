import React from 'react'
import { HLayout } from './Layout.jsx';
import { Link } from 'react-router-dom';
export default class AppContent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const match = this.props.match
        const styles = AppContent.styles;
        return (<div style={styles.background}>
            <div style={styles.center}>
                <div style={styles.appContentHeader}>
                    <div> {match.params.appName}</div>
                    <div>
                        <input type="text" style={styles.appContentHeaderEdition} placeholder='版本管理' list='varList' />
                        <datalist id='varList'>
                            <option style={styles.appContentHeaderEditionOption}>321312</option>
                            <option  style={styles.appContentHeaderEditionOption}>321312</option>
                            <option  style={styles.appContentHeaderEditionOption}>321312</option>
                            <option  style={styles.appContentHeaderEditionOption}>321312</option>
                            <option  style={styles.appContentHeaderEditionOption}>321312</option>
                        </datalist>
                    </div>
                   
                </div>
                <div style={styles.appContentMain}>
                    <HLayout style={styles.appContentMainitem}>
                        <Link to='/code' style={styles.appContentMainitemFileName}><span>文件名.js</span></Link>
                        <div style={styles.appContentMainitemFileDescribe}>我在描述</div>
                    </HLayout>
                  
                </div>
            </div>
        </div>)
    }
}

AppContent.styles = {
    background: {
        position: 'relative',
    },
    center: {
        position: 'absolute',
        width:'1200px',
        left: '50%',
        transform:'translateX(-50%)',
    },
    appContentHeader: {
        display:'flex',
        marginTop:'160px',
        fontSize: '26px',
        fontWeight:'bold',
        textAlign: 'left',
        justifyContent: 'space-between',
    },
    appContentHeaderEdition: {
        width: '160px',
        height: '30px',
        textIndent:'20px',
        border: '1px solid #BBBBBB',
        borderRadius: '6px',
        fontSize:'18px',
        outline: 'none',
        color:'#AAAAAAA'
    },
    appContentHeaderEditionOption: {
        fontSize: '18px',
        color:'red'
    },
    appContentMain: {
        marginTop:'20px',
        width: '100%',
        height: '540px',
        overflowY:'auto'
    },
    appContentMainitem: {
        fontSize: '18px',
        height: '60px',
        lineHeight:'60px',
        border:'1px solid #BBBBBB',
    },
    appContentMainitemFileName: {
        width: '400px',
        marginLeft: '20px',
    },
    appContentMainitemFileDescribe: {
        boxSizing: 'border-box',
        paddingRight:'40px',
        width: '100%',
        textIndent:'50px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow:'hidden'
    },
}