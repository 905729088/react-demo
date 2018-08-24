import { connect } from 'react-redux';
import Login from './Login.jsx';
const mapStateToProps = (state) => { 
  return{
      isLogin: state.LoginData.isLogin,
  }}
  export default connect(mapStateToProps)(Login)