// Main Imports
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Custom Imports
// import './index.scss';
// import '~/style/igrm.css';

class InstagramPage extends Component {
  componentDidMount() {
    this.props.fetchIgrmUsers();
  }
  render() {
    return (
      <div className='instagramPage'>
        <h2>Instagram</h2>

        <div>
          <ul>
            { this.props.instagram_ids.map(id => {
              return (
                <li key={id}>
                  <Link to={`${this.props.match.url}/${id}`}>
                    {this.props.instagram_dict[id].name}
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
InstagramPage.propTypes = {
  match: PropTypes.object,
  fetching: PropTypes.bool,
  fetchIgrmUsers: PropTypes.any,
  instagram_ids: PropTypes.any,
  instagram_dict: PropTypes.any,
};

export default withRouter(InstagramPage);
