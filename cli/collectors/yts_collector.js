const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const axios = require('axios');

const fileUtil = require(`../util/file_util`);
const FileUtil = new fileUtil();
const util = require('../util');

module.exports = {
  fetch_details(uniqueId) {
    return axios.get(`${process.env.SPYDR_API}/api/yts/${uniqueId}`).catch((error) => {
      FileUtil.logError(error, 'get', `${process.env.SPYDR_API}/api/yts/${uniqueId}`, null);
      throw error;
    });

  },
  fetch_latest(uniqueId) {
    return axios.get(`${process.env.SPYDR_API}/api/yts/${uniqueId}/video`).catch((error) => {
      FileUtil.logError(error, 'get', `${process.env.SPYDR_API}/api/yts/${uniqueId}/video`, null);
      throw error;
    });
  },
  fetch_channel(channelId) {
    let QUERY = querystring.encode({
      key: process.env.YTS_KEY,
      id: channelId,
      part: 'snippet,contentDetails,statistics'
    });

    return axios.get(`${process.env.YTS_API}/channels/?${QUERY}`).then((payload) => {
      return {
        channel: util.toSnake(payload.data.items[0].snippet.title),
        channelId: payload.data.items[0].id,
        title: util.escapeStr(payload.data.items[0].snippet.title),
        description: util.escapeStr(payload.data.items[0].snippet.description),
        customUrl: payload.data.items[0].snippet.customUrl,
        thumbnailDefaultUrl: payload.data.items[0].snippet.thumbnails.default.url,
        thumbnailMediumUrl: payload.data.items[0].snippet.thumbnails.medium.url,
        thumbnailHighUrl: payload.data.items[0].snippet.thumbnails.high.url,
        uploadPlaylistId: payload.data.items[0].contentDetails.relatedPlaylists.uploads,
        viewCount: payload.data.items[0].statistics.viewCount,
        commentCount: payload.data.items[0].statistics.commentCount,
        subscriberCount: payload.data.items[0].statistics.subscriberCount,
        videoCount: payload.data.items[0].statistics.videoCount,
        isActive: true,
        publishedAt: payload.data.items[0].snippet.publishedAt
      };
    }).catch((error) => {
      FileUtil.logError(error, 'get', `${process.env.YTS_API}/channels/?${QUERY}`, null);
      throw error;
    });


  },
  create_channel(newChannel) {
    return axios.post(`${process.env.SPYDR_API}/api/yts/`, newChannel);
  },
  list_channels() {
    return axios.get(`${process.env.SPYDR_API}/api/yts/`);
  },
  fetch_feed(channelId) {
    let QUERY = querystring.encode({
      key: process.env.YTS_KEY,
      channelId: channelId,
      part: 'snippet,id',
      type: 'video',
      order: 'date',
      maxResults: '50'
    });

    return axios.get(`${process.env.YTS_API}/search/?${QUERY}`).then((payload) => {
      let vids, obj, json;
          vids = [];

      payload.data.items.forEach((item) => {
        obj = {
          videoId: item.id.videoId,
          title: util.escapeStr(item.snippet.title),
          description: util.escapeStr(item.snippet.description),
          // thumbnailDefaultUrl: item.snippet.thumbnails.default.url,
          // thumbnailMediumUrl: item.snippet.thumbnails.medium.url,
          // thumbnailHighUrl: item.snippet.thumbnails.high.url,
          href: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          duration: `-`,
          views: `-`,
          isActive: true,
          isWatched: false,
          publishedAt: item.snippet.publishedAt,
          channelRef: channelId
        };

        vids.push(obj)
      })
      // vids = this.sanitizeStrings(vids)
      json = { channel_id: channelId, data: vids };

      return json;
    }).catch(error => {
      FileUtil.logError(error, 'get', `${process.env.YTS_API}/search/?${QUERY}`, null);
      throw error;
    });    
  },
  fetch_video_details(videoId) {
    let QUERY = querystring.encode({
      key: process.env.YTS_KEY,
      id: videoId,
      part: 'contentDetails,statistics'
    });

    return axios.get(`${process.env.YTS_API}/videos?${QUERY}`).then((payload) => {
      return {
        'id': payload.data.items[0].id,
        'duration': payload.data.items[0].contentDetails.duration,
        'dimension': payload.data.items[0].contentDetails.dimension,
        'definition': payload.data.items[0].contentDetails.definition,
        'caption': payload.data.items[0].contentDetails.caption,
        'projection': payload.data.items[0].contentDetails.projection,
        'viewCount': payload.data.items[0].statistics.viewCount,
        'likeCount': payload.data.items[0].statistics.likeCount,
        'dislikeCount': payload.data.items[0].statistics.dislikeCount,
        'favoriteCount': payload.data.items[0].statistics.favoriteCount,
        'commentCount': payload.data.items[0].statistics.commentCount,
      };
    });
  },
  create_item(channelId, item) {
    let video = {
      videoId: item.videoId,
      title: item.title,
      description: item.description,
      thumbnailDefaultUrl: '',
      thumbnailMediumUrl: '',
      thumbnailHighUrl: '',
      thumbnailStandardUrl: '',
      thumbnailMaxresUrl: '',
      href: item.href,
      duration: "-",
      views: "-",
      isActive: true,
      isWatched: false,
      publishedAt: item.publishedAt,
      channelRef: channelId
    };

    // console.log(video);

    return axios.post(`${process.env.SPYDR_API}/api/yts/${channelId}/item`, video);
  },
  bulk_create_items(channelId, items) {
    let videos = items.map(item => {
      return {
        videoId: item.videoId,
        title: item.title,
        description: item.description,
        thumbnailDefaultUrl: '',
        thumbnailMediumUrl: '',
        thumbnailHighUrl: '',
        thumbnailStandardUrl: '',
        thumbnailMaxresUrl: '',
        href: item.href,
        duration: "-",
        views: "-",
        isActive: true,
        isWatched: false,
        channelRef: channelId
      };
    });

    // console.log(videos);

    return axios.post(`${process.env.SPYDR_API}/api/yts/${channelId}/items`, { videos });
  }
};
