// Main Imports
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Style Imports
import './index.scss';

const PaginationBar = ({ meta, match, paginate }) => {
  const items = [];
  const pagePaginate = (page) => paginate(match.params.channelId, `?page=${page}&pageLimit=${meta.pageLimit}`);
  // const pagePaginate = (page) => console.log(page);

  // paginate={(searchQuery) => this.props.fetchYtsFeed(match.params.channelId, searchQuery)}

  if (meta && meta.hasOwnProperty('pageCount')) {
    for (var i = 1; i <= parseInt(meta.pageCount); i++) {
      items.push(
        <li key={i}>
          <Link
            to={`${match.url}?page=${i}&pageLimit=${meta.pageLimit}`}
            onClick={pagePaginate.bind(this, i)}
          >
            {`| ${i} |`}
          </Link>
        </li>
      );
    }
  }
  
  return (
    <div className='pagination-bar'>
      { meta ?
        <React.Fragment>
          <p>{`${JSON.stringify(meta)}`}</p>
          <ul>
            <React.Fragment>
              { items }
            </React.Fragment>
          </ul>
          <ul className='page-item-count'>
            <li>
              { (meta.pageLimit.toString() === '20') ?
                <span>20</span>
                :
                <Link
                  to={`${match.url}?pageLimit=20`}
                  onClick={() => paginate(match.params.channelId, '?pageLimit=20')}
                >
                  20
                </Link>
              }
            </li>
            <li>
              { (meta.pageLimit.toString() === '50') ?
                <span>50</span>
                :
                <Link
                  to={`${match.url}?pageLimit=50`}
                  onClick={() => paginate(match.params.channelId, '?pageLimit=50')}
                >
                  50
                </Link>
              }
            </li>
            <li>
              { (meta.pageLimit.toString() === '100') ?
                <span>100</span>
                :
                <Link
                  to={`${match.url}?pageLimit=100`}
                  onClick={() => paginate(match.params.channelId, '?pageLimit=100')}
                >
                  100
                </Link>
              }
            </li>
          </ul>
        </React.Fragment>
        :
        <p>...loading...</p>
      }
    </div>
  );
};

PaginationBar.propTypes = {
  match: PropTypes.object,
  meta: PropTypes.object,
  paginate: PropTypes.function,
};

export default withRouter(PaginationBar);
