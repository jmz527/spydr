// Main Imports
import { connect } from 'react-redux';

// Custom Imports
import InstagramUser from '~/components/pages/instagram/user';
import * as actionCreators from '~/store/actions';

const mapStateToProps = (state) => {
  return {
    fetching: state.ui.fetching,
    instagram_dict: state.igrms.dict,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIgrmUser: (id) => dispatch(actionCreators.fetchIgrmUser(id)),
    fetchIgrmFeed: (id) => dispatch(actionCreators.fetchIgrmFeed(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstagramUser);
