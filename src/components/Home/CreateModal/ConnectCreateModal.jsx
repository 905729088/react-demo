import { connect } from 'react-redux';
import CreateModal from './CreateModal.jsx';
const mapStateToProps = (state) => { 
  return{
    file: state.CreateModalData.file,
  }}
  
 
  
  export default connect(mapStateToProps)(CreateModal)