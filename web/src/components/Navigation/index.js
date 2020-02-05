// Main Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Style Imports
import './index.scss';

const navigation = () => (
  <div className='navigation'>
    <ul>
      <li>
        <Link to='/'>Dashboard</Link>
      </li>
      <li>
        <Link to='/instagram'>Instagram</Link>
      </li>
      <li>
        <Link to='/reddit'>Reddit</Link>
      </li>
      <li>
        <Link to='/youtube'>Youtube</Link>
      </li>
    </ul>
  </div>
);

export default withRouter(navigation);
