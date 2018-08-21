import React from 'react'
import { HLayout,VLayout } from '../ACommon/Layout.jsx'
import AuthContext from '../../auth-context.js'
import { Redirect } from 'react-router-dom'
import styled, {keyframes} from 'styled-components';
import HeaderBackground from './HeaderBackground.jsx';
import Banner from './Banner.jsx';
import { Link } from 'react-router-dom';
class Introduce extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            password: '',
            wHeight:0
        }
        this.moveNext = this.moveNext.bind(this);
        this.moveAnimation = this.moveAnimation.bind(this);
        this.checkWheel = this.checkWheel.bind(this);
    }
    componentDidMount() {
       
        //鼠标滚动事件
        this.onaddWheel(this.checkWheel);
        //让第一个界面充满屏幕
        this.setState({ wHeight: window.innerHeight })
        //获取屏幕高度
        window.onresize = () => {this.setState({ wHeight: window.innerHeight }) };
    }
    componentWillUnmount() { 
        //鼠标滚动事件
        window.onresize = null;
        this.ondelWheel(this.checkWheel);
    }
  
    moveNext() { 
        cancelAnimationFrame(this.timer);
        this.timer = requestAnimationFrame(this.moveAnimation);
    }
    moveAnimation() { 
        let end = this.state.wHeight >= 640?this.state.wHeight:640;
        let moveDistance = end - this.getScrollTop();
        let moveTarget = 0;
        if (moveDistance > 10) {
            moveTarget = this.getScrollTop() + moveDistance * 0.1;
        } else { 
            moveTarget = this.getScrollTop() + 1;
        }
        if (moveTarget<=end) {
            document.documentElement.scrollTo(0,moveTarget);
            this.timer = requestAnimationFrame(this.moveAnimation);
        } else {
            document.documentElement.scrollTo(0, end);
            cancelAnimationFrame(this.timer);
        }
    
    }
     getScrollTop(){
        let scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop){
            scrollTop=document.documentElement.scrollTop;
        }else if(document.body){
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    }
    //滚动监听
    checkWheel() { 
        cancelAnimationFrame(this.timer);
    }
    onaddWheel(scrollFunc) { 
       
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        } 
         window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome
    }
    ondelWheel(scrollFunc) { 
       
        if (document.addEventListener) {
            document.removeEventListener('DOMMouseScroll', scrollFunc, false);
        } 
         window.onmousewheel=document.onmousewheel=null;//IE/Opera/Chrome
    }
    render() {
        const styles = Introduce.styles;
        return (
            <div style={styles.background}>
                <MyHeader style={styles.header} height={this.state.wHeight} >
                    <HeaderBackground />
                    <Banner height={this.state.wHeight} />
                    <Move>
                        <img onClick={this.moveNext} src={require('./img/ico-next.png')} alt="" />
                    </Move>
                </MyHeader>
                <div style={styles.characteristic}>
                    <ul style={styles.characteristicMainUl}>
                        <CharacteristicLi style={styles.characteristicMainLi}>
                            <img src={require('./img/ico-function.png')}/>
                            <p style={{ marginTop: '24px', width: '100%', color: 'rgba(34, 34, 34, 0.9)' }}>高效运行</p>
                            <span style={styles.characteristicMainLiCover}>
                                消耗极少CPU和内存，全部业务均由前端完成，不需要后端，开发简单快速
                            </span>
                        </CharacteristicLi>
                        <CharacteristicLi style={styles.characteristicMainLi}>
                            <img src={require('./img/ico-safe.png')}/>
                            <p style={{ marginTop: '24px', width: '100%', color: 'rgba(34, 34, 34, 0.9)' }}>数据安全</p>
                            <span style={styles.characteristicMainLiCover}>
                               比特币等级的安全机制
                            </span>
                        </CharacteristicLi>
                        <CharacteristicLi style={styles.characteristicMainLi}>
                            <img src={require('./img/ico-quickly.png')}/>
                            <p style={{ marginTop: '24px', width: '100%', color: 'rgba(34, 34, 34, 0.9)' }}>系统极轻</p>
                            <span style={styles.characteristicMainLiCover}>
                                整个系统仅有几兆大小
                            </span>
                        </CharacteristicLi>
                        <CharacteristicLi style={styles.characteristicMainLi}>
                            <img src={require('./img/ico-local.png')}/>
                            <p style={{ marginTop: '24px', width: '100%', color: 'rgba(34, 34, 34, 0.9)' }}>可本地化</p>
                            <span style={styles.characteristicMainLiCover}>
                               能够运行在成本不到百元的硬件盒子，nas和路由器上
                            </span>
                        </CharacteristicLi>
                    </ul>
                </div>
                <div style={styles.growup}>
                    <div>
                        <h3 style={styles.growupHeader}>只需四步</h3>
                        <div style={styles.growupgrow}>三小时前端变全端,程序猿变大神</div>
                        <ul style={styles.growupgrowUl}>
                            <li style={styles.growupgrowItem}>
                                <div style={{  width: '100%', height: '138px',background:`url(${require('./img/grow-1.png')}) no-repeat center bottom`}}></div>
                                <div style={styles.growupgrowItemMain}>
                                    <h3 style={{ marginBottom:'5px',fontSize: '18px' }}>30秒建站</h3>
                                    <div>1、注册登录</div>
                                    <div>2、使用系统默认网站模板</div>
                                    <div>3、设置域名</div>
                                    <div>4、访问自己的网站</div>
                                    <div style={{position:'absolute',left:'-2px',top:'0',width:'3px',height:'25%',backgroundColor:'#389f70'}}></div>
                                </div>
                            </li>
                            <li style={styles.growupgrowItem}>
                                <div style={{  width: '100%', height: '138px',background:`url(${require('./img/grow-2.png')}) no-repeat center bottom`}}></div>
                                <div style={styles.growupgrowItemMain}>
                                    <h3 style={{ marginBottom:'5px',fontSize: '18px' }}>2h学习后端功能</h3>
                                    <div>1、用户鉴权</div>
                                    <div>2、数据库</div>
                                    <div>3、文件操作</div>
                                    <div>4、消息体系</div>
                                    <div style={{position:'absolute',left:'-2px',top:'0',width:'3px',height:'50%',backgroundColor:'#389f70'}}></div>
                                </div>
                            </li>
                            <li style={styles.growupgrowItem}>
                            <div style={{  width: '100%', height: '138px',background:`url(${require('./img/grow-3.png')}) no-repeat center bottom`}}></div>
                                <div style={styles.growupgrowItemMain}>
                                    <h3 style={{ marginBottom:'5px',fontSize: '18px' }}>1h体验商业级应用</h3>
                                    <div>1、任务协作（worktile类）</div>
                                    <div>2、脑图（百度脑图类）</div>
                                    <div>文档（简书类使用Leither OS，一名前端人员，一到两周即可完成此类开发</div>
                                    <div style={{position:'absolute',left:'-2px',top:'0',width:'3px',height:'75%',backgroundColor:'#389f70'}}></div>
                                </div>
                            </li>
                            <li style={styles.growupgrowItem}>
                             <div style={{  width: '100%', height: '138px',background:`url(${require('./img/grow-4.png')}) no-repeat center bottom`}}></div>
                                <div style={styles.growupgrowItemMain}>
                                    <h3 style={{ marginBottom:'5px',fontSize: '18px' }}>独立开发商业项目</h3>
                                    <div>1、时金网：百亿级交易规模的票据交易网站</div>
                                    <div>2、麦儿芽盒子：数万商家使用的门店客流管理终端</div>
                                    <div>3、氢协作Saas系统：数百家中小企业使用的OA、协作管理系统</div>
                                    <div style={{position:'absolute',left:'-2px',top:'0',width:'3px',height:'100%',backgroundColor:'#389f70'}}></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={styles.footer}>
                    <div style={styles.footerHeader}>欢迎注册</div>
                    <p style={styles.footerP}>一个人做项目的加持技能，拥有它你就是王者！</p>
                    <Link to='/join' style={styles.footerResiter}>立即注册&gt;</Link>
                    <hr style={{width:'1200px',backgroundColor:'rgba(242, 242, 242, 0.15)',opacity:'0.15'}}/>
                    <div style={styles.QRcode}>
                        <img style={{marginRight:'30px'}} src={require('./img/QRcode-1.png')} />
                        <img src={require('./img/QRcode-2.png')}/>
                    </div>
                    <div style={{marginTop:'18px',fontSize:'14px',color:'#8a8f99'}}>（欢迎内测，和我们共同成长）</div>
                </div>
            </div>
        )
    }
}

export default  props => (
    <AuthContext.Consumer>
         {auth => { 
                return auth.isAuthenticated ? <Redirect to={{ pathname: "/home" }} />
                    :
                 <Introduce {...props} auth={auth}/>
            }}
    </AuthContext.Consumer>
  );

Introduce.styles = {
    background: {
        width: '100%',
        height: 'auto',
        minWidth:'1030px'
    },
    header: {
        position:'relative',
        width:'100%',
        minHeight:'640px',
        color:'#fff'
    },
    characteristic: {
        display:'flex',
        overflow:'hidden',
        width:'100%',
        height: '232px',
        justifyContent: 'center',
    },
    characteristicMain: {
        overflow:'hidden',
        width:'100%',
        height: '232px',
    },
    characteristicMainUl: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    characteristicMainLi: {
        position: 'relative',
        margin:'0 25px',
        height: '100%',
        width:'204px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: '16px',
    },
    characteristicMainLiCover: {
        position: 'absolute',
        height: '100%',
        width:'100%',
        backgroundColor: 'rgba(0, 0, 0, 0.54)',
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.9)',
        textIndent: '15px',
        textAlign: 'left',
        cursor: 'default',
        justifyContent: 'center',
        alignItems: 'center',
    },growup: {
        overflow: 'hidden',
        width: '100%',
        height: '566px',
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: `url(${require('./img/bg-growup.png')})`,
        textAlign:'center'
    }, growupHeader: {
        marginTop:'58px',
        fontSize: '42px',
        color:'#389f70'
    },growupgrow: {
        marginTop:'10px',
        marginBottom:'28px',
        fontSize: '24px',
        color:'#222'
    },growupgrowUl: {
        display: 'flex',
        justifyContent: 'center',
    }, growupgrowItem: {
        margin:'0 41px',
        width: '190px',
    }, growupgrowItemMain: {
        position:'relative',
        marginTop: '12px',
        paddingLeft:'20px',
        height:'160px',
        borderLeft: "solid 1px #c2c5cc",
        color: '#222',
        fontSize: '14px',
        textAlign:'left'
    }, footer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        width:'100%',
        height: '518px',
        background: "#16203c",
        justifyContent: 'flex-start',
        alignItems:'center',
        color:'#fff'
    }, footerHeader: {
        marginTop:'58px',
        fontSize:'42px',
    },
    footerP: {
        marginTop:'8px',
        fontSize:'16px',
    },
    footerResiter: {
        margin:'57px 0 46px',
        width: '180px',
        height: '46px',
        backgroundColor: '#389f70',
        lineHeight: '46px',
        fontSize: '16px',
        color: '#fff',
        textDecoration:'none',
        textAlign:'center',
        boxShow: '0px 4px 2px 0px rgba(242, 242, 242, 0.14)',
        borderRadius: '4px',
    },
    QRcode: {
        marginTop:'40px',
    }
}

const MyInput = styled.input`
        &::-webkit-input-placeholder{
            fontSize:20px;
            color:#22272f;
        }
`
const CharacteristicLi = styled.li`
        &>span{
            display:none;
        };
        &:hover>span{
            display:flex;
        }
`
const moveAnimate = keyframes`
    0% {
        bottom: 6%;
        opacity: 0;
    }
    50% {
        bottom: 5%;
        opacity: 1;
    }
    100% {
        bottom: 2%;
        opacity: 0;
    }
`;

const Move = styled.div`
    position: absolute;
    bottom:6%;
    left: 50%;
    transform:translateX(-50%);
    cursor:pointer;
    animation:${moveAnimate} 2s infinite ease-out;
`;

//自适应头部
const MyHeader = styled.div.attrs({
    height:props=>props.height+'px'
})`
    height:${props => props.height};
    
`;