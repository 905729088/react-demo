import React from "react";
import styled, {keyframes} from 'styled-components';
export default class HeaderBackground extends React.Component {
    render() { 
        const styles = HeaderBackground.styles;
        return (
            <div style={styles.background}>
                <div style={styles.mainline}>
                    <Mainl
                        margin= '-180px 0 0 198px'
                        width='200px'
                        transform='rotate(-45deg)'
                        animation={`${line1move} 1.5s infinite linear alternate`}
                    />
                     <Mainl
                        margin= '-215px 0 0 155px'
                        width='80px'
                        transform='rotate(-45deg)'
                        animation={`${line2move} 1.2s infinite linear alternate`}
                       
                    />
                     <Mainl
                        margin= '-147px 0 0 226px'
                        width='60px'
                        transform='rotate(-45deg)'
                        animation={`${line3move} 1s infinite linear alternate`}
                    />
                     <Mainl
                        margin= '200px 0 0 -180px'
                        width='0px'
                        transform='rotate(135deg)'
                        animation={`${line4move} 1.5s infinite linear alternate`}
                    />
                     <Mainl
                        margin= '160px 0 0 -218px'
                        width='0px'
                        transform='rotate(135deg)'
                        animation={`${line5move} 1.2s infinite linear alternate`}
                    />
                     <Mainl
                        margin= '224px 0 0 -143px'
                        width='0px'
                        transform='rotate(135deg)'
                        animation={`${line6move} 1s infinite linear alternate`}
                    />
                </div>
                <Mainline2>
                <div style={styles.mainla}></div>
                    <div style={styles.mainlb}></div>
                    <div style={styles.mainld1}></div>
                    <div style={styles.mainld2}></div>
                    <div style={styles.mainld3}></div>
                    <div style={styles.mainld4}></div>
                    <div style={styles.mainlr}></div>
                </Mainline2>
                <div style={styles.mainxza}>
                    <div style={styles.mainxz1}>
                        <Mainxz1con>
                            <img style={styles.mainxzImg} src={require('./img/mainxz1.png')} alt="正向旋转线条"/>
                        </Mainxz1con>
                    </div>
                </div>
                <div style={styles.mainxzb}>
                    <div style={styles.mainxz2}>
                        <Mainxz2con>
                            <img style={styles.mainxzImg} src={require('./img/mainxz2.png')} alt="反向旋转线条"/>
                        </Mainxz2con>
                    </div>
                </div>
                <video  style={styles.headerbackgroundVideo} autoPlay loop muted width='100%'>
                    {/* <source src={require('./img/home.compressed.mp4')} type="video/mp4" /> */}
                </video>
                <div style={styles.headerbackground1} ></div>
                <div style={styles.headerbackground2} ></div>
                <div style={styles.headerbackground3} ></div>
            </div>)
    }
} 

HeaderBackground.styles = {
    background: {
        overflow:'hidden',
        position: 'absolute',
        zIndex: '-1',
        top: '0',
        left:'0',
        width: '100%',
        height: '100%',
        
    },
    mainline: {
        position: 'absolute',
        zIndex: '6',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
    },
    mainla: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#fff',
        margin: '0 0 0 -550px',
        width: '200px',
        height: '1px',
        opacity: '.2'
    },
    mainlb: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#fff',
        margin: '0 0 0 350px',
        width: '200px',
        height: '1px',
        opacity: '.2'
    },
    mainld1: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#fff',
        margin: '-2px 0 0 -502px',
        width: '4px',
        height: '4px',
        borderRadius: '100%',
        opacity: '.2'
    },
    mainld2: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#fff',
        margin: '-2px 0 0 498px',
        width: '4px',
        height: '4px',
        borderRadius: '100%',
        opacity: '.2'
    },
    mainld3: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#fff',
        margin: '-2px 0 0 -401px',
        width: '4px',
        height: '4px',
        borderRadius: '100%',
        opacity: '.2'
    },
    mainld4: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#fff',
        margin: '-2px 0 0 399px',
        width: '4px',
        height: '4px',
        borderRadius: '100%',
        opacity: '.2'
    },
    mainlr: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: 'rgba(0,10,50,.05)',
        margin: '-400px 0 0 -400px',
        width:'800px',
        height: '800px',
        borderLeft: '1px solid rgba(255,255,255,.2)',
        borderRight: '1px solid rgba(255,255,255,.2)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        borderTop: '1px solid rgba(255,255,255,.06)',
        borderRadius: '100%'
    },
    mainxza: {
        margin: '0 0 0 10%',
        width: '80%',
        height: '100%',
        display: 'table',
        overflow:' hidden',
        position: 'absolute',
        zIndex:'6'
    },
    mainxz1: {
        display: 'table-cell',
        verticalAlign: 'middle',
        width: '100%',
        margin: '0 auto',
        textAlign:'center'
    },
    mainxzb: {
        margin: '0 0 0 10%',
        width: '80%',
        height: '100%',
        display: 'table',
        overflow:' hidden',
        position: 'absolute',
        zIndex:'6'
    },
    mainxz2: {
        display: 'table-cell',
        verticalAlign: 'middle',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        opacity:'0.5'
    },
    mainxzImg: {
        maxWidth: '500px',
        maxHeight: '500px',
        width:'100%'
    },
    headerbackground1: {
        background: "#08244d linear-gradient(to bottom right, rgba(13,70,128,1) , rgba(5,20,50,1))",
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: '-1',
        left: '0',
        top: '0',
        opacity: '.5'
    },
    headerbackground2: {
        background: `rgba(0, 0, 0, 0) url(${require('./img/prx1.png')}) repeat scroll center 0`,
        opacity: '0.06',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height:'auto',
        position: 'absolute',
        zIndex: '-1'
    },
    headerbackground3: {
        background: `rgba(0, 0, 0, 0) url(${require('./img/prx2.png')}) repeat scroll center 0`,
        opacity: '0.03',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height:'auto',
        position: 'absolute',
        zIndex: '-1'
    },
    headerbackgroundVideo: {
        position: 'absolute',
        left: '50%',
        top:'50%',
        zIndex:'-1',
        objectFit: "contain",
        minWidth: '100%',
        minHeight: '100%',
        transform: 'translate(-50.01%,-50.01%)',
        width: 'auto',
        height:'auto',
        background: '#000',
    },
}

const mainxza = keyframes`
    form{transform:rotate(0deg);}
    to{transform:rotate(359deg);}
`;
const line1move = keyframes`
    form{width:200px;}
    to{width:0px;}
`;
const line2move = keyframes`
    form{width:80px;}
    to{width:0px;}
`;
const line3move = keyframes`
    form{width:60px;}
    to{width:0px;}
`;
const line4move = keyframes`
    form{width:0px;}
    to{width:220px;}
`;
const line5move = keyframes`
    form{width:0px;}
    to{width:100px;}
`;
const line6move = keyframes`
    form{width:0px;}
    to{width:70px;}
`;
const Mainl= styled.div.attrs({
    margin: props=>props.margin,
    width:props=>props.width ,
    transform: props=>props.transform,
    animation:props=>props.animation,
})`
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #5ce55c;
    margin: ${props=>props.margin};
    width:  ${props=>props.width};
    height: 1px;
    transform:${props=>props.transform};
    transform-origin: 0 0;
    animation: ${props=>props.animation};
`


//外线旋转层
const Mainline2 = styled.div`
    position: absolute;
    z-index: 6;
    top: 50%;
    left: 50%;
    margin: -500px 0 0 -500px;
    width: 1000px;
    height: 1000px;
    border-left: 1px solid rgba(255,255,255,.2);
    border-right: 1px solid rgba(255,255,255,.2);
    border-bottom: 1px solid rgba(255,255,255,.06);
    border-top: 1px solid rgba(255,255,255,.06);
    border-radius: 100%;
    transform: rotate(90deg);
    animation:${mainxza} 8s infinite linear alternate;
`;
//内层
const Mainxz1con = styled.div`
    &>img{
        animation:${mainxza} 120s infinite linear;
    }
`;
const Mainxz2con = styled.div`
    &>img{
        animation:${mainxza} 60s infinite linear;
        animation-direction:reverse;
    }
`;