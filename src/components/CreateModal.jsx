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
            <div style={styles.content}>
                <div>新建应用</div>
                <input type="submit" value="返回" onClick={this.handleBack}/>
            </div>
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
        background: "rgba(0, 0, 0, 0.15)"
    },
    content: {
        position: "absolute",
        background: "#fff",
        top: 25,
        left: "10%",
        right: "10%",
        padding: 15,
        border: "2px solid #444"
    }
}