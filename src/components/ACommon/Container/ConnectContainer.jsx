import { connect } from 'react-redux';
import Container from './Container.jsx';
const mapStateToProps = (state) => {
  console.log("号大街上打开的===》",state);
  return ({
    isLogin: state.LoginData.isLogin,
  });
}
  
  
  
  export default connect(mapStateToProps)(Container)