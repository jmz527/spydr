// Main Imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import ChannelItem from './ChannelItem';
import PaginationBar from '~/components/PaginationBar';

class YoutubeChannel extends Component {
  componentDidMount() {
    let { match, location } = this.props;

    // console.log('this.props.match');
    // console.log(match);
    // console.log('this.props.location');
    // console.log(location.search);


    this.props.fetchYtsChannel(match.params.channelId);
    this.props.fetchYtsFeed(match.params.channelId, location.search);
  }
  render() {
    const { match, youtube_dict } = this.props;
    const channel = youtube_dict[match.params.channelId];
    const feed = channel && channel.feed ? channel.feed.ids.slice(0, 50) : [];
    const meta = channel && channel.feed ? channel.feed.meta : null;

    // if (channel && channel.id) {
    //   console.log(channel.id);
    //   console.log(channel.uid);
    //   console.log(channel.isActive);
    //   console.log(channel.createdAt);
    //   console.log(channel.updatedAt);
    // }

    // paginate={(searchQuery) => this.props.fetchYtsFeed(match.params.channelId, searchQuery)}

    return (
      <div className='youtubeChannel'>
        <h3>{ channel && channel.id && channel.channel }</h3>
        <h4>{match.params.channelId}</h4>

        <div>
          { channel && channel.feed ? 
            <ul className='yts-list'>{ feed.map(id => {
              return (
                <li className="yts-list-item" key={id}>
                  <ChannelItem item={channel.feed.dict[id]} updateYtsVideo={this.props.updateYtsVideo} />
                </li>
              );
            })}
            </ul>
            :
            <p>...loading...</p>
          }
        </div>

        <PaginationBar
          meta={meta}
          paginate={this.props.fetchYtsFeed}
        />

      </div>
    );
  }
}
YoutubeChannel.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  fetching: PropTypes.bool,
  youtube_dict: PropTypes.any,
  fetchYtsChannel: PropTypes.any,
  fetchYtsFeed: PropTypes.any,
  updateYtsVideo: PropTypes.any,
};

export default withRouter(YoutubeChannel);
