// Main Imports
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// <a href={item.link}>
// <img src={item.thumbImg} alt="" />
// </a>
// https://instagram.fnyc1-1.fna.fbcdn.net/vp/071bf30242012b5bb870cbd5bb6d7770/5D3DF0E1/t51.2885-15/e35/22858386_475332399533009_8119742995730792448_n.jpg?_nc_ht=instagram.fnyc1-1.fna.fbcdn.net
// https://instagram.fnyc1-1.fna.fbcdn.net/vp/ab16d2e3e2a82aacdbff085ab51016cc/5D4A7CB0/t51.2885-15/e35/20184605_135833860341606_6079928134822526976_n.jpg?_nc_ht=instagram.fnyc1-1.fna.fbcdn.net

// https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s150x150/e35/c135.0.809.809/22858386_475332399533009_8119742995730792448_n.jpg
// https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s150x150/e35/c3.0.1074.1074/20184605_135833860341606_6079928134822526976_n.jpg



// https://instagram.fnyc1-1.fna.fbcdn.net/vp/071bf30242012b5bb870cbd5bb6d7770/5D3DF0E1/t51.2885-15/e35/<date-hash>.jpg?_nc_ht=instagram.fnyc1-1.fna.fbcdn.net



const InstagramItem = ({ item }) => {
  return (
    <div>
      <p>{item.id}</p>
      <p>{item.uid}</p>
      <p>{item.picId}</p>
      <p>{item.code}</p>
      <p>{item.thumbImg}</p>
      <p>{item.lowResImg}</p>
      <p>{item.loc}</p>
      <p>{item.cap}</p>
      <p>{item.userRef}</p>
      <p>{item.createdAt}</p>
      <p>{item.updatedAt}</p>
    </div>
  );
};
InstagramItem.propTypes = {
  item: PropTypes.object,
};


class InstagramUser extends Component {
  componentDidMount() {
    this.props.fetchIgrmUser(this.props.match.params.userId);
    this.props.fetchIgrmFeed(this.props.match.params.userId);
  }
  render() {
    const { match, instagram_dict } = this.props;
    const user = instagram_dict[match.params.userId];

    return (
      <div className='instagramUser'>
        <h3>{ user && user.name }</h3>
        <h4>{match.params.userId}</h4>

        <ul>
          <li>{ user && user.id }</li>
          <li>{ user && user.uid }</li>
          <li>{ user && user.name }</li>
          <li>{`${user && user.isActive ? 'true' : 'false'}`}</li>
          <li>{ user && user.createdAt }</li>
          <li>{ user && user.updatedAt }</li>
        </ul>

        <h4>Feed</h4>

        <div>
          { user && user.feed ? 
            <ul className='igrms-list'>{ user.feed.ids.map(id => {
              return <li className="igrms-list-item" key={id}><InstagramItem item={user.feed.dict[id]} /></li>;
            })}
            </ul>
            :
            <p>...loading...</p>
          }
        </div>
      </div>
    );
  }
}
InstagramUser.propTypes = {
  match: PropTypes.object,
  fetching: PropTypes.bool,
  instagram_dict: PropTypes.any,
  fetchIgrmUser: PropTypes.any,
  fetchIgrmFeed: PropTypes.any,
};

export default withRouter(InstagramUser);
