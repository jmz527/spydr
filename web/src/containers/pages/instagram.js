// Main Imports
import { connect } from 'react-redux';

// Custom Imports
import InstagramPage from '~/components/pages/instagram';
import * as actionCreators from '~/store/actions';

const mapStateToProps = (state) => {
  return {
    fetching: state.ui.fetching,
    instagram_ids: state.igrms.ids,
    instagram_dict: state.igrms.dict,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIgrmUsers: () => dispatch(actionCreators.fetchIgrmUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstagramPage);
