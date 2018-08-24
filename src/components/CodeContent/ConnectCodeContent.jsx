import { connect } from 'react-redux';
import CodeContent from './CodeContent.jsx';
const mapStateToProps = (state) => {
  return ({
    sid: state.LoginData.userInfo.sid,
    userId: state.LoginData.userInfo.userId,
    DATA_ID:state.LoginData.userInfo.DATA_ID
  });
}
  
  
  
  export default connect(mapStateToProps)(CodeContent)