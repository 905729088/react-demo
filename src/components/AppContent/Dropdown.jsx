import React from 'react';
import styled from 'styled-components';

let mystyle;
export default class Dropdown extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            value: '',
            dataList:[]
        }
        this.inputFocus = this.inputFocus.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.TriangleClick = this.TriangleClick.bind(this);
    }
    componentDidMount() { 
        const dataList = this.props.dataList;
        this.setState({dataList});
    }
    static getDerivedStateFromProps(nextProps, prevState) { 
        const dataList = nextProps.dataList;
        return {dataList}
    }
    TriangleClick() { 
        this.setState({
            isFocus: !this.state.isFocus,
        })
    }

    
    handleClick(val) { 
        this.setState({
            isFocus: false,
            value: val
        });
        this.props.onClick(val);
    }
    inputFocus() { 
        this.setState({
            isFocus: true,
        })
    }
        
    render() { 
        const styles = Dropdown.styles
        const list = this.state.dataList;
        mystyle = this.props.styles;
        let itemList = list?list.map(val => (
            <MyOptin style={styles.option} key={val} onClick={() => { 
            this.handleClick(val);
            }}>{val}</MyOptin>)):null;
        return (
            <MyDropdown style={{
                position:'relative',
                width: mystyle.width,
                height: '30px',
                color:'#AAAAAAA'
            }}  >
                <input style={styles.main}  value={this.state.value} type="text" placeholder='版本管理' disabled />
                <div style={styles.mainground} onClick={this.inputFocus} ></div>
                <div style={styles.Triangle} onClick={this.TriangleClick}>
                    <div style={this.state.isFocus ? styles.TriangleHide : styles.TriangleShow} onClick={this.TriangleClick}></div>
                </div>
                <ul className={this.state.isFocus?'dropdownparent':'dropdownparentNo'} style={styles.optionP}  >
                    {itemList}
                </ul>
            </MyDropdown>
        )
    }
}

Dropdown.styles = {
    main: {
        position: 'absolute',
        top: '0',
        left:'0',
        width: '100%',
        paddingRight:'23px',
        height: '100%',
        border: '1px solid #d1d5da',
        borderRadius: '6px',
        fontSize: '14px',
        textAlign:'center',
        outline: 'none',
        boxSizing: 'border-box',
        color:'#32475e',
        background: '#ffffff',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow:'hidden'
    },
    mainground: {
        position: 'absolute',
        top: '0',
        left:'0',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
    },
    Triangle: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems:'center',
        right: '0px',
        zIndex: '1',
        width: '23px',
        height: '30px',
        cursor: 'pointer',
        boxSizing: 'border-box',
    },
    TriangleHide: {
        borderWidth: '0px 6px 8px 6px',
        borderColor: 'transparent transparent #888 transparent ',
        borderStyle: 'solid',
        cursor:'pointer' 
    },
    TriangleShow: {
        borderWidth: '8px 6px 0px 6px',
        borderColor: '#888  transparent transparent transparent ',
        borderStyle: 'solid',
        cursor:'pointer' 
    },
    optionP: {
        position: 'absolute',
        width: '100%',
        maxHeight: '300%',
        overflowY:'auto',
        top:'100%',
        zIndex: '1',
        fontSize: '14px',
        color:'#32475e',
        textAlign:'center',
        border: '1px solid #d1d5da',
        background:'#ffffff'
    },
    option: {
        width: '100%',
        cursor:'default'
    }
}

const MyOptin = styled.li`
    &:hover{
        background: #ddd;
    };
`;

const MyDropdown = styled.div`
    & > .dropdownparent{
        display:block;
    };
    & > .dropdownparentNo{
        display:none;
    };
`;