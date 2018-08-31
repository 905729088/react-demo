import { connect } from 'react-redux';
import HomeIntroduce from './HomeIntroduce.jsx';
const mapStateToProps = (state) => {
  return {
    sid: state.LoginData.userInfo.sid,
  }
}
  
 
  
  export default connect(mapStateToProps)(HomeIntroduce)