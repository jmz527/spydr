// Main Imports
import React from 'react';
import { withRouter } from 'react-router-dom';

// Custom Imports
import BuggyCounter from '~/components/BuggyCounter';
import ErrorBoundary from '~/hoc/ErrorBoundary';

// Style Imports
// import './index.scss';

const sandboxPage = () => (
  <div className='sandboxPage'>
    <h2>Sandbox</h2>

    {/* BuggyCounter without ErrorBoundary */}
    <div style={{ position: 'relative', display: 'inline-block', width: '50%' }}>
      <label>BuggyCounter without ErrorBoundary</label>
      <BuggyCounter />
    </div>

    {/* BuggyCounter with ErrorBoundary */}
    <div style={{ position: 'relative', display: 'inline-block', width: '50%' }}>
      <label>BuggyCounter with ErrorBoundary</label>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    </div>

  </div>
);

export default withRouter(sandboxPage);
