// Main Imports
import { connect } from 'react-redux';

// Custom Imports
import DashboardPage from '~/components/pages/dashboard';
import * as actionCreators from '~/store/actions';

const mapStateToProps = (state) => {
  return {
    fetching: state.ui.fetching,
    instagram_ids: state.igrms.ids,
    instagram_dict: state.igrms.dict,
    reddit_ids: state.rdts.ids,
    reddit_dict: state.rdts.dict,
    youtube_ids: state.yts.ids,
    youtube_dict: state.yts.dict,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIgrmUsers: () => dispatch(actionCreators.fetchIgrmUsers()),
    fetchRdtUsers: () => dispatch(actionCreators.fetchRdtUsers()),
    fetchYtsChannels: () => dispatch(actionCreators.fetchYtsChannels()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
