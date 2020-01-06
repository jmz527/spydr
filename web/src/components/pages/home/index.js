// Main Imports
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Custom Imports
// import './index.scss';

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchIgrmUsers();
    this.props.fetchRdtUsers();
    this.props.fetchYtsChannels();
  }
  render() {
    return (
      <div className='homePage'>

        <h3><Link to='/instagram'>Instagram</Link></h3>

        <div>
          <ul>
            { this.props.instagram_ids.map(id => {
              return <li key={id}>{this.props.instagram_dict[id].name}</li>;
            })}
          </ul>
        </div>

        <h3><Link to='/reddit'>Reddit</Link></h3>

        <div>
          <ul>
            { this.props.reddit_ids.map(id => {
              return <li key={id}>{this.props.reddit_dict[id].user}</li>;
            })}
          </ul>
        </div>

        <h3><Link to='/youtube'>Youtube</Link></h3>

        <div>
          <ul>
            { this.props.youtube_ids.map(id => {
              return <li key={id}>{this.props.youtube_dict[id].channel}</li>;
            })}
          </ul>
        </div>

      </div>
    );
  }
}
HomePage.propTypes = {
  fetching: PropTypes.bool,
  fetchIgrmUsers: PropTypes.any,
  fetchRdtUsers: PropTypes.any,
  fetchYtsChannels: PropTypes.any,
  instagram_ids: PropTypes.any,
  instagram_dict: PropTypes.any,
  reddit_ids: PropTypes.any,
  reddit_dict: PropTypes.any,
  youtube_ids: PropTypes.any,
  youtube_dict: PropTypes.any,
};

export default withRouter(HomePage);
