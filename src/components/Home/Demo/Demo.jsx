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
        margin: 10px 0;
        height: 100%;
        background: #fff;
        padding: 15px;
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
            float: left;
            border: 1px double #ebedf0;
            height: 280px;
            > span{
                margin-bottom: 5px;
            }
        }
        & pre{
            bottom: 0;
            margin-top: 1em;
            padding: 1em;
            background-color: #dfebf5;
            height: 220px;
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
    }
    handleClick(key){
        this.setState(Data[key])
    }
    render(){
        return(
            <Layout>
                <Sider callback={ this.handleClick }></Sider>
                <div className="context">
                    <div>
                        <h1>{this.state.name}</h1>
                        <p>{this.state.list.join("，")}</p>
                    </div>
                    <Decon { ...this.state }></Decon>
                </div>
            </Layout>
        )
    }
}
