import { connect } from 'react-redux';
import DefaultApps from './DefaultApps.jsx';
const mapStateToProps = (state) => {
  return ({
    appList: state.DefaultAppData.appList,
  });
}
  
  
  
  export default connect(mapStateToProps)(DefaultApps)