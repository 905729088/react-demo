import React from 'react';
export default class Banner extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = {
            tagState: 1
        }
        this.changeTag = this.changeTag.bind(this);
        this.onTagMouseEnter = this.onTagMouseEnter.bind(this);
        this.onTagMouseLeave = this.onTagMouseLeave.bind(this);
    }
    componentDidMount() { 
        //轮播滚动
        this.timer = setInterval(() => {
            this.setState({ tagState: this.state.tagState >= 3 ? 1 : this.state.tagState + 1 });
        }, 3000);
    }
    componentWillUnmount() { 
        //删除轮播
        clearInterval(this.timer);
    }
    onTagMouseEnter() { 
         //删除轮播
         clearInterval(this.timer);
    }
    onTagMouseLeave() { 
         //轮播滚动
         this.timer = setInterval(() => {
            this.setState({ tagState: this.state.tagState >= 3 ? 1 : this.state.tagState + 1 });
        }, 3000);
    }
    changeTag(num) { 
        this.setState({ tagState:num})
    }
    render() { 
        const styles = Banner.styles;
        const tagState = this.state.tagState;
        const sroll = this.props.height >= 640 ?this.props.height: 640;
         //初始化滚动距离
        const mainStyle = [ {// main1:
            positiopn:'relative',
            margin: '0 auto',
            marginTop:'0px',
            width:'100%',
            height: '100%',
            maxWidth: '918px',
            transition:'500ms'
        },
       {// main2:
            positiopn:'relative',
            margin: '0 auto',
            marginTop:'-'+sroll+'px',
            width:'100%',
            height: '100%',
            maxWidth: '1200px',
            transition:'500ms'
        },
            {// main3:
            positiopn:'relative',
            margin: '0 auto',
            marginTop:'-'+sroll*2+'px',
            width:'100%',
            height: '100%',
            maxWidth: '918px',
            transition:'500ms'
            }];
        return (<div style={styles.background}>
            <div style={mainStyle[tagState-1]}>
                <div style={styles.mainItem}>
                    <h3 style={{ fontSize: '90px',color:'#ffffff'}}>Leither OS</h3>
                    <p style={{ fontSize: '66px' }}>用前端的方式搞定后端</p>
                </div>
                <div style={styles.mainItem}>
                    <h3 style={{ fontSize: '90px' ,color:'#ffffff'}}>Leither OS</h3>
                    <p style={{ fontSize: '66px' }}>让前端人员独立的完成各种应用开发</p>
                    <ul style={styles.mainItemUL}>
                        <li style={styles.mainItemLi}>网站</li>
                        <li style={styles.mainItemLi}>公众号</li>
                        <li style={styles.mainItemLi}>小程序</li>
                        <li style={styles.mainItemLi}>App</li>
                    </ul>
                </div>
                <div style={styles.mainItem}>
                    <h3 style={{ fontSize: '90px',color:'#ffffff' }}>Leither OS</h3>
                    <p style={{ fontSize: '66px' }}>一个高效的云服务平台</p>
                    <ul style={styles.mainItemUL}>
                        <li style={styles.mainItemLi}>鉴权</li>
                        <li style={styles.mainItemLi}>数据库</li>
                        <li style={styles.mainItemLi}>文件操作</li>
                        <li style={styles.mainItemLi}>消息</li>
                    </ul>
                </div>
            </div>
            <div style={styles.Tag} onMouseEnter={this.onTagMouseEnter} onMouseLeave={this.onTagMouseLeave}>
                <div style={tagState === 1?styles.TagItemActive : styles.TagItem} onClick={() => {this.changeTag(1)}}></div>
                <div  style={tagState===2?styles.TagItemActive:styles.TagItem} onClick={() => {this.changeTag(2)}}></div>
                <div  style={tagState===3?styles.TagItemActive:styles.TagItem} onClick={() => {this.changeTag(3)}}></div>
            </div>
           
        </div>)
    }
} 
Banner.styles={
    background:{
        position:'absolute',
        width:'100%',
        height: '100%',
        overflow:'hidden'
    },
    main1: {
        positiopn:'relative',
        margin: '0 auto',
        marginTop:'0px',
        width:'100%',
        height: '100%',
        maxWidth: '918px',
        maxHeight: '918px',
        transition:'500ms'
    },
    main2: {
        positiopn:'relative',
        margin: '0 auto',
        marginTop:'-918px',
        width:'100%',
        height: '100%',
        maxWidth: '1200px',
        maxHeight: '918px',
        transition:'500ms'
    },
    main3: {
        positiopn:'relative',
        margin: '0 auto',
        marginTop:'-1836px',
        width:'100%',
        height: '100%',
        maxWidth: '918px',
        maxHeight: '918px',
        transition:'500ms'
    },
    mainItem: {
        display:'flex',
        width:'100%',
        height: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap'
    },
    mainItemUL: {
        display: 'flex',
        width:'100%',
        textAlign: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        fontSize:'20px',
        color:'#5ce55c'
    },
    mainItemLi: {
        margin:"27px 28px",
        width: '106px',
        height: '38px',
        borderRadius: '4px',
        border: 'solid 1px #5ce55c',
        textAlign: 'center',
        lineHeight:'38px'
    },
    Tag: {
        position: 'absolute',
        top: '50%',
        left: '15px',
        transfrom:'translateY(-50%)'
    }, TagItem: {
        marginTop:'10px',
        width: '10px',
        height: '10px',
        backgroundColor: '#8892a1',
        borderRadius: '100%',
        cursor:'pointer'
    }, TagItemActive: {
        marginTop:'10px',
        width: '10px',
        height: '10px',
        backgroundColor: '#389f70',
        borderRadius: '100%',
        cursor:'pointer'
    }
}
