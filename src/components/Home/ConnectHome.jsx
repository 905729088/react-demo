import { connect } from 'react-redux';
import Home from './Home.jsx';
const mapStateToProps = (state) => {
  console.log("home数据",state);
  return{
    myApps: state.HomeData.myApps,
    sid: state.LoginData.userInfo.sid,
    userId: state.LoginData.userInfo.userId,
    DATA_ID:state.LoginData.userInfo.DATA_ID
  }}
  
 
  
  export default connect(mapStateToProps)(Home)