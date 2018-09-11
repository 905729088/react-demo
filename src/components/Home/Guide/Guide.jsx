import React from 'react'
import GSider from './GSider.jsx'
export default class Guide extends React.Component {
    render() {
        const styles = Guide.styles;
        return (
            <div style={styles.background}>
                <GSider></GSider>
            </div>
        )
    }
}
Guide.styles = {
    background: {
        overflow: 'hidden',
        overflowY: 'auto',
        width: '100%',
        height: '100%',
        background: '#fff',
    }
}