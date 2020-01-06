// Main Imports
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Custom Imports
import App from '~/components/App';
import * as actionCreators from '~/store/actions';

const mapStateToProps = (state) => {
  return {
    loginSuccess: state.user.loginSuccess,
    currentUser: state.user.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authorizeUserSuccess: () => dispatch(actionCreators.authorizeUserSuccess()),
    authorizeUserFailure: () => dispatch(actionCreators.authorizeUserFailure())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
