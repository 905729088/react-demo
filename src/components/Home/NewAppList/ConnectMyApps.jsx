import { connect } from 'react-redux';
import MyApps from './MyApps.jsx';
const mapStateToProps = (state) => {
  return ({
    myApps: state.MyAppsData.myApps,
    sid: state.LoginData.userInfo.sid,
    userId: state.LoginData.userInfo.userId,
    DATA_ID: state.LoginData.userInfo.DATA_ID,
  });
}
  
  
  
  export default connect(mapStateToProps)(MyApps)