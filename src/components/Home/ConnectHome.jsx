import { connect } from 'react-redux';
import Home from './Home.jsx';
const mapStateToProps = (state) => {
  console.log("HOME数据",state);
  return {
    myApps: state.HomeData.myApps,
    userInfo: state.LoginData.userInfo,
    selectApp: state.AppContentData.info,
    HelloWorld:state.HomeData.HelloWorld,
  }}
  
 
  
  export default connect(mapStateToProps)(Home)