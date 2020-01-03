import chai from 'chai';
import Sequelize from 'sequelize';
import { RdtUsers, RdtItems, RdtDowns } from '../server/models';
import { generateUUID } from '../server/util';

describe("The Server's RdtDowns model", () => {
  let database, user, item, downvoteId = generateUUID(), itemId = generateUUID(), thingId = generateUUID(), downvote;

  before(async () => {
    database = new Sequelize('postgresql://127.0.0.1/spydr_test', { logging: false, operatorsAliases: false });
    await RdtUsers.create({ user: 'zaiste', isActive: false });
    user = await RdtUsers.findOne({ where: { user: 'zaiste' }});
    await RdtItems.create({
      uid: itemId,
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
    });
    item = await RdtItems.findOne({ where: { thingId: `thing_${thingId}` }});
    await RdtDowns.create({ uid: downvoteId, userRef: user.uid, rdtRef: item.uid });
    downvote = await RdtDowns.findOne({ where: { userRef: user.uid, rdtRef: item.uid } });
  })

  after(async () => {
    await RdtUsers.destroy({ where: { uid: user.uid } });
    await RdtItems.destroy({ where: { thingId: `thing_${thingId}` } });
  })

  describe('# RdtDowns.findOne function', () => {
    it('should find a downvote', () => {
      chai.expect(downvote).to.be.a('object');
    });

    it('the downvote should have the correct attributes', () => {
      chai.expect(downvote).to.have.property('id');
      chai.expect(downvote).to.have.property('uid');
      chai.expect(downvote).to.have.property('userRef');
      chai.expect(downvote).to.have.property('rdtRef');
      chai.expect(downvote).to.have.property('created_at');
      chai.expect(downvote).to.have.property('updated_at');
    });

    it("the downvote's attributes should have the correct values", () => {
      chai.expect(downvote.uid).to.equal(downvoteId);
      chai.expect(downvote.userRef).to.equal(user.uid);
      chai.expect(downvote.rdtRef).to.equal(item.uid);
    });
  });

});
