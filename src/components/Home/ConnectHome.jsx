import { connect } from 'react-redux';
import Home from './Home.jsx';
const mapStateToProps = (state) => {
  return{
    myApps: state.HomeData.myApps,
  }}
  
 
  
  export default connect(mapStateToProps)(Home)