import chai from 'chai';
import Sequelize from 'sequelize';
import { RdtUsers } from '../server/models';

describe("The Server's RdtUsers model", () => {
  let database, user;

  before(async () => {
    database = new Sequelize('postgresql://127.0.0.1/spydr_test', { logging: false, operatorsAliases: false });
  })

  beforeEach(async () => {
    await RdtUsers.create({ user: 'zaiste', isActive: false });
    user = await RdtUsers.findOne({ where: { user: 'zaiste' }});
  })

  afterEach(async () => {
    await RdtUsers.destroy({ where: { uid: user.uid } });
  })

  describe('# RdtUsers.findOne function', () => {
    it('should find a user', () => {
      chai.expect(user).to.be.a('object');
    });

    it('the user should have the correct attributes', () => {
      chai.expect(user).to.have.property('id');
      chai.expect(user).to.have.property('uid');
      chai.expect(user).to.have.property('user');
      chai.expect(user).to.have.property('isActive');
      chai.expect(user).to.have.property('created_at');
      chai.expect(user).to.have.property('updated_at');
    });

    it("the user's attributes should have the correct values", () => {
      chai.expect(user.user).to.equal('zaiste');
      chai.expect(user.isActive).to.equal(false);
    });
  });
});
