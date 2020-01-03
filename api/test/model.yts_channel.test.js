import chai from 'chai';
import Sequelize from 'sequelize';
import { YtsChannels } from '../server/models';
import { generateUUID } from '../server/util';

describe("The Server's YtsChannels model", () => {
  let database, originalChannel, channel, channelId = generateUUID();

  before(async () => {
    database = new Sequelize('postgresql://127.0.0.1/spydr_test', { logging: false, operatorsAliases: false });
    originalChannel = {
      channelId: channelId,
      channel: 'zaiste',
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
      isActive: false,
      publishedAt: new Date()
    };
    await YtsChannels.create(originalChannel);
  })

  after(async () => {
    await YtsChannels.destroy({ where: { channel: 'zaiste' } });
  })

  beforeEach(async () => {
    channel = await YtsChannels.findOne({ where: { channelId: channelId }});
  })

  describe('# YtsChannels.findOne function', () => {
    it('should find a channel', () => {
      chai.expect(channel).to.be.a('object');
    });

    it('the channel should have the correct attributes', () => {
      chai.expect(channel).to.have.property('id');
      chai.expect(channel).to.have.property('uid');
      chai.expect(channel).to.have.property('channelId');
      chai.expect(channel).to.have.property('channel');
      chai.expect(channel).to.have.property('title');
      chai.expect(channel).to.have.property('description');
      chai.expect(channel).to.have.property('customUrl');
      chai.expect(channel).to.have.property('thumbnailDefaultUrl');
      chai.expect(channel).to.have.property('thumbnailMediumUrl');
      chai.expect(channel).to.have.property('thumbnailHighUrl');
      chai.expect(channel).to.have.property('uploadPlaylistId');
      chai.expect(channel).to.have.property('viewCount');
      chai.expect(channel).to.have.property('commentCount');
      chai.expect(channel).to.have.property('subscriberCount');
      chai.expect(channel).to.have.property('videoCount');
      chai.expect(channel).to.have.property('isActive');
      chai.expect(channel).to.have.property('publishedAt');
      chai.expect(channel).to.have.property('created_at');
      chai.expect(channel).to.have.property('updated_at');
    });

    it('the channel should have the correct attribute data types', () => {
      chai.expect(channel.id).to.be.a('number');
      chai.expect(channel.uid).to.be.a('string');
      chai.expect(channel.channelId).to.be.a('string');
      chai.expect(channel.channel).to.be.a('string');
      chai.expect(channel.title).to.be.a('string');
      chai.expect(channel.description).to.be.a('string');
      chai.expect(channel.customUrl).to.be.a('string');
      chai.expect(channel.thumbnailDefaultUrl).to.be.a('string');
      chai.expect(channel.thumbnailMediumUrl).to.be.a('string');
      chai.expect(channel.thumbnailHighUrl).to.be.a('string');
      chai.expect(channel.uploadPlaylistId).to.be.a('string');
      chai.expect(channel.viewCount).to.be.a('string');
      chai.expect(channel.commentCount).to.be.a('string');
      chai.expect(channel.subscriberCount).to.be.a('string');
      chai.expect(channel.videoCount).to.be.a('string');
      chai.expect(channel.isActive).to.be.a('boolean');
      chai.expect(channel.publishedAt).to.be.a('date');
      chai.expect(channel.created_at).to.be.a('date');
      chai.expect(channel.updated_at).to.be.a('date');
    });

    it("the channel's attributes should have the correct values", () => {
      chai.expect(channel.channelId).to.equal(channelId);
      chai.expect(channel.channel).to.equal(originalChannel.channel);
      chai.expect(channel.title).to.equal(originalChannel.title);
      chai.expect(channel.description).to.equal(originalChannel.description);
      chai.expect(channel.customUrl).to.equal(originalChannel.customUrl);
      chai.expect(channel.thumbnailDefaultUrl).to.equal(originalChannel.thumbnailDefaultUrl);
      chai.expect(channel.thumbnailMediumUrl).to.equal(originalChannel.thumbnailMediumUrl);
      chai.expect(channel.thumbnailHighUrl).to.equal(originalChannel.thumbnailHighUrl);
      chai.expect(channel.uploadPlaylistId).to.equal(originalChannel.uploadPlaylistId);
      chai.expect(channel.viewCount).to.equal(originalChannel.viewCount);
      chai.expect(channel.commentCount).to.equal(originalChannel.commentCount);
      chai.expect(channel.subscriberCount).to.equal(originalChannel.subscriberCount);
      chai.expect(channel.videoCount).to.equal(originalChannel.videoCount);
      chai.expect(channel.isActive).to.equal(originalChannel.isActive);
      chai.expect(channel.publishedAt.getTime()).to.equal(originalChannel.publishedAt.getTime());
    });
  });
});
