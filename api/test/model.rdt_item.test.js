import chai from 'chai';
import Sequelize from 'sequelize';
import { RdtItems } from '../server/models';
import { generateUUID } from '../server/util';

describe("The Server's RdtItems model", () => {
  let database, item, originalItem, thingId = generateUUID();

  before(async () => {
    database = new Sequelize('postgresql://127.0.0.1/spydr_test', { logging: false, operatorsAliases: false });
    originalItem = {
      uid: generateUUID(),
      thingId: `thing_${thingId}`,
      fullname: thingId,
      title: "In case you were wondering what diving in crystal clean water looks like",
      href: "https://redd.it/as44ex",
      author: "eabs1",
      subreddit: "interestingasfuck",
      url: "https://i.imgur.com/i7lpASP.gifv",
      commentsCount: 45,
      score: 648,
      publishedAt: new Date()
    };
    await RdtItems.create(originalItem);
  })

  after(async () => {
    await RdtItems.destroy({ where: { thingId: `thing_${thingId}` } });
  })

  beforeEach(async () => {
    item = await RdtItems.findOne({ where: { thingId: `thing_${thingId}` }});
  })

  describe('# RdtItems.findOne function', () => {
    it('should find a item', () => {
      chai.expect(item).to.be.a('object');
    });

    it('the item should have the correct attributes', () => {
      chai.expect(item).to.have.property('id');
      chai.expect(item).to.have.property('uid');
      chai.expect(item).to.have.property('thingId');
      chai.expect(item).to.have.property('fullname');
      chai.expect(item).to.have.property('title');
      chai.expect(item).to.have.property('href');
      chai.expect(item).to.have.property('author');
      chai.expect(item).to.have.property('subreddit');
      chai.expect(item).to.have.property('url');
      chai.expect(item).to.have.property('commentsCount');
      chai.expect(item).to.have.property('score');
      chai.expect(item).to.have.property('publishedAt');
      chai.expect(item).to.have.property('created_at');
      chai.expect(item).to.have.property('updated_at');
    });

    it("the item's attributes should have the correct values", () => {
      chai.expect(item.uid).to.equal(originalItem.uid);
      chai.expect(item.thingId).to.equal(originalItem.thingId);
      chai.expect(item.fullname).to.equal(originalItem.fullname);
      chai.expect(item.title).to.equal(originalItem.title);
      chai.expect(item.href).to.equal(originalItem.href);
      chai.expect(item.author).to.equal(originalItem.author);
      chai.expect(item.subreddit).to.equal(originalItem.subreddit);
      chai.expect(item.url).to.equal(originalItem.url);
      chai.expect(item.commentsCount).to.equal(originalItem.commentsCount);
      chai.expect(item.score).to.equal(originalItem.score);
      chai.expect(item.publishedAt.getTime()).to.equal(originalItem.publishedAt.getTime());
    });
  });
});
