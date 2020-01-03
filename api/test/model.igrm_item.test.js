import chai from 'chai';
import Sequelize from 'sequelize';
import { IgrmUsers, IgrmItems } from '../server/models';
import { generateUUID } from '../server/util';

describe("The Server's IgrmItems model", () => {
  let database, user, item, originalItem, picId = generateUUID(), code = picId.slice(0, 11);

  before(async () => {
    database = new Sequelize('postgresql://127.0.0.1/spydr_test', { logging: false, operatorsAliases: false });
    await IgrmUsers.create({ name: 'itemOwner', isActive: false });
    user = await IgrmUsers.findOne({ where: { name: 'itemOwner' }});
    originalItem = {
      picId: picId,
      code: code,
      lowResImg: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s320x320/e35/20184605_135833860341606_6079928134822526976_n.jpg",
      thumbImg: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s150x150/e35/c3.0.1074.1074/20184605_135833860341606_6079928134822526976_n.jpg",
      link: "https://www.instagram.com/p/BW2pLXUg7oj/",
      loc: "Southampton",
      cap: "Bargate",
      publishedAt: new Date(),
      userRef: user.uid
    };

    await IgrmItems.create(originalItem);
  })

  after(async () => {
    await IgrmItems.destroy({ where: { picId: picId } });
    await IgrmUsers.destroy({ where: { uid: user.uid } });
  })

  beforeEach(async () => {
    item = await IgrmItems.findOne({ where: { picId: picId }});
  })

  describe('# IgrmItems.findOne function', () => {
    it('should find a item', () => {
      chai.expect(item).to.be.a('object');
    });

    it('the item should have the correct attributes', () => {
      chai.expect(item).to.have.property('id');
      chai.expect(item).to.have.property('uid');
      chai.expect(item).to.have.property('picId');
      chai.expect(item).to.have.property('code');
      chai.expect(item).to.have.property('lowResImg');
      chai.expect(item).to.have.property('thumbImg');
      chai.expect(item).to.have.property('link');
      chai.expect(item).to.have.property('loc');
      chai.expect(item).to.have.property('cap');
      chai.expect(item).to.have.property('publishedAt');
      chai.expect(item).to.have.property('userRef');
      chai.expect(item).to.have.property('created_at');
      chai.expect(item).to.have.property('updated_at');
    });

    it("the item's attributes should have the correct values", () => {
      chai.expect(item.picId).to.equal(picId);
      chai.expect(item.code).to.equal(code);
      chai.expect(item.lowResImg).to.equal(originalItem.lowResImg);
      chai.expect(item.thumbImg).to.equal(originalItem.thumbImg);
      chai.expect(item.link).to.equal(originalItem.link);
      chai.expect(item.loc).to.equal(originalItem.loc);
      chai.expect(item.cap).to.equal(originalItem.cap);
      chai.expect(item.publishedAt.getTime()).to.equal(originalItem.publishedAt.getTime());
      chai.expect(item.userRef).to.equal(originalItem.userRef);
    });
  });
});
