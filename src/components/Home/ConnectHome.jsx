import { connect } from 'react-redux';
import Home from './Home.jsx';
const mapStateToProps = (state) => {
  console.log("home数据",state);
  return {
    myApps: state.HomeData.myApps,
    userInfo: state.LoginData.userInfo,
  }}
  
 
  
  export default connect(mapStateToProps)(Home)