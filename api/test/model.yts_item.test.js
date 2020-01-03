import chai from 'chai';
import Sequelize from 'sequelize';
import { YtsChannels, YtsItems } from '../server/models';
import { generateUUID } from '../server/util';

describe("The Server's YtsItems model", () => {
  let database, channel, item, originalChannel, originalItem, channelId = generateUUID(), videoId = generateUUID();

  before(async () => {
    database = new Sequelize('postgresql://127.0.0.1/spydr_test', { logging: false, operatorsAliases: false });
    originalChannel = {
      channelId: channelId,
      channel: 'testChannel',
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
    channel = await YtsChannels.findOne({ where: { channel: 'testChannel' }});
    originalItem = {
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
      channelRef: channel.uid
    };
    await YtsItems.create(originalItem);
  })

  after(async () => {
    await YtsItems.destroy({ where: { videoId: videoId } });
    await YtsChannels.destroy({ where: { channel: 'testChannel' } })
  })

  beforeEach(async () => {
    item = await YtsItems.findOne({ where: { videoId: videoId }});
  })

  describe('# YtsItems.findOne function', () => {
    it('should find a item', () => {
      chai.expect(item).to.be.a('object');
    });

    it('the item should have the correct attributes', () => {
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
      chai.expect(item).to.have.property('created_at');
      chai.expect(item).to.have.property('updated_at');
      chai.expect(item).to.have.property('publishedAt');
      chai.expect(item).to.have.property('channelRef');
    });

    it('the item should have the correct attribute data types', () => {
      chai.expect(item.id).to.be.a('number');
      chai.expect(item.uid).to.be.a('string');
      chai.expect(item.videoId).to.be.a('string');
      chai.expect(item.title).to.be.a('string');
      chai.expect(item.description).to.be.a('string');
      chai.expect(item.thumbnailsDefaultUrl).to.be.a('string');
      chai.expect(item.thumbnailsMediumUrl).to.be.a('string');
      chai.expect(item.thumbnailsHighUrl).to.be.a('string');
      chai.expect(item.thumbnailsStandardUrl).to.be.a('string');
      chai.expect(item.thumbnailsMaxresUrl).to.be.a('string');
      chai.expect(item.href).to.be.a('string');
      chai.expect(item.duration).to.be.a('string');
      chai.expect(item.views).to.be.a('string');
      chai.expect(item.isActive).to.be.a('boolean');
      chai.expect(item.isWatched).to.be.a('boolean');
      chai.expect(item.publishedAt).to.be.a('date');
      chai.expect(item.channelRef).to.be.a('string');
      chai.expect(item.created_at).to.be.a('date');
      chai.expect(item.updated_at).to.be.a('date');
    });

    it("the item's attributes should have the correct values", () => {
      chai.expect(item.videoId).to.equal(originalItem.videoId);
      chai.expect(item.title).to.equal(originalItem.title);
      chai.expect(item.href).to.equal(originalItem.href);
      chai.expect(item.duration).to.equal(originalItem.duration);
      chai.expect(item.views).to.equal(originalItem.views);
      chai.expect(item.isActive).to.equal(originalItem.isActive);
      chai.expect(item.isWatched).to.equal(originalItem.isWatched);
      chai.expect(item.publishedAt.getTime()).to.equal(originalItem.publishedAt.getTime());
      chai.expect(item.channelRef).to.equal(originalItem.channelRef);
    });
  });
});
