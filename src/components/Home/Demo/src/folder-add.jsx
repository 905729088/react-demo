import React from 'react';
import { Button, Upload } from 'antd'
import * as api from '../../../ACommon/Api'

const G = api.G

export default class Team extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fileList: [],
        }
        this.setFileList = this.setFileList.bind(this)
    }
    upload (data) {
        console.log(data);
        const fileReader = new FileReader()
        fileReader.onloadend = async e => {
            let tempId = await G.api.openTempFile('')
            '获取临时 id'
            let fileSize = await G.api.setLFileData('', tempId, 0, e.target.result)
            '上传文件'
            let fileId = await G.api.temp2LFile('', tempId)
            '获取文件的正式 id'
            data.onSuccess({
                fileSize,
                fileId,
            })
        }
        fileReader.readAsArrayBuffer(data.file)
        '上传文件的二进制格式'
        fileReader.onerror = data.onError
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
                <pre style={{ height: '500px' }}>
                    { this.upload.toLocaleString() }
                </pre>
            </div>
        </React.Fragment>
    }
}