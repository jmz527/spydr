// Main Imports
import { connect } from 'react-redux';

// Custom Imports
import YoutubePage from '~/components/pages/youtube';
import * as actionCreators from '~/store/actions';

const mapStateToProps = (state) => {
  return {
    fetching: state.ui.fetching,
    youtube_ids: state.yts.ids,
    youtube_dict: state.yts.dict,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchYtsChannels: () => dispatch(actionCreators.fetchYtsChannels()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YoutubePage);
