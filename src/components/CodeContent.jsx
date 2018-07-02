import React from 'react'
import { HLayout } from './Layout.jsx';

export default class CodeContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content : ''
        }
    }

    componentDidMount() {
        this.getCode()
    }

    async getCode() {
        const packageid = this.props.location.state.packageid
        const sid = sessionStorage.getItem('current_sid')
        const uint8 = await G.api.getlfiledata(sid, packageid, 0, -1)
        const code = new TextDecoder('utf-8').decode(uint8)
        this.setState({
            content: code
        })
    }


    render() {
        const match = this.props.match
        const styles = CodeContent.styles;
        return (<div style={styles.background}>
            <div style={styles.center}>
                <div style={styles.codeContentHeader}>
                    <div> 代码详情</div>
                   
                </div>
                <div style={styles.codeContentMain}>
                    <HLayout style={styles.codeContentMainHeader}>
                        <div style={styles.codeContentMainHeaderLeft}><span>{match.params.packageName}</span></div>
                    </HLayout>
                    <div style={styles.codeContentMainContent}>
                        <textarea style={styles.codeContentMainContentText} value={this.state.content} />
                    </div>
                </div>
            </div>
        </div>)
    }
}

CodeContent.styles = {
    background: {
        position: 'relative',
    },
    center: {
        position: 'absolute',
        width:'1200px',
        left: '50%',
        transform:'translateX(-50%)',
    },
    codeContentHeader: {
        display:'flex',
        marginTop:'160px',
        fontSize: '26px',
        fontWeight:'bold',
        textAlign: 'left',
        justifyContent: 'space-between', 
    
    },
    codeContentHeaderEdition: {
        width: '160px',
        height: '30px',
        textIndent:'20px',
        border: '1px solid #BBBBBB',
        borderRadius: '6px',
        fontSize:'18px',
        outline: 'none',
        color:'#AAAAAAA'
    },
    codeContentHeaderEditionOption: {
        fontSize: '18px',
        color:'red'
    },
    codeContentMain: {
        marginTop:'20px',
        width: '100%',
    },
    codeContentMainHeader: {
        fontSize: '18px',
        height: '60px',
        lineHeight:'60px',
        border: '1px solid #BBBBBB',
        justifyContent: 'space-between',
        background:'#E3E9EC'
    },
    codeContentMainHeaderLeft: {
        width: '400px',
        marginLeft: '20px',
    },
    codeContentMainHeaderRight: {
        boxSizing: 'border-box',
        paddingRight:'40px',
        width: '300px',
        textAlign:'right'
    },
    codeContentMainContent: {
        height:'540px',
        border: '1px solid #BBBBBB',
        borderTop:'none'
    },
    codeContentMainContentText:{
         width: '100%',
        height: '100%',
        fontSize:'18px',
        resize:'none',
    }
}