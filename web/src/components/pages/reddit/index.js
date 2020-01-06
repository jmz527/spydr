// Main Imports
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Custom Imports
import './index.scss';

class RedditPage extends Component {
  componentDidMount() {
    this.props.fetchRdtUsers();
  }
  render() {
    return (
      <div className='redditPage'>
        <h2>Reddit</h2>

        <div>
          <ul>
            { this.props.reddit_ids.map(id => {
              return (
                <li key={id}>
                  <Link to={`${this.props.match.url}/${id}`}>
                    {this.props.reddit_dict[id].user}
                  </Link>
                </li>
              );

            })}
          </ul>
        </div>

      </div>
    );
  }
}
RedditPage.propTypes = {
  match: PropTypes.object,
  fetching: PropTypes.bool,
  fetchRdtUsers: PropTypes.any,
  reddit_ids: PropTypes.any,
  reddit_dict: PropTypes.any,
};

export default withRouter(RedditPage);
