// Main Imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const RedditItem = ({ item }) => {
  return (
    <ul id={`${item.id}_${item.uid}`}>
      <li><a href={item.href}>{item.title}</a></li>
      <li>{`by ${item.author}`}</li>
      <li>{`subreddit: ${item.subreddit}`}</li>
      <li>{`${item.commentsCount} comments`}</li>
      <li>{`score: ${item.score}`}</li>
    </ul>
  );
};
RedditItem.propTypes = {
  item: PropTypes.object,
};


class RedditUser extends Component {
  componentDidMount() {
    this.props.fetchRdtUser(this.props.match.params.userId);
    this.props.fetchRdtFeed(this.props.match.params.userId);
  }
  render() {
    const { match, reddit_dict } = this.props;
    const user = reddit_dict[match.params.userId] || {};

    return (
      <div className='redditUser'>
        <h3>{ user && user.user }</h3>
        <h4>{match.params.userId}</h4>

        { user && user.uid ? 
          <ul id={`${user.id}_${user.uid}`}>
            <li>{ user.user }</li>
            <li>{ `active: ${( user.isActive ? 'true' : 'false')}` }</li>
          </ul>
          :
          <p>...loading...</p>
        }

        <h4>Feed</h4>

        <div>
          { user && user.feed ? 
            <div className='rdts-list'>{ user.feed.ids.map(id => {
              return (
                <div className="rdts-list-item" key={id}>
                  <RedditItem item={user.feed.dict[id].RdtItem} />
                </div>
              );
            })}
            </div>
            :
            <p>...loading...</p>
          }
        </div>
      </div>
    );
  }
}
RedditUser.propTypes = {
  match: PropTypes.object,
  fetching: PropTypes.bool,
  reddit_dict: PropTypes.any,
  fetchRdtUser: PropTypes.any,
  fetchRdtFeed: PropTypes.any,
};

export default withRouter(RedditUser);
