import React from 'react'
import Sider from './Sider.jsx';
import Decon from './Decon.jsx'
import styled from 'styled-components';
import Data from './DemoData.js';
import { Tag } from 'antd';

const Layout = styled.div`
    width: 100%;
    height: 100%;
    > ul{
        white-space: pre-wrap;
        height: 48px;
        box-shadow: 2px 2px 2px #ccc;
        margin-top: 2px;
    }
    > .context{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 10px 0;
        height: 100%;
        background: #fff;
        padding: 15px 0 60px;
        overflow-y: auto;
        & > div:first-child,
        & > div:first-child + div{
            height: 230px;
        }
        > form,
        > div{
            width: 45%;
            margin: 1%;
            padding: 10px;
            border-top: 1px double #ebedf0;
            height: 210px;
        }
        & pre{
            bottom: 0;
            padding: 1em;
            background-color: #dfebf5;
            height: 160px;
        }
        & .ant-input-group-wrapper{
            width: 50%;
        }
    }
`

export default class Demo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            type: '',
            name: 'Hello Word',
            list: []
        }
        this.handleClick = this.handleClick.bind(this)
        this.color = ['red', 'orange', 'violet', 'green', 'blue', 'indigo', 'purple']
    }
    handleClick(key){
        this.setState(Data[key])
    }
    render(){
        return(
            <Layout>
                <Sider callback={ this.handleClick }></Sider>
                <div className="context">
                    <span style={{ flex: '0 1 100%', paddingLeft: '2em' }}>
                        <b>{ this.state.name }：</b>
                        { this.state.list.map( (v, i) => <Tag key={i} color={this.color[i % 7]}>
                                { v }
                        </Tag>) }
                    </span>
                    <br/>
                    <Decon { ...this.state }></Decon>
                </div>
            </Layout>
        )
    }
}
