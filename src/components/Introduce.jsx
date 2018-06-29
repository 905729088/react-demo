import React from 'react'
import { HLayout } from './Layout.jsx'
import Login from './Login.jsx'

export default class Introduce extends React.Component {
    render(){
        const styles = Introduce.styles
        return (<HLayout style={styles.main}>
            <div style={styles.IntroduceLeft}>
                <div  style={styles.IntroduceLeftHeader}>为开发人员打造</div> 
                <div  style={styles.IntroduceLeftMain}>GitHub是一个受你工作方式启发的开发平台。从开源到商业，您可以托管和查看代码，管理项目，并与数百万其他开发人员一起构建软件。</div>
            </div>
            <div  style={styles.IntroduceRight}><Login /></div>
        </HLayout>)
    }
}

Introduce.styles = {
    main: {
        justifyContent: 'center'
    },
    IntroduceLeft: {
        margin:'243px 70px 0 0',
        width:' 510px',
        height: '464px',
    },
    IntroduceLeftHeader: {
       padding:'25px 0 30px 0',
       fontSize:'48px'
    },
    IntroduceLeftMain: {
        fontSize:'28px'
    },
    IntroduceRight: {
        width:' 507px',
    },
}