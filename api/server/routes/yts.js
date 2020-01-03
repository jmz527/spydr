import { yts as ytsController } from '../controllers';

module.exports = app => {

  /* OPTIONS preflight for update video. */
  app.options('/api/yts/:channelId/videos/:uid', (req, res) => {
    res.status(200).send({ message: 'Preflight Approved' })
  });

  /* PUT update video. */
  app.put('/api/yts/:channelId/videos/:uid', ytsController.updateYoutubeVideo);

  /* DELETE destroy video. */
  app.delete('/api/yts/:channelId/videos/:uid', ytsController.destroyYoutubeVideo);

  /* POST add channel items. */
  app.post('/api/yts/:channelId/items', ytsController.addYoutubeVideosToChannel);

  /* POST add channel item. */
  app.post('/api/yts/:channelId/item', ytsController.addYoutubeVideo);

  /* POST add channel. */
  app.post('/api/yts/', ytsController.addYoutubeChannel);

  /* GET all channels. */
  app.get('/api/yts/', ytsController.fetchYoutubeChannels);

  /* GET all videos. */
  app.get('/api/yts/videos', ytsController.fetchYoutubeVideos);

  /* GET single channel. */
  app.get('/api/yts/:channelId', ytsController.fetchYoutubeChannel);

  /* PUT update channel. */
  app.put('/api/yts/:channelId', ytsController.updateYoutubeChannel);

  /* DELETE channel. */
  app.delete('/api/yts/:channelId', ytsController.destroyYoutubeChannel);

  /* GET channel's videos. */
  app.get('/api/yts/:channelId/videos', ytsController.fetchYoutubeVideosByChannel);

  /* GET channel's most recent video. */
  app.get('/api/yts/:channelId/video', ytsController.fetchMostRecentYoutubeVideoOfChannel);

  // /* DELETE channel item. */
  // app.delete('/api/yts/:channelId/items/:channelItemId', ytsController.destroy);

  // For any other request method on channel items, we're going to return "Method Not Allowed"
  app.all('/api/yts/:channelId/items', (req, res) =>
    res.status(405).send({ message: 'Method Not Allowed' })
  );

};
