import chai from 'chai';
import Sequelize from 'sequelize';
import { IgrmUsers } from '../server/models';

describe("The Server's IgrmUsers model", () => {
  let database, user;

  before(async () => {
    database = new Sequelize('postgresql://127.0.0.1/spydr_test', { logging: false, operatorsAliases: false });
  })

  beforeEach(async () => {
    await IgrmUsers.create({ name: 'zaiste', isActive: false });
    user = await IgrmUsers.findOne({ where: { name: 'zaiste' }});
  })

  afterEach(async () => {
    await IgrmUsers.destroy({ where: { uid: user.uid } });
  })

  describe('# IgrmUsers.findOne function', () => {
    it('should find a user', () => {
      chai.expect(user).to.be.a('object');
    });

    it('the user should have the correct attributes', () => {
      chai.expect(user).to.have.property('id');
      chai.expect(user).to.have.property('uid');
      chai.expect(user).to.have.property('name');
      chai.expect(user).to.have.property('isActive');
      chai.expect(user).to.have.property('created_at');
      chai.expect(user).to.have.property('updated_at');
    });

    it("the user's attributes should have the correct values", () => {
      chai.expect(user.name).to.equal('zaiste');
      chai.expect(user.isActive).to.equal(false);
    });
  });
});
