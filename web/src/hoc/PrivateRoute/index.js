// Main Imports
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Style Imports
// import './index.scss';

const privateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => 
        rest.loginSuccess ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
privateRoute.propTypes = {
  loginSuccess: PropTypes.bool,
  currentUser: PropTypes.object,
  location: PropTypes.object,
  component: PropTypes.func
};

function mapStateToProps(state) {
  return {
    loginSuccess: state.user.loginSuccess,
    currentUser: state.user.currentUser
  };
}

export default connect(mapStateToProps)(privateRoute);
