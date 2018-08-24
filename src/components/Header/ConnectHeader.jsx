import { connect } from 'react-redux';
import Header from './Header.jsx';
const mapStateToProps = (state) => { 
  return{
      isLogin: state.LoginData.isLogin,
      userInfo: state.LoginData.userInfo
  }}
  
 
  
  export default connect(mapStateToProps)(Header)