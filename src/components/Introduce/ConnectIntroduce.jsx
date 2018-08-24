import { connect } from 'react-redux';
import Introduce from './Introduce.jsx';
const mapStateToProps = (state) => { 
  return{
      isLogin: state.LoginData.isLogin,
  }}
  export default connect(mapStateToProps)(Introduce)