import { connect } from 'react-redux';
import Home from './Home.jsx';
const mapStateToProps = (state) => {
  return {
    myApps: state.HomeData.myApps,
    userInfo: state.LoginData.userInfo,
    selectApp: state.AppContentData.info,
    active:state.HomeData.active,
  }}
  
 
  
  export default connect(mapStateToProps)(Home)