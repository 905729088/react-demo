import React from 'react';
import { Button, Upload } from 'antd'
import { G } from '../../../ACommon/Api'

export default class Team extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fileList: [],
        }
        this.setFileList = this.setFileList.bind(this)
        this.Pre = React.createRef()
        this.G = G.api
    }
    componentDidMount(){
        this.Pre.current.innerHTML = `
        function upload(data) {\n
            const fileReader = new FileReader()\n
            fileReader.onloadend = async e => {\n
                let tempId = await G.api.openTempFile('')\n
                // 获取临时 id\n
                let fileSize = await G.api.setLFileData('', tempId, 0, e.target.result)\n
                // 上传文件\n
                let fileId = await G.api.temp2LFile('', tempId)\n
                // 获取文件的正式 id\n
                data.onSuccess({\n
                    fileSize,\n
                    fileId,\n
                })\n
            }\n
            fileReader.readAsArrayBuffer(data.file)\n
            // 上传文件的二进制格式\n
            fileReader.onerror = data.onError\n
        }`
    }
    upload (data) {
        console.log(data);
        let fnCode = this.Pre.current.innerText.replace(/G\.api/g, 'G') + '\nupload(data)'
        const fn = new Function('G' , 'data', fnCode)
        fn(this.G, data)
    }
    setFileList (data) {
        const file = data.fileList[0]
        if (file.status === 'done') {
            file['url'] = `http://${G.ip}/file?id=${file.response.fileId}&filename=${file.name}`
        }
        console.log(file);
        this.setState({
            fileList: [file]
        })
    }
    render () {
        const file = this.state.fileList
        return <React.Fragment>
            <div className="all">
                <Upload 
                    customRequest={ data => this.upload(data)}
                    onChange={this.setFileList}
                    fileList={ file }>
                    <Button>上传文件</Button>
                </Upload>
                <p>下载地址为：{ file.length ? file[0].url : `http://${G.ip}/file?id= + fileId + &filename= + name` }</p>
                <pre style={{ height: '650px' }} contentEditable="plaintext-only" ref={ this.Pre }>
                </pre>
            </div>
        </React.Fragment>
    }
}