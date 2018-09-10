import React from 'react'
import Sider from './Sider.jsx';
import Decon from './Decon.jsx'
import styled from 'styled-components';
import Data from './DemoData.js';
import { Tag } from 'antd';

const Layout = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    > ul{
        white-space: pre-wrap;
        height: 48px;
        box-shadow: 2px 2px 2px #ccc;
        margin-top: 2px;
    }
    > .context{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex: 1;
        margin: 10px 0;
        background: #fff;
        padding: 15px 15px 60px;
        
        > div{
            padding: 10px;
        }
        > .item{
            width: 45%;
            margin: 1%;
            border-top: 1px double #ebedf0;
            height: 210px;
        }
        > .all{
            flex: 0 1 100%;
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
                    <div className="all">
                        <b>{ this.state.name }：</b>
                        { this.state.list.map( (v, i) => <Tag key={i} color={this.color[i % 7]}>
                                { v }
                        </Tag>) }
                    </div>
                    <br/>
                    <Decon { ...this.state }></Decon>
                </div>
            </Layout>
        )
    }
}
