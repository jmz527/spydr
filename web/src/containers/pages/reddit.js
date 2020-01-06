// Main Imports
import { connect } from 'react-redux';

// Custom Imports
import RedditPage from '~/components/pages/reddit';
import * as actionCreators from '~/store/actions';

const mapStateToProps = (state) => {
  return {
    fetching: state.ui.fetching,
    reddit_ids: state.rdts.ids,
    reddit_dict: state.rdts.dict,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRdtUsers: () => dispatch(actionCreators.fetchRdtUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedditPage);
