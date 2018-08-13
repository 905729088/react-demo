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
        boxSzing: 'border-box',
        padding: '0 24%',
        height:'50px',
        display: 'flex',
        width:'100%',
        alignItems: 'center',
        justifyContent:'space-between',
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
