import { connect } from 'react-redux';
import DefaultApps from './DefaultApps.jsx';
const mapStateToProps = (state) => {
  return ({
    appList: state.DefaultAppData.appList,
    sid: state.LoginData.userInfo.sid,
    DATA_ID: state.LoginData.userInfo.DATA_ID,
  });
}
  
  
  
  export default connect(mapStateToProps)(DefaultApps)