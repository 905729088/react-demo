import { connect } from 'react-redux';
import AppContent from './AppContent.jsx';
const mapStateToProps = (state) => {
  return ({
    appFileList: state.AppContentData.appFileList,
    appVersionList: state.AppContentData.appVersionList,
    appDomain: state.AppContentData.appDomain,
    sid: state.LoginData.userInfo.sid,
    userId: state.LoginData.userInfo.userId,
    DATA_ID:state.LoginData.userInfo.DATA_ID
  });
}
  
  
  
  export default connect(mapStateToProps)(AppContent)