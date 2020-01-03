import chai from 'chai';
import { yts as ytsController } from '../server/controllers';
import { generateUUID, reqFactory, resFactory } from '../server/util';

describe("The Server's Yts controller - first batch", () => {
  let addYoutubeChannelResponse, fetchYoutubeChannelsResponse, fetchYoutubeChannelResponse, addYoutubeVideoResponse;
  let channel, video, videoId = generateUUID();

  before(async () => {
    channel = {
      channel: 'test_youtube_channel',
      channelId: generateUUID(),
      title: 'test_title',
      description: 'Videos explaining things with optimistic nihilism. \n\nWe are a small team who want to make science look beautiful. Because it is beautiful. \n\nCurrently we make one animation video per month. Follow us on Twitter, Facebook to get notified when a new one comes out.\n\nFAQ:\n \n- We do the videos with After Effects and Illustrator.',
      customUrl: 'inanutshell',
      thumbnailDefaultUrl: 'https://yt3.ggpht.com/a-/AAuE7mBwm16pirqqYi7Yli1eRKWClJYLV2jNxpsR2w=s88-mo-c-c0xffffffff-rj-k-no',
      thumbnailMediumUrl: 'https://yt3.ggpht.com/a-/AAuE7mBwm16pirqqYi7Yli1eRKWClJYLV2jNxpsR2w=s240-mo-c-c0xffffffff-rj-k-no',
      thumbnailHighUrl: 'https://yt3.ggpht.com/a-/AAuE7mBwm16pirqqYi7Yli1eRKWClJYLV2jNxpsR2w=s800-mo-c-c0xffffffff-rj-k-no',
      uploadPlaylistId: 'test_upload_playlist_id',
      viewCount: 'test_view_count',
      commentCount: 'test_comment_count',
      subscriberCount: 'test_subscriber_count',
      videoCount: 'test_video_count',
      isActive: true,
      publishedAt: new Date()
    };
    addYoutubeChannelResponse = await ytsController.addYoutubeChannel(reqFactory(channel), resFactory());
    fetchYoutubeChannelsResponse = await ytsController.fetchYoutubeChannels(reqFactory(), resFactory());
    fetchYoutubeChannelResponse = await ytsController.fetchYoutubeChannel(reqFactory(null, { channelId: addYoutubeChannelResponse.data.dataValues.uid }), resFactory());
    video = {
      videoId: videoId,
      title: "How To Cross When A Car Stops For You",
      description: '',
      thumbnailsDefaultUrl: '',
      thumbnailsMediumUrl: '',
      thumbnailsHighUrl: '',
      thumbnailsStandardUrl: '',
      thumbnailsMaxresUrl: '',
      href: "https://www.youtube.com/watch?v=XL0J77f99K8",
      duration: "-",
      views: "-",
      isActive: true,
      isWatched: false,
      publishedAt: new Date(),
      channelRef: addYoutubeChannelResponse.data.dataValues.uid
    }
    addYoutubeVideoResponse = await ytsController.addYoutubeVideo(reqFactory(video, { channelId: addYoutubeChannelResponse.data.dataValues.uid }), resFactory());
  });

  after(async () => { // clean up after yourself
    await ytsController.destroyYoutubeChannel(reqFactory(null, { channelId: addYoutubeChannelResponse.data.dataValues.uid }), resFactory());
  });


  describe('# ytsController.addYoutubeChannel method', () => {
    it('response statusCode should be 201', () => {
      chai.expect(addYoutubeChannelResponse.statusCode).to.equal(201);
    });

    it('response data.dataValues should be an object', () => {
      chai.expect(addYoutubeChannelResponse).to.have.property('data');
      chai.expect(addYoutubeChannelResponse.data).to.be.a('object');
      chai.expect(addYoutubeChannelResponse.data).to.have.property('dataValues');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.be.a('object');
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('id');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('uid');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('channelId');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('channel');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('title');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('description');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('customUrl');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('thumbnailDefaultUrl');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('thumbnailMediumUrl');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('thumbnailHighUrl');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('uploadPlaylistId');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('viewCount');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('commentCount');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('subscriberCount');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('videoCount');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('isActive');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('publishedAt');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('created_at');
      chai.expect(addYoutubeChannelResponse.data.dataValues).to.have.property('updated_at');
    });

    it('response data should have the correct attribute data types', () => {
      chai.expect(addYoutubeChannelResponse.data.dataValues.id).to.be.a('number');
      chai.expect(addYoutubeChannelResponse.data.dataValues.uid).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.channelId).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.channel).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.title).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.description).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.customUrl).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.thumbnailDefaultUrl).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.thumbnailMediumUrl).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.thumbnailHighUrl).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.uploadPlaylistId).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.viewCount).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.commentCount).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.subscriberCount).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.videoCount).to.be.a('string');
      chai.expect(addYoutubeChannelResponse.data.dataValues.isActive).to.be.a('boolean');
      chai.expect(addYoutubeChannelResponse.data.dataValues.publishedAt).to.be.a('date');
      chai.expect(addYoutubeChannelResponse.data.dataValues.created_at).to.be.a('date');
      chai.expect(addYoutubeChannelResponse.data.dataValues.updated_at).to.be.a('date');
    });

    it('response data should contain the correct values', () => {
      chai.expect(addYoutubeChannelResponse.data.dataValues.channelId).to.equal(channel.channelId);
      chai.expect(addYoutubeChannelResponse.data.dataValues.channel).to.equal(channel.channel);
      chai.expect(addYoutubeChannelResponse.data.dataValues.title).to.equal(channel.title);
      chai.expect(addYoutubeChannelResponse.data.dataValues.description).to.equal(channel.description);
      chai.expect(addYoutubeChannelResponse.data.dataValues.customUrl).to.equal(channel.customUrl);
      chai.expect(addYoutubeChannelResponse.data.dataValues.thumbnailDefaultUrl).to.equal(channel.thumbnailDefaultUrl);
      chai.expect(addYoutubeChannelResponse.data.dataValues.thumbnailMediumUrl).to.equal(channel.thumbnailMediumUrl);
      chai.expect(addYoutubeChannelResponse.data.dataValues.thumbnailHighUrl).to.equal(channel.thumbnailHighUrl);
      chai.expect(addYoutubeChannelResponse.data.dataValues.uploadPlaylistId).to.equal(channel.uploadPlaylistId);
      chai.expect(addYoutubeChannelResponse.data.dataValues.viewCount).to.equal(channel.viewCount);
      chai.expect(addYoutubeChannelResponse.data.dataValues.commentCount).to.equal(channel.commentCount);
      chai.expect(addYoutubeChannelResponse.data.dataValues.subscriberCount).to.equal(channel.subscriberCount);
      chai.expect(addYoutubeChannelResponse.data.dataValues.videoCount).to.equal(channel.videoCount);
      chai.expect(addYoutubeChannelResponse.data.dataValues.isActive).to.equal(channel.isActive);
    });

  });


  describe('# ytsController.fetchYoutubeChannels method', () => {
    it('response statusCode should be 200', () => {
      chai.expect(fetchYoutubeChannelsResponse.statusCode).to.equal(200);
    });

    it('response data should be an array', () => {
      chai.expect(fetchYoutubeChannelsResponse).to.have.property('data');
      chai.expect(fetchYoutubeChannelsResponse.data).to.be.a('array');
      chai.expect(fetchYoutubeChannelsResponse.data.length).to.equal(1);
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.be.a('object');
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('id');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('uid');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('channelId');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('channel');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('title');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('description');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('customUrl');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('thumbnailDefaultUrl');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('thumbnailMediumUrl');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('thumbnailHighUrl');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('uploadPlaylistId');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('viewCount');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('commentCount');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('subscriberCount');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('videoCount');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('isActive');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('publishedAt');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('created_at');
      chai.expect(fetchYoutubeChannelsResponse.data[0]).to.have.property('updated_at');
    });

    it('response data should have the correct attribute data types', () => {
      chai.expect(fetchYoutubeChannelsResponse.data[0].id).to.be.a('number');
      chai.expect(fetchYoutubeChannelsResponse.data[0].uid).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].channelId).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].channel).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].title).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].description).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].customUrl).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].thumbnailDefaultUrl).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].thumbnailMediumUrl).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].thumbnailHighUrl).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].uploadPlaylistId).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].viewCount).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].commentCount).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].subscriberCount).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].videoCount).to.be.a('string');
      chai.expect(fetchYoutubeChannelsResponse.data[0].isActive).to.be.a('boolean');

      chai.expect(fetchYoutubeChannelsResponse.data[0].publishedAt).to.be.a('date');
      chai.expect(fetchYoutubeChannelsResponse.data[0].created_at).to.be.a('date');
      chai.expect(fetchYoutubeChannelsResponse.data[0].updated_at).to.be.a('date');
    });
  });

  describe('# ytsController.fetchYoutubeChannel method', () => {
    it('response statusCode should be 200', () => {
      chai.expect(fetchYoutubeChannelResponse.statusCode).to.equal(200);
    });

    it('response data.dataValues should be an object', () => {
      chai.expect(fetchYoutubeChannelResponse).to.have.property('data');
      chai.expect(fetchYoutubeChannelResponse.data).to.be.a('object');
      chai.expect(fetchYoutubeChannelResponse.data).to.have.property('dataValues');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.be.a('object');
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('id');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('uid');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('channelId');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('channel');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('title');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('description');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('customUrl');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('thumbnailDefaultUrl');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('thumbnailMediumUrl');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('thumbnailHighUrl');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('uploadPlaylistId');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('viewCount');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('commentCount');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('subscriberCount');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('videoCount');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('isActive');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('publishedAt');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('created_at');
      chai.expect(fetchYoutubeChannelResponse.data.dataValues).to.have.property('updated_at');
    });

    it('response data should contain the correct values', () => {
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.channelId).to.equal(channel.channelId);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.channel).to.equal(channel.channel);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.title).to.equal(channel.title);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.description).to.equal(channel.description);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.customUrl).to.equal(channel.customUrl);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.thumbnailDefaultUrl).to.equal(channel.thumbnailDefaultUrl);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.thumbnailMediumUrl).to.equal(channel.thumbnailMediumUrl);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.thumbnailHighUrl).to.equal(channel.thumbnailHighUrl);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.uploadPlaylistId).to.equal(channel.uploadPlaylistId);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.viewCount).to.equal(channel.viewCount);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.commentCount).to.equal(channel.commentCount);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.subscriberCount).to.equal(channel.subscriberCount);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.videoCount).to.equal(channel.videoCount);
      chai.expect(fetchYoutubeChannelResponse.data.dataValues.isActive).to.equal(channel.isActive);
    });

  });

  describe('# ytsController.addYoutubeVideo method', () => {
    it('response statusCode should be 201', () => {
      chai.expect(addYoutubeVideoResponse.statusCode).to.equal(201);
    });

    it('response data.dataValues should be an object', () => {
      chai.expect(addYoutubeVideoResponse).to.have.property('data');
      chai.expect(addYoutubeVideoResponse.data).to.be.a('object');
      chai.expect(addYoutubeVideoResponse.data).to.have.property('dataValues');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.be.a('object');
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('id');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('uid');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('videoId');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('title');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('description');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('thumbnailsDefaultUrl');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('thumbnailsMediumUrl');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('thumbnailsHighUrl');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('thumbnailsStandardUrl');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('thumbnailsMaxresUrl');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('href');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('duration');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('views');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('isActive');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('isWatched');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('channelRef');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('publishedAt');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('created_at');
      chai.expect(addYoutubeVideoResponse.data.dataValues).to.have.property('updated_at');
    });

    it('response data should have the correct attribute data types', () => {
      chai.expect(addYoutubeVideoResponse.data.dataValues.id).to.be.a('number');
      chai.expect(addYoutubeVideoResponse.data.dataValues.uid).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.videoId).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.title).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.description).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.thumbnailsDefaultUrl).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.thumbnailsMediumUrl).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.thumbnailsHighUrl).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.thumbnailsStandardUrl).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.thumbnailsMaxresUrl).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.href).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.duration).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.views).to.be.a('string');
      chai.expect(addYoutubeVideoResponse.data.dataValues.isActive).to.be.a('boolean');
      chai.expect(addYoutubeVideoResponse.data.dataValues.isWatched).to.be.a('boolean');
      chai.expect(addYoutubeVideoResponse.data.dataValues.publishedAt).to.be.a('date');
      chai.expect(addYoutubeVideoResponse.data.dataValues.created_at).to.be.a('date');
      chai.expect(addYoutubeVideoResponse.data.dataValues.updated_at).to.be.a('date');
      chai.expect(addYoutubeVideoResponse.data.dataValues.channelRef).to.be.a('string');
    });

    it('response data should contain the correct values', () => {
      chai.expect(addYoutubeVideoResponse.data.dataValues.videoId).to.equal(video.videoId);
      chai.expect(addYoutubeVideoResponse.data.dataValues.title).to.equal(video.title);
      chai.expect(addYoutubeVideoResponse.data.dataValues.description).to.equal(video.description);
      chai.expect(addYoutubeVideoResponse.data.dataValues.thumbnailsDefaultUrl).to.equal(video.thumbnailsDefaultUrl);
      chai.expect(addYoutubeVideoResponse.data.dataValues.thumbnailsMediumUrl).to.equal(video.thumbnailsMediumUrl);
      chai.expect(addYoutubeVideoResponse.data.dataValues.thumbnailsHighUrl).to.equal(video.thumbnailsHighUrl);
      chai.expect(addYoutubeVideoResponse.data.dataValues.thumbnailsStandardUrl).to.equal(video.thumbnailsStandardUrl);
      chai.expect(addYoutubeVideoResponse.data.dataValues.thumbnailsMaxresUrl).to.equal(video.thumbnailsMaxresUrl);
      chai.expect(addYoutubeVideoResponse.data.dataValues.href).to.equal(video.href);
      chai.expect(addYoutubeVideoResponse.data.dataValues.duration).to.equal(video.duration);
      chai.expect(addYoutubeVideoResponse.data.dataValues.views).to.equal(video.views);
      chai.expect(addYoutubeVideoResponse.data.dataValues.isActive).to.equal(video.isActive);
      chai.expect(addYoutubeVideoResponse.data.dataValues.isWatched).to.equal(video.isWatched);
      chai.expect(addYoutubeVideoResponse.data.dataValues.publishedAt.getTime()).to.equal(video.publishedAt.getTime());
      chai.expect(addYoutubeVideoResponse.data.dataValues.channelRef).to.equal(video.channelRef);
    });

  });

});


describe("The Server's Yts controller - second batch", () => {
  let addYoutubeChannelResponse, fetchYoutubeChannelResponse, addYoutubeVideosToChannelResponse;
  let channel, videos;

  before(async () => {
    channel = {
      channel: 'test_youtube_channel',
      channelId: generateUUID(),
      title: 'test_title',
      description: 'test_description',
      customUrl: 'test_custom_url',
      thumbnailDefaultUrl: 'test_thumbnail_default_url',
      thumbnailMediumUrl: 'test_thumbnail_medium_url',
      thumbnailHighUrl: 'test_thumbnail_high_url',
      uploadPlaylistId: 'test_upload_playlist_id',
      viewCount: 'test_view_count',
      commentCount: 'test_comment_count',
      subscriberCount: 'test_subscriber_count',
      videoCount: 'test_video_count',
      isActive: true,
      publishedAt: new Date()
    };
    addYoutubeChannelResponse = await ytsController.addYoutubeChannel(reqFactory(channel), resFactory());
    fetchYoutubeChannelResponse = await ytsController.fetchYoutubeChannel(reqFactory(null, { channelId: addYoutubeChannelResponse.data.dataValues.uid }), resFactory());

    videos = [
      {
        videoId: generateUUID(),
        title: "Video One",
        description: '',
        thumbnailDefaultUrl: '',
        thumbnailMediumUrl: '',
        thumbnailHighUrl: '',
        thumbnailStandardUrl: '',
        thumbnailMaxresUrl: '',
        href: "https://www.youtube.com/watch?v=one",
        duration: "-",
        views: "-",
        isActive: true,
        isWatched: false,
        publishedAt: new Date(),
        channelRef: addYoutubeChannelResponse.data.dataValues.uid
      },
      {
        videoId: generateUUID(),
        title: "Video Two",
        description: '',
        thumbnailDefaultUrl: '',
        thumbnailMediumUrl: '',
        thumbnailHighUrl: '',
        thumbnailStandardUrl: '',
        thumbnailMaxresUrl: '',
        href: "https://www.youtube.com/watch?v=two",
        duration: "-",
        views: "-",
        isActive: true,
        isWatched: false,
        publishedAt: new Date(),
        channelRef: addYoutubeChannelResponse.data.dataValues.uid
      },
      {
        videoId: generateUUID(),
        title: "Video Three",
        description: '',
        thumbnailDefaultUrl: '',
        thumbnailMediumUrl: '',
        thumbnailHighUrl: '',
        thumbnailStandardUrl: '',
        thumbnailMaxresUrl: '',
        href: "https://www.youtube.com/watch?v=three",
        duration: "-",
        views: "-",
        isActive: true,
        isWatched: false,
        publishedAt: new Date(),
        channelRef: addYoutubeChannelResponse.data.dataValues.uid
      }
    ];

    addYoutubeVideosToChannelResponse = await ytsController.addYoutubeVideosToChannel(reqFactory({ videos: videos }, { channelId: addYoutubeChannelResponse.data.dataValues.uid }), resFactory());
  });

  after(async () => { // clean up after yourself
    await ytsController.destroyYoutubeChannel(reqFactory(null, { channelId: addYoutubeChannelResponse.data.dataValues.uid }), resFactory());
  });

  describe('# ytsController.addYoutubeVideosToChannel method', () => {
    it('response statusCode should be 201', () => {
      chai.expect(addYoutubeVideosToChannelResponse.statusCode).to.equal(201);
    });

    it('response data should be an array', () => {
      chai.expect(addYoutubeVideosToChannelResponse).to.have.property('data');
      chai.expect(addYoutubeVideosToChannelResponse.data).to.be.a('array');
      chai.expect(addYoutubeVideosToChannelResponse.data.length).to.equal(3);
      
    });

    it('each item in res data should be an object', () => {
      addYoutubeVideosToChannelResponse.data.forEach(item => {
        chai.expect(item).to.be.an('object');
      });
    });

    it('each item in response data should contain the correct attributes', () => {
      addYoutubeVideosToChannelResponse.data.forEach(item => {
        chai.expect(item).to.have.property('id');
        chai.expect(item).to.have.property('uid');
        chai.expect(item).to.have.property('videoId');
        chai.expect(item).to.have.property('title');
        chai.expect(item).to.have.property('description');
        chai.expect(item).to.have.property('thumbnailsDefaultUrl');
        chai.expect(item).to.have.property('thumbnailsMediumUrl');
        chai.expect(item).to.have.property('thumbnailsHighUrl');
        chai.expect(item).to.have.property('thumbnailsStandardUrl');
        chai.expect(item).to.have.property('thumbnailsMaxresUrl');
        chai.expect(item).to.have.property('href');
        chai.expect(item).to.have.property('duration');
        chai.expect(item).to.have.property('views');
        chai.expect(item).to.have.property('isActive');
        chai.expect(item).to.have.property('isWatched');
        chai.expect(item).to.have.property('publishedAt');
        chai.expect(item).to.have.property('created_at');
        chai.expect(item).to.have.property('updated_at');
        chai.expect(item).to.have.property('channelRef');
      });
    });

    it('response data should have the correct attribute data types', () => {
      addYoutubeVideosToChannelResponse.data.forEach(item => {
        chai.expect(item.uid).to.be.a('string');
        chai.expect(item.videoId).to.be.a('string');
        chai.expect(item.title).to.be.a('string');
        chai.expect(item.description).to.be.a('string');

        // chai.expect(item.thumbnailsDefaultUrl).to.be.a('string');
        // chai.expect(item.thumbnailsMediumUrl).to.be.a('string');
        // chai.expect(item.thumbnailsHighUrl).to.be.a('string');
        // chai.expect(item.thumbnailsStandardUrl).to.be.a('string');
        // chai.expect(item.thumbnailsMaxresUrl).to.be.a('string');

        chai.expect(item.href).to.be.a('string');
        chai.expect(item.duration).to.be.a('string');
        chai.expect(item.views).to.be.a('string');
        chai.expect(item.isActive).to.be.a('boolean');
        chai.expect(item.isWatched).to.be.a('boolean');
        chai.expect(item.publishedAt).to.be.a('date');
        chai.expect(item.created_at).to.be.a('date');
        chai.expect(item.updated_at).to.be.a('date');
        chai.expect(item.channelRef).to.be.a('string');
      });
    });

    it('response data should contain the correct values', () => {
      for (var i = 0; i < 3; i++) {
        chai.expect(addYoutubeVideosToChannelResponse.data[i].videoId).to.equal(videos[i].videoId);
        chai.expect(addYoutubeVideosToChannelResponse.data[i].title).to.equal(videos[i].title);
        chai.expect(addYoutubeVideosToChannelResponse.data[i].description).to.equal(videos[i].description);

        // chai.expect(addYoutubeVideosToChannelResponse.data[i].thumbnailsDefaultUrl).to.equal(videos[i].thumbnailsDefaultUrl);
        // chai.expect(addYoutubeVideosToChannelResponse.data[i].thumbnailsMediumUrl).to.equal(videos[i].thumbnailsMediumUrl);
        // chai.expect(addYoutubeVideosToChannelResponse.data[i].thumbnailsHighUrl).to.equal(videos[i].thumbnailsHighUrl);
        // chai.expect(addYoutubeVideosToChannelResponse.data[i].thumbnailsStandardUrl).to.equal(videos[i].thumbnailsStandardUrl);
        // chai.expect(addYoutubeVideosToChannelResponse.data[i].thumbnailsMaxresUrl).to.equal(videos[i].thumbnailsMaxresUrl);

        chai.expect(addYoutubeVideosToChannelResponse.data[i].href).to.equal(videos[i].href);
        chai.expect(addYoutubeVideosToChannelResponse.data[i].duration).to.equal(videos[i].duration);
        chai.expect(addYoutubeVideosToChannelResponse.data[i].views).to.equal(videos[i].views);
        chai.expect(addYoutubeVideosToChannelResponse.data[i].isActive).to.equal(videos[i].isActive);
        chai.expect(addYoutubeVideosToChannelResponse.data[i].isWatched).to.equal(videos[i].isWatched);
        chai.expect(addYoutubeVideosToChannelResponse.data[i].publishedAt.getTime()).to.equal(videos[i].publishedAt.getTime());
        chai.expect(addYoutubeVideosToChannelResponse.data[i].channelRef).to.equal(videos[i].channelRef);
      }
    });

  });

});


describe("The Server's Yts controller - third batch", () => {
  let addYoutubeChannelResponse, addYoutubeVideoResponse, updateYoutubeVideoResponse;
  let channel, video, videoId = generateUUID();

  before(async () => {
    channel = {
      channel: 'test_youtube_channel',
      channelId: generateUUID(),
      title: 'test_title',
      description: 'Videos explaining things with optimistic nihilism. \n\nWe are a small team who want to make science look beautiful. Because it is beautiful. \n\nCurrently we make one animation video per month. Follow us on Twitter, Facebook to get notified when a new one comes out.\n\nFAQ:\n \n- We do the videos with After Effects and Illustrator.',
      customUrl: 'inanutshell',
      thumbnailDefaultUrl: 'https://yt3.ggpht.com/a-/AAuE7mBwm16pirqqYi7Yli1eRKWClJYLV2jNxpsR2w=s88-mo-c-c0xffffffff-rj-k-no',
      thumbnailMediumUrl: 'https://yt3.ggpht.com/a-/AAuE7mBwm16pirqqYi7Yli1eRKWClJYLV2jNxpsR2w=s240-mo-c-c0xffffffff-rj-k-no',
      thumbnailHighUrl: 'https://yt3.ggpht.com/a-/AAuE7mBwm16pirqqYi7Yli1eRKWClJYLV2jNxpsR2w=s800-mo-c-c0xffffffff-rj-k-no',
      uploadPlaylistId: 'test_upload_playlist_id',
      viewCount: 'test_view_count',
      commentCount: 'test_comment_count',
      subscriberCount: 'test_subscriber_count',
      videoCount: 'test_video_count',
      isActive: true,
      publishedAt: new Date()
    };
    addYoutubeChannelResponse = await ytsController.addYoutubeChannel(reqFactory(channel), resFactory());
    video = {
      videoId: videoId,
      title: "How To Cross When A Car Stops For You",
      description: '',
      thumbnailsDefaultUrl: '',
      thumbnailsMediumUrl: '',
      thumbnailsHighUrl: '',
      thumbnailsStandardUrl: '',
      thumbnailsMaxresUrl: '',
      href: "https://www.youtube.com/watch?v=XL0J77f99K8",
      duration: "-",
      views: "-",
      isActive: true,
      isWatched: false,
      publishedAt: new Date(),
      channelRef: addYoutubeChannelResponse.data.dataValues.uid
    }
    addYoutubeVideoResponse = await ytsController.addYoutubeVideo(reqFactory(video, { channelId: addYoutubeChannelResponse.data.dataValues.uid }), resFactory());
    updateYoutubeVideoResponse = await ytsController.updateYoutubeVideo(reqFactory({ isActive: false, isWatched: true }, { uid: addYoutubeVideoResponse.data.dataValues.uid }), resFactory());

    // console.log(addYoutubeChannelResponse);
    // console.log(addYoutubeVideoResponse);
    // console.log(updateYoutubeVideoResponse);
    // console.log(addYoutubeVideosToChannelResponse.data[0]);
    // console.log(addYoutubeVideosToChannelResponse.data[0].dataValues);

  });

  after(async () => { // clean up after yourself
    await ytsController.destroyYoutubeChannel(reqFactory(null, { channelId: addYoutubeChannelResponse.data.dataValues.uid }), resFactory());
  });


  describe('# ytsController.updateYoutubeVideo method', () => {
    it('response statusCode should be 201', () => {
      chai.expect(updateYoutubeVideoResponse.statusCode).to.equal(201);
    });

    it('response data.dataValues should be an object', () => {
      chai.expect(updateYoutubeVideoResponse).to.have.property('data');
      chai.expect(updateYoutubeVideoResponse.data).to.be.a('object');
      chai.expect(updateYoutubeVideoResponse.data).to.have.property('dataValues');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.be.a('object');
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('id');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('uid');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('videoId');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('title');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('description');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('thumbnailsDefaultUrl');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('thumbnailsMediumUrl');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('thumbnailsHighUrl');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('thumbnailsStandardUrl');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('thumbnailsMaxresUrl');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('href');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('duration');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('views');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('isActive');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('isWatched');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('publishedAt');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('created_at');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('updated_at');
      chai.expect(updateYoutubeVideoResponse.data.dataValues).to.have.property('channelRef');
    });

    it('response data should have the correct attribute data types', () => {
      chai.expect(updateYoutubeVideoResponse.data.dataValues.uid).to.be.a('string');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.videoId).to.be.a('string');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.title).to.be.a('string');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.description).to.be.a('string');

      // chai.expect(updateYoutubeVideoResponse.data.dataValues.thumbnailsDefaultUrl).to.be.a('string');
      // chai.expect(updateYoutubeVideoResponse.data.dataValues.thumbnailsMediumUrl).to.be.a('string');
      // chai.expect(updateYoutubeVideoResponse.data.dataValues.thumbnailsHighUrl).to.be.a('string');
      // chai.expect(updateYoutubeVideoResponse.data.dataValues.thumbnailsStandardUrl).to.be.a('string');
      // chai.expect(updateYoutubeVideoResponse.data.dataValues.thumbnailsMaxresUrl).to.be.a('string');

      chai.expect(updateYoutubeVideoResponse.data.dataValues.href).to.be.a('string');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.duration).to.be.a('string');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.views).to.be.a('string');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.isActive).to.be.a('boolean');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.isWatched).to.be.a('boolean');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.publishedAt).to.be.a('date');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.created_at).to.be.a('date');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.updated_at).to.be.a('date');
      chai.expect(updateYoutubeVideoResponse.data.dataValues.channelRef).to.be.a('string');
    });

    it('response data should contain the correct values', () => {
      chai.expect(updateYoutubeVideoResponse.data.dataValues.videoId).to.equal(video.videoId);
      chai.expect(updateYoutubeVideoResponse.data.dataValues.title).to.equal(video.title);
      chai.expect(updateYoutubeVideoResponse.data.dataValues.description).to.equal(video.description);

      // chai.expect(updateYoutubeVideoResponse.data.dataValues.thumbnailsDefaultUrl).to.equal(video.thumbnailsDefaultUrl);
      // chai.expect(updateYoutubeVideoResponse.data.dataValues.thumbnailsMediumUrl).to.equal(video.thumbnailsMediumUrl);
      // chai.expect(updateYoutubeVideoResponse.data.dataValues.thumbnailsHighUrl).to.equal(video.thumbnailsHighUrl);
      // chai.expect(updateYoutubeVideoResponse.data.dataValues.thumbnailsStandardUrl).to.equal(video.thumbnailsStandardUrl);
      // chai.expect(updateYoutubeVideoResponse.data.dataValues.thumbnailsMaxresUrl).to.equal(video.thumbnailsMaxresUrl);

      chai.expect(updateYoutubeVideoResponse.data.dataValues.href).to.equal(video.href);
      chai.expect(updateYoutubeVideoResponse.data.dataValues.duration).to.equal(video.duration);
      chai.expect(updateYoutubeVideoResponse.data.dataValues.views).to.equal(video.views);
      chai.expect(updateYoutubeVideoResponse.data.dataValues.isActive).to.equal(false);
      chai.expect(updateYoutubeVideoResponse.data.dataValues.isWatched).to.equal(true);
      chai.expect(updateYoutubeVideoResponse.data.dataValues.publishedAt.getTime()).to.equal(video.publishedAt.getTime());
      chai.expect(updateYoutubeVideoResponse.data.dataValues.channelRef).to.equal(video.channelRef);
    });

  });

});


