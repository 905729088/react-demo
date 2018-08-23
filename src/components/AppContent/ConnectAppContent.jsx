import { connect } from 'react-redux';
import AppContent from './AppContent.jsx';
const mapStateToProps = (state) => {
  return ({
    appFileList: state.AppContentData.appFileList,
    appVersionList: state.AppContentData.appVersionList,
    appDomain:state.AppContentData.appDomain,
  });
}
  
  
  
  export default connect(mapStateToProps)(AppContent)