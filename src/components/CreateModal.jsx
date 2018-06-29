import React from 'react'

export default class CreateModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleBack = this.handleBack.bind(this)
    }

    handleBack(e) {
        e.stopPropagation()
        this.props.history.goBack()
    }
    render() {
        const styles = CreateModal.styles
        return (<div style={styles.modal}>
            <form style={styles.content}>
                <div style={styles.contentHeader}>新建应用</div>
                <div style={styles.contentText}>
                    <textarea style={styles.contentTextConent} />
                </div>
                <div style={styles.contentFile}>
                    <input type="file" style={styles.contentFileMain} />
                </div>
                <div style={styles.contentSubmit}>
                    <div  style={styles.contentSubmitH}>返回</div>
                    <input style={styles.contentSubmitF} type="submit" value="发布" onClick={this.handleBack} />
                   
                </div>
               
            </form>
        </div>)
    }
}

CreateModal.styles = {
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)",
    },
    content: {
        position: "absolute",
        width:'930px',
        background: "#fff",
        top: 25,
        left: "10%",
        right: "10%",
        padding: '15px 15px 100px 50px',
        border: "2px solid #444",
        borderRadius:'6px'
    },
    contentHeader: {
      marginTop:'30px',
      fontSize:'28px'
    },
    contentText: {
        marginTop:'20px',
        width: '680px',
        height: '280px',
        fontSize:'28px'
    },
    contentTextConent: {
        width: '100%',
        height: '100%',
        fontSize:'18px',
        resize:'none',
    },
    contentFile: {
        marginTop:'20px',
        width: '100%',
    },
    contentFileMain: {
        width: '200px',
    },
    contentSubmit: {
        marginTop: '20px',
        height:'50px'
    },
    contentSubmitH: {
        float: 'left',
        marginRight:'45px',
        width: '190px',
        height: '50px',
        border: '1px solid #BBBBBB',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '50px',
        borderRadius:'6px'
    },
    contentSubmitF: {
        float:'left',
        width: '190px',
        height: '50px',
        border: '1px solid #BBBBBB',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '50px',
        borderRadius: '6px',
        backgroundColor: '#AAAAAA',
        color:'#ffffff'
      }
}