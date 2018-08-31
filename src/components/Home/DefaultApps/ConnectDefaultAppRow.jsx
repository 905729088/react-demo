import { connect } from 'react-redux';
import DefaultAppRow from './DefaultAppRow.jsx';
const mapStateToProps = (state) => {
  return ({
    appList: state.DefaultAppData.appList,
  });
}
  
  
  
  export default connect(mapStateToProps)(DefaultAppRow)