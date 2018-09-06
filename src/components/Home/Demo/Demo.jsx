import React from 'react'
import Sider from './Sider.jsx';
import Decon from './Decon.jsx'
import styled from 'styled-components';
import Data from './DemoData.js';

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
        margin-top: 10px;
        height: 100%;
        background: #fff;
        padding: 20px;
    }
`

export default class Demo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            type: null,
            name: 'Hello Word',
            list: []
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(key){
        this.setState(Data[key])
    }
    render(){
        return(
            <Layout>
                <Sider callback={ this.handleClick }></Sider>
                <div className="context">
                    <h1>{this.state.name}</h1>
                    <p>{this.state.list.join("，")}</p>
                    <Decon { ...this.state }></Decon>
                </div>
            </Layout>
        )
    }
}
