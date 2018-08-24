import { connect } from 'react-redux';
import CreateModal from './CreateModal.jsx';
const mapStateToProps = (state) => { 
  return{
    file: state.CreateModalData.file,
    userType:state.LoginData.userInfo.userType,
    sid: state.LoginData.userInfo.sid,
    userId: state.LoginData.userInfo.userId,
    DATA_ID: state.LoginData.userInfo.DATA_ID,
    
  }}
  
 
  
  export default connect(mapStateToProps)(CreateModal)