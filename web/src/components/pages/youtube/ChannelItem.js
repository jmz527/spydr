// Main Imports
import React from 'react';
import PropTypes from 'prop-types';

const ChannelItem = ({ item, updateYtsVideo }) => {
  return (
    <React.Fragment>
      { item.isActive ? (
        <div className="vid-wrap active">
          <iframe
            width="560" height="315"
            src={`https://www.youtube.com/embed/${item.videoId}`}
            frameBorder="0" allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="vid-wrap empty">
          <div id={`player-${item.id}`} data-id={item.uid}></div>
        </div>
      ) }
      <div className="title"><a href={item.href}>{item.title}</a></div>
      <div className="stats">
        <span className="active">active: 
          <button
            data-index={item.id}
            className={`active-btn active-btn-${item.isActive}`}
            onClick={() => updateYtsVideo(item.channelRef, item.uid, { ...item, isActive: !item.isActive })}
          >
            {`${item.isActive}`}
          </button>
        </span>
        <span className="watched">watched: 
          <button
            data-index={item.id}
            className={`watched-btn watched-btn-${item.isWatched}`}
            onClick={() => updateYtsVideo(item.channelRef, item.uid, { ...item, isWatched: !item.isWatched })}
          >
            {`${item.isWatched}`}
          </button>
        </span>
      </div>

    </React.Fragment>
  );
};
ChannelItem.propTypes = {
  item: PropTypes.object,
  updateYtsVideo: PropTypes.any,
};

export default ChannelItem;