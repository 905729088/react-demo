import React from 'react'

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
                    <div >
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
                <div  style={styles.appContentMain}>123</div>
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
        width: '100%'
    },
}