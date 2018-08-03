import React from 'react';
export default class Footer extends React.Component { 
    render() { 
        const styles = Footer.styles;
        return ( <div style={styles.footer}>
            <div>Copyright©2017 浙ICP备B2-20170452 </div>
            <div style={styles.footerRight}>
                <span >隐私条款</span>
                <span style={{marginTop:'-2px'}}>|</span>
                <span>用户协议</span>
            </div>
        </div>)
    }
}

Footer.styles = {
    footer: {
        position: 'fixed',
        bottom:'10px',
        marginTop:'25px',
        boxSzing: 'border-box',
        padding:'0 24% 21px 24%',
        display: 'flex',
        width:'100%',
        alignItems: 'center',
        justifyContent:'space-between',
        zIndex: '9999',
        color: '#828ea1',
        fontSize: '12px',
        
    },
    footerRight: {
        display: 'flex',
        width:'150px',
        alignItems: 'center',
        justifyContent:'space-around',
        color: '#828ea1',
        fontSize: '12px',
    }
}
