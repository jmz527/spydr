// Main Imports
import { connect } from 'react-redux';

// Custom Imports
import RedditUser from '~/components/pages/reddit/user';
import * as actionCreators from '~/store/actions';

const mapStateToProps = (state) => {
  return {
    fetching: state.ui.fetching,
    reddit_dict: state.rdts.dict,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRdtUser: (id) => dispatch(actionCreators.fetchRdtUser(id)),
    fetchRdtFeed: (id) => dispatch(actionCreators.fetchRdtFeed(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedditUser);
