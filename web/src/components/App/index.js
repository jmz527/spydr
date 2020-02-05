// Main Imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// Custom Imports
import Layout from '~/components/Layout';
// import PrivateRoute from '~/components/PrivateRoute';

// Page Imports
import SandboxPage from '~/components/pages/sandbox';

// Container Imports
import DashboardPage from '~/containers/pages/dashboard';
import InstagramPage from '~/containers/pages/instagram';
import InstagramUser from '~/containers/pages/instagram_users';
import RedditPage from '~/containers/pages/reddit';
import RedditUser from '~/containers/pages/reddit_users';
import YoutubePage from '~/containers/pages/youtube';
import YoutubeChannel from '~/containers/pages/youtube_channels';

// Style Imports
// import './index.scss';

const app = (props) => (
  <div className='app'>
    <Layout {...props}>
      <Switch>
        <Route exact path='/' component={DashboardPage}/>
        <Route exact path='/instagram' component={InstagramPage}/>
        <Route path='/instagram/:userId' component={InstagramUser}/>
        <Route exact path='/reddit' component={RedditPage}/>
        <Route path='/reddit/:userId' component={RedditUser}/>
        <Route exact path='/youtube' component={YoutubePage}/>
        <Route path='/youtube/:channelId' component={YoutubeChannel}/>
        <Route path='/sandbox' component={SandboxPage}/>
      </Switch>
    </Layout>
  </div>
);
app.propTypes = {
  loginSuccess: PropTypes.bool,
  currentUser: PropTypes.object,
  authorizeUserSuccess: PropTypes.func,
  authorizeUserFailure: PropTypes.func
};

export default app;
