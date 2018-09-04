import { connect } from 'react-redux';
import HomeIntroduce from './HomeIntroduce.jsx';
const mapStateToProps = (state) => {
  return {
    userInfo: state.LoginData.userInfo,
  }
}
  
 
  
  export default connect(mapStateToProps)(HomeIntroduce)