// Main Imports
import { connect } from 'react-redux';

// Custom Imports
import YoutubeChannel from '~/components/pages/youtube/channel';
import * as actionCreators from '~/store/actions';

const mapStateToProps = (state) => {
  return {
    fetching: state.ui.fetching,
    youtube_dict: state.yts.dict,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchYtsChannel: (id) => dispatch(actionCreators.fetchYtsChannel(id)),
    fetchYtsFeed: (id, query) => dispatch(actionCreators.fetchYtsFeed(id, query)),
    updateYtsVideo: (channelId, videoId, update) => dispatch(actionCreators.updateYtsVideo(channelId, videoId, update)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeChannel);
