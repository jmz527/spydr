import { YtsChannels, YtsItems } from '../models';

const DEFAULT_PAGE_NUMBER = 1, PAGINATION_PAGE_LIMIT = 100;

module.exports = {
  addYoutubeChannel(req, res) {
    let channel = {
      channelId: req.body.channelId,
      channel: req.body.channel,
      title: req.body.title,
      description: req.body.description,
      customUrl: req.body.customUrl,
      thumbnailDefaultUrl: req.body.thumbnailDefaultUrl,
      thumbnailMediumUrl: req.body.thumbnailMediumUrl,
      thumbnailHighUrl: req.body.thumbnailHighUrl,
      uploadPlaylistId: req.body.uploadPlaylistId,
      viewCount: req.body.viewCount,
      commentCount: req.body.commentCount,
      subscriberCount: req.body.subscriberCount,
      videoCount: req.body.videoCount,
      isActive: true,
      publishedAt: new Date().getTime()
    };

    return YtsChannels
      .create(channel)
      .then(channel => res.status(201).send(channel))
      .catch(error => res.status(400).send(error));
  },
  fetchYoutubeChannels(req, res) {
    return YtsChannels.findAll()
      .then(channels => res.status(200).send(channels))
      .catch(error => res.status(400).send(error));
  },
  fetchYoutubeChannel(req, res) {
    return YtsChannels
      .findByPk(req.params.channelId)
      .then(channel => {
        if (!channel) {
          return res.status(404).send({ message: 'Channel Not Found' });
        }
        return res.status(200).send(channel);
      })
      .catch(error => res.status(400).send(error));
  },
  updateYoutubeChannel(req, res) {
    return YtsChannels
      .findByPk(req.params.channelId)
      .then(channel => {
        if (!channel) {
          return res.status(404).send({ message: 'Channel Not Found' });
        }
        return YtsChannels
          .update({ channel: req.body.channel || channel.channel })
          .then(() => res.status(201).send(channel))  // Send back the updated channel.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroyYoutubeChannel(req, res) {
    return YtsChannels
      .findByPk(req.params.channelId)
      .then(channel => {
        if (!channel) {
          return res.status(400).send({ message: 'Channel Not Found' });
        }
        return channel
          .destroy()
          .then(() => res.status(204).send({ message: 'Channel deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  addYoutubeVideo(req, res) {
    let video = {
      // uid: req.body.uid,
      videoId: req.body.videoId,
      title: req.body.title,
      description: req.body.description,
      thumbnailsDefaultUrl: req.body.thumbnailsDefaultUrl,
      thumbnailsMediumUrl: req.body.thumbnailsMediumUrl,
      thumbnailsHighUrl: req.body.thumbnailsHighUrl,
      thumbnailsStandardUrl: req.body.thumbnailsStandardUrl,
      thumbnailsMaxresUrl: req.body.thumbnailsMaxresUrl,
      href: req.body.href,
      duration: req.body.duration,
      views: req.body.views,
      isActive: req.body.isActive,
      isWatched: req.body.isWatched,
      publishedAt: req.body.publishedAt,
      channelRef: req.params.channelId
    };

    return YtsItems
      .create(video)
      .then(item => res.status(201).send(item))
      .catch(error => res.status(400).send(error));
  },
  addYoutubeVideosInBulk(req, res) {
    return YtsItems.bulkCreate(req.body.items, { raw: true })
      .then(items => res.status(201).send(items))
      .catch(error => res.status(400).send(error));
  },
  fetchYoutubeVideos(req, res) {
    return YtsItems.findAll()
    .then(videos => res.status(200).send(videos))
    .catch(error => res.status(400).send(error));
  },
  fetchYoutubeVideosByChannel(req, res) {
    const { query: { page = DEFAULT_PAGE_NUMBER, pageLimit = PAGINATION_PAGE_LIMIT  } } = req;

    return YtsItems.findAndCountAll({
      where: { channelRef: req.params.channelId },
      order: [['publishedAt', 'DESC']],
      offset:(pageLimit * (page - 1)),
      limit : (+pageLimit),
    })
    .then(payload => {
      let pageCount = Math.ceil(payload.count / pageLimit);
      return res.status(200).send({ ...payload, page, pageCount, pageLimit })
    })
    .catch(error => res.status(400).send(error));
  },
  fetchMostRecentYoutubeVideoOfChannel(req, res) {
    return YtsItems.findOne({ where: { channelRef: req.params.channelId }, order: [['publishedAt', 'DESC']] })
    .then(video => res.status(200).send(video))
    .catch(error => res.status(400).send(error));
  },
  addYoutubeVideosToChannel(req, res) {
    return YtsItems.bulkCreate(req.body.videos, { raw: true })
    .then(videos => res.status(201).send(videos))
    .catch(error => res.status(400).send(error));
  },
  updateYoutubeVideo(req, res) {
    return YtsItems
      .findByPk(req.params.uid)
      .then(video => {
        if (!video) {
          return res.status(404).send({ message: 'Video Not Found' });
        }
        return video
          .update({
            isActive: req.body.hasOwnProperty('isActive') ? req.body.isActive : video.isActive,
            isWatched: req.body.hasOwnProperty('isWatched') ? req.body.isWatched : video.isWatched
          })
          .then(() => res.status(201).send(video))  // Send back the updated video.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroyYoutubeVideo(req, res) {
    return YtsItems
      .findByPk(req.params.uid)
      .then(video => {
        if (!video) {
          return res.status(400).send({ message: 'Video Not Found' });
        }
        return video
          .destroy()
          .then(() => res.status(204).send({ message: 'Video deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
