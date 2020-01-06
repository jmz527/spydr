// Main Imports
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Custom Imports
import './index.scss';

class YoutubePage extends Component {
  componentDidMount() {
    this.props.fetchYtsChannels();
  }
  render() {
    return (
      <div className='youtubePage'>
        <h2>YouTube</h2>

        <div>
          <ul>
            { this.props.youtube_ids.map(id => {
              return (
                <li key={id}>
                  {
                    this.props.youtube_dict[id].isActive ? (
                      <Link to={`${this.props.match.url}/${id}`}>
                        {this.props.youtube_dict[id].channel}
                      </Link>
                    ) : (
                      <span>{this.props.youtube_dict[id].channel}</span>
                    )
                  }
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    );
  }
}
YoutubePage.propTypes = {
  match: PropTypes.object,
  fetching: PropTypes.bool,
  fetchYtsChannels: PropTypes.any,
  youtube_ids: PropTypes.any,
  youtube_dict: PropTypes.any,
};

export default withRouter(YoutubePage);
