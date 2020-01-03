import chai from 'chai';
import { rdt as rdtController } from '../server/controllers';
import { reqFactory, resFactory } from '../server/util';

describe("The Server's Rdt controller - first batch", () => {
  // Batch one, in which we test adding a new Reddit user, test fetching all users
  // and test fetching that user in particular

  let addRedditUserResponse, fetchRedditUsersResponse, fetchRedditUserResponse;
  const redditUser = 'test_reddit_username';

  before(async () => {
    addRedditUserResponse = await rdtController.addRedditUser(reqFactory({ user: redditUser }), resFactory());
    fetchRedditUsersResponse = await rdtController.fetchRedditUsers(reqFactory(), resFactory());
    fetchRedditUserResponse = await rdtController.fetchRedditUser(reqFactory(null, { userId: addRedditUserResponse.data.dataValues.uid }), resFactory());
  });

  after(async () => { // clean up after yourself
    await rdtController.destroyRedditUser(reqFactory(null, { userId: addRedditUserResponse.data.dataValues.uid }), resFactory());
  });

  describe('# rdtController.addRedditUser method', () => {
    it('response statusCode should be 201', () => {
      chai.expect(addRedditUserResponse.statusCode).to.equal(201);
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(addRedditUserResponse.data.dataValues).to.have.property('id');
      chai.expect(addRedditUserResponse.data.dataValues).to.have.property('uid');
      chai.expect(addRedditUserResponse.data.dataValues).to.have.property('user');
      chai.expect(addRedditUserResponse.data.dataValues).to.have.property('isActive');
      chai.expect(addRedditUserResponse.data.dataValues).to.have.property('created_at');
      chai.expect(addRedditUserResponse.data.dataValues).to.have.property('updated_at');
    });

    it('response data should contain the correct values', () => {
      chai.expect(addRedditUserResponse.data.dataValues.user).to.equal(redditUser);
      chai.expect(addRedditUserResponse.data.dataValues.isActive).to.equal(true);
    });

  });

  describe('# rdtController.fetchRedditUsers method', () => {
    it('response statusCode should be 200', () => {
      chai.expect(fetchRedditUsersResponse.statusCode).to.equal(200);
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(fetchRedditUsersResponse.data[0]).to.have.property('id');
      chai.expect(fetchRedditUsersResponse.data[0]).to.have.property('uid');
      chai.expect(fetchRedditUsersResponse.data[0]).to.have.property('user');
      chai.expect(fetchRedditUsersResponse.data[0]).to.have.property('isActive');
      chai.expect(fetchRedditUsersResponse.data[0]).to.have.property('created_at');
      chai.expect(fetchRedditUsersResponse.data[0]).to.have.property('updated_at');
    });
  });

  describe('# rdtController.fetchRedditUser method', () => {
    it('response statusCode should be 200', () => {
      chai.expect(fetchRedditUserResponse.statusCode).to.equal(200);
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('id');
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('uid');
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('user');
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('isActive');
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('created_at');
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('updated_at');
    });

    it('response data should contain the correct values', () => {
      chai.expect(fetchRedditUserResponse.data.dataValues.user).to.equal(redditUser);
      chai.expect(fetchRedditUserResponse.data.dataValues.isActive).to.equal(true);
    });

  });


});


describe("The Server's Rdt controller - second batch", () => {
  // Batch two, in which we test updating a reddit user, and test
  // that fetching it again produces updated results

  let addRedditUserResponse, updateRedditUsersResponse, fetchRedditUserResponse;

  before(async () => {
    addRedditUserResponse = await rdtController.addRedditUser(reqFactory({ user: 'test_reddit_username' }), resFactory());
    updateRedditUsersResponse = await rdtController.updateRedditUser(reqFactory({ user: 'updated_reddit_username' }, { userId: addRedditUserResponse.data.dataValues.uid }), resFactory());
    fetchRedditUserResponse = await rdtController.fetchRedditUser(reqFactory(null, { userId: addRedditUserResponse.data.dataValues.uid }), resFactory());

    // console.log(addRedditUserResponse.data.dataValues.uid);
    // console.log(updateRedditUsersResponse);
  });

  after(async () => { // clean up after yourself
    await rdtController.destroyRedditUser(reqFactory(null, { userId: addRedditUserResponse.data.dataValues.uid }), resFactory());
  });


  describe('# rdtController.updateRedditUser method', () => {
    it('response statusCode should be 201', () => {
      chai.expect(updateRedditUsersResponse.statusCode).to.equal(201);
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(updateRedditUsersResponse.data.dataValues).to.have.property('id');
      chai.expect(updateRedditUsersResponse.data.dataValues).to.have.property('uid');
      chai.expect(updateRedditUsersResponse.data.dataValues).to.have.property('user');
      chai.expect(updateRedditUsersResponse.data.dataValues).to.have.property('isActive');
      chai.expect(updateRedditUsersResponse.data.dataValues).to.have.property('created_at');
      chai.expect(updateRedditUsersResponse.data.dataValues).to.have.property('updated_at');
    });

    it('response data should contain the correct values', () => {
      chai.expect(updateRedditUsersResponse.data.dataValues.user).to.equal('updated_reddit_username');
      chai.expect(updateRedditUsersResponse.data.dataValues.isActive).to.equal(true);
    });

    it('fetching the user still returns a res with statusCode of 200', () => {
      chai.expect(fetchRedditUserResponse.statusCode).to.equal(200);
    });

    it('the fetched user res data still contains the correct attributes', () => {
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('id');
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('uid');
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('user');
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('isActive');
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('created_at');
      chai.expect(fetchRedditUserResponse.data.dataValues).to.have.property('updated_at');
    });

    it('the fetched user res data contains the new values', () => {
      chai.expect(fetchRedditUserResponse.data.dataValues.user).to.equal('updated_reddit_username');
      chai.expect(fetchRedditUserResponse.data.dataValues.isActive).to.equal(true);
    });

  });

});


describe("The Server's Rdt controller - third batch", () => {
  // Batch three, in which we test destroying a reddit user

  let addRedditUserResponse, destroyRedditUserResponse, fetchRedditUserResponse;

  before(async () => {
    addRedditUserResponse = await rdtController.addRedditUser(reqFactory({ user: 'test_reddit_username' }), resFactory());
    destroyRedditUserResponse = await rdtController.destroyRedditUser(reqFactory(null, { userId: addRedditUserResponse.data.dataValues.uid }), resFactory());
    fetchRedditUserResponse = await rdtController.fetchRedditUser(reqFactory(null, { userId: addRedditUserResponse.data.dataValues.uid }), resFactory());
  });

  describe('# rdtController.destroyRedditUser method', () => {
    it('response statusCode should be 204', () => {
      chai.expect(destroyRedditUserResponse.statusCode).to.equal(204);
    });

    it('res contains correct message: User deleted successfully.', () => {
      chai.expect(destroyRedditUserResponse.data).to.have.property('message');
      chai.expect(destroyRedditUserResponse.data.message).to.equal('User deleted successfully.');
    });

    it('fetching the user after deletion returns an error res with statusCode of 404', () => {
      chai.expect(fetchRedditUserResponse.statusCode).to.equal(404);
    });

    it('the fetched error res data contains the correct message: ', () => {
      chai.expect(fetchRedditUserResponse.data).to.have.property('message');
      chai.expect(fetchRedditUserResponse.data.message).to.equal('User Not Found');
    });

  });

});

