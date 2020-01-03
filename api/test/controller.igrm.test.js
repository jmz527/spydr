import chai from 'chai';
import { igrm as igrmController } from '../server/controllers';
import { generateUUID, reqFactory, resFactory } from '../server/util';

describe("The Server's Igrm controller - first batch", () => {
  // Batch one, in which we test adding a new instagram user, fetching users,
  // and fetching that user specifically

  let addInstagramUserResponse, fetchInstagramUsersResponse, fetchInstagramUserResponse;
  const usersName = 'test_instagram_username';

  before(async () => {
    addInstagramUserResponse = await igrmController.addInstagramUser(reqFactory({ name: usersName }), resFactory());
    fetchInstagramUsersResponse = await igrmController.fetchInstagramUsers(reqFactory(), resFactory());
    fetchInstagramUserResponse = await igrmController.fetchInstagramUser(reqFactory(null, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
  });

  after(async () => { // clean up after yourself
    await igrmController.destroyInstagramUser(reqFactory(null, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
  });


  describe('# igrmController.addInstagramUser method', () => {
    it('response statusCode should be 201', () => {
      chai.expect(addInstagramUserResponse.statusCode).to.equal(201);
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(addInstagramUserResponse.data.dataValues).to.have.property('id');
      chai.expect(addInstagramUserResponse.data.dataValues).to.have.property('uid');
      chai.expect(addInstagramUserResponse.data.dataValues).to.have.property('name');
      chai.expect(addInstagramUserResponse.data.dataValues).to.have.property('isActive');
      chai.expect(addInstagramUserResponse.data.dataValues).to.have.property('created_at');
      chai.expect(addInstagramUserResponse.data.dataValues).to.have.property('updated_at');
    });

    it('response data should contain the correct values', () => {
      chai.expect(addInstagramUserResponse.data.dataValues.name).to.equal(usersName);
      chai.expect(addInstagramUserResponse.data.dataValues.isActive).to.equal(true);
    });
  });

  describe('# igrmController.fetchInstagramUsers method', () => {
    it('response statusCode should be 200', () => {
      chai.expect(fetchInstagramUsersResponse.statusCode).to.equal(200);
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(fetchInstagramUsersResponse.data[0]).to.have.property('id');
      chai.expect(fetchInstagramUsersResponse.data[0]).to.have.property('uid');
      chai.expect(fetchInstagramUsersResponse.data[0]).to.have.property('name');
      chai.expect(fetchInstagramUsersResponse.data[0]).to.have.property('isActive');
      chai.expect(fetchInstagramUsersResponse.data[0]).to.have.property('created_at');
      chai.expect(fetchInstagramUsersResponse.data[0]).to.have.property('updated_at');
    });
  });

  describe('# igrmController.fetchInstagramUser method', () => {
    it('response statusCode should be 200', () => {
      chai.expect(fetchInstagramUserResponse.statusCode).to.equal(200);
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('id');
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('uid');
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('name');
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('isActive');
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('created_at');
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('updated_at');
    });

    it('response data should contain the correct values', () => {
      chai.expect(fetchInstagramUserResponse.data.dataValues.name).to.equal(usersName);
      chai.expect(fetchInstagramUserResponse.data.dataValues.isActive).to.equal(true);
    });

  });

});


describe("The Server's Igrm controller - second batch", () => {
  // Batch two, in which we test updating an instagram user, and test
  // that fetching it again produces updated results

  let addInstagramUserResponse, updateInstagramUsersResponse, fetchInstagramUserResponse;
  const usersName = 'test_instagram_username', updatedUsersName = 'updated_instagram_username';

  before(async () => {
    addInstagramUserResponse = await igrmController.addInstagramUser(reqFactory({ name: usersName }), resFactory());
    updateInstagramUsersResponse = await igrmController.updateInstagramUser(reqFactory({ name: updatedUsersName, isActive: false }, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
    fetchInstagramUserResponse = await igrmController.fetchInstagramUser(reqFactory(null, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
  });

  after(async () => { // clean up after yourself
    await igrmController.destroyInstagramUser(reqFactory(null, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
  });


  describe('# igrmController.updateInstagramUser method', () => {
    it('response statusCode should be 201', () => {
      chai.expect(updateInstagramUsersResponse.statusCode).to.equal(201);
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(updateInstagramUsersResponse.data.dataValues).to.have.property('id');
      chai.expect(updateInstagramUsersResponse.data.dataValues).to.have.property('uid');
      chai.expect(updateInstagramUsersResponse.data.dataValues).to.have.property('name');
      chai.expect(updateInstagramUsersResponse.data.dataValues).to.have.property('isActive');
      chai.expect(updateInstagramUsersResponse.data.dataValues).to.have.property('created_at');
      chai.expect(updateInstagramUsersResponse.data.dataValues).to.have.property('updated_at');
    });

    it('response data should contain the correct values', () => {
      chai.expect(updateInstagramUsersResponse.data.dataValues.name).to.equal(updatedUsersName);
      chai.expect(updateInstagramUsersResponse.data.dataValues.isActive).to.equal(false);
    });

    it('fetching the user still returns a res with statusCode of 200', () => {
      chai.expect(fetchInstagramUserResponse.statusCode).to.equal(200);
    });

    it('the fetched user res data still contains the correct attributes', () => {
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('id');
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('uid');
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('name');
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('isActive');
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('created_at');
      chai.expect(fetchInstagramUserResponse.data.dataValues).to.have.property('updated_at');
    });

    it('the fetched user res data contains the new values', () => {
      chai.expect(fetchInstagramUserResponse.data.dataValues.name).to.equal(updatedUsersName);
      chai.expect(fetchInstagramUserResponse.data.dataValues.isActive).to.equal(false);
    });

    it('the fetched user res data has correct timestamps', () => {
      chai.expect(fetchInstagramUserResponse.data.dataValues.created_at.getTime()).to.equal(addInstagramUserResponse.data.dataValues.created_at.getTime());
      chai.expect(fetchInstagramUserResponse.data.dataValues.updated_at.getTime()).to.not.equal(addInstagramUserResponse.data.dataValues.updated_at.getTime());
    });

  });

});


describe("The Server's Igrm controller - third batch", () => {
  // Batch three, in which we test destroying an instagram user

  let addInstagramUserResponse, destroyInstagramUserResponse, fetchInstagramUserResponse;

  before(async () => {
    addInstagramUserResponse = await igrmController.addInstagramUser(reqFactory({ name: 'test_instagram_username' }), resFactory());
    destroyInstagramUserResponse = await igrmController.destroyInstagramUser(reqFactory(null, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
    fetchInstagramUserResponse = await igrmController.fetchInstagramUser(reqFactory(null, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
  });

  describe('# igrmController.destroyInstagramUser method', () => {
    it('response statusCode should be 204', () => {
      chai.expect(destroyInstagramUserResponse.statusCode).to.equal(204);
    });

    it('res contains correct message: User deleted successfully.', () => {
      chai.expect(destroyInstagramUserResponse.data).to.have.property('message');
      chai.expect(destroyInstagramUserResponse.data.message).to.equal('User deleted successfully.');
    });

    it('fetching the user after deletion returns an error res with statusCode of 404', () => {
      chai.expect(fetchInstagramUserResponse.statusCode).to.equal(404);
    });

    it('the fetched error res data contains the correct message: ', () => {
      chai.expect(fetchInstagramUserResponse.data).to.have.property('message');
      chai.expect(fetchInstagramUserResponse.data.message).to.equal('User Not Found');
    });

  });

});



describe("The Server's Igrm controller - fourth batch", () => {
  // Batch four, in which we test adding an instagram item, fetching all items and fetching items by their users

  let addInstagramUserResponse, addInstagramItemResponse, fetchInstagramItemsResponse, fetchInstagramUserItemsResponse;
  let newItem, picId = generateUUID(), code = picId.slice(0, 11);

  before(async () => {
    addInstagramUserResponse = await igrmController.addInstagramUser(reqFactory({ name: 'test_instagram_username' }), resFactory());
    newItem = {
      picId: picId,
      code: code,
      lowResImg: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s320x320/e35/20184605_135833860341606_6079928134822526976_n.jpg",
      thumbImg: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s150x150/e35/c3.0.1074.1074/20184605_135833860341606_6079928134822526976_n.jpg",
      link: "https://www.instagram.com/p/BW2pLXUg7oj/",
      loc: "Southampton",
      cap: "Bargate",
      publishedAt: new Date(),
      userRef: addInstagramUserResponse.data.dataValues.uid
    };
    addInstagramItemResponse = await igrmController.addInstagramItem(reqFactory(newItem), resFactory());
    fetchInstagramItemsResponse = await igrmController.fetchInstagramItems(reqFactory(), resFactory());
    fetchInstagramUserItemsResponse = await igrmController.fetchInstagramItemsByUser(reqFactory(null, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
  });

  after(async () => { // clean up after yourself
    await igrmController.destroyInstagramUser(reqFactory(null, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
  });

  describe('# igrmController.addInstagramItem method', () => {
    it('response statusCode should be 201', () => {
      chai.expect(addInstagramItemResponse.statusCode).to.equal(201);
    });

    it('response data should contain the correct attributes', () => {
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('id');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('uid');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('picId');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('code');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('lowResImg');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('thumbImg');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('link');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('loc');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('cap');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('publishedAt');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('userRef');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('created_at');
      chai.expect(addInstagramItemResponse.data.dataValues).to.have.property('updated_at');
    });

    it('response data should contain the correct values', () => {
      chai.expect(addInstagramItemResponse.data.dataValues.picId).to.equal(newItem.picId);
      chai.expect(addInstagramItemResponse.data.dataValues.code).to.equal(newItem.code);
      chai.expect(addInstagramItemResponse.data.dataValues.lowResImg).to.equal(newItem.lowResImg);
      chai.expect(addInstagramItemResponse.data.dataValues.thumbImg).to.equal(newItem.thumbImg);
      chai.expect(addInstagramItemResponse.data.dataValues.link).to.equal(newItem.link);
      chai.expect(addInstagramItemResponse.data.dataValues.loc).to.equal(newItem.loc);
      chai.expect(addInstagramItemResponse.data.dataValues.cap).to.equal(newItem.cap);
      chai.expect(addInstagramItemResponse.data.dataValues.publishedAt.getTime()).to.equal(newItem.publishedAt.getTime());
      chai.expect(addInstagramItemResponse.data.dataValues.userRef).to.equal(newItem.userRef);
    });

  });

  describe('# igrmController.fetchInstagramItems method', () => {
    it('response statusCode should be 200', () => {
      chai.expect(fetchInstagramItemsResponse.statusCode).to.equal(200);
    });

    it('response data should be an array with one item in it', () => {
      chai.expect(fetchInstagramItemsResponse).to.have.property('data');
      chai.expect(fetchInstagramItemsResponse.data).to.be.an('array');
      chai.expect(fetchInstagramItemsResponse.data.length).to.equal(1);
    });

    it('the one item in res data should be an object', () => {
      chai.expect(fetchInstagramItemsResponse.data[0]).to.be.an('object');
    });

    it('the one item in res data should have the correct attributes', () => {
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('id');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('uid');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('picId');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('code');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('lowResImg');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('thumbImg');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('link');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('loc');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('cap');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('publishedAt');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('userRef');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('created_at');
      chai.expect(fetchInstagramItemsResponse.data[0]).to.have.property('updated_at');
    });

    it('the one item in res data should have the correct values', () => {
      chai.expect(fetchInstagramItemsResponse.data[0].picId).to.equal(newItem.picId);
      chai.expect(fetchInstagramItemsResponse.data[0].code).to.equal(newItem.code);
      chai.expect(fetchInstagramItemsResponse.data[0].lowResImg).to.equal(newItem.lowResImg);
      chai.expect(fetchInstagramItemsResponse.data[0].thumbImg).to.equal(newItem.thumbImg);
      chai.expect(fetchInstagramItemsResponse.data[0].link).to.equal(newItem.link);
      chai.expect(fetchInstagramItemsResponse.data[0].loc).to.equal(newItem.loc);
      chai.expect(fetchInstagramItemsResponse.data[0].cap).to.equal(newItem.cap);
      chai.expect(fetchInstagramItemsResponse.data[0].publishedAt.getTime()).to.equal(newItem.publishedAt.getTime());
      chai.expect(fetchInstagramItemsResponse.data[0].userRef).to.equal(newItem.userRef);
    });
  });

  describe('# igrmController.fetchInstagramItemsByUser method', () => {
    it('response statusCode should be 200', () => {
      chai.expect(fetchInstagramUserItemsResponse.statusCode).to.equal(200);
    });

    it('response data should be an array with one item in it', () => {
      chai.expect(fetchInstagramUserItemsResponse).to.have.property('data');
      chai.expect(fetchInstagramUserItemsResponse.data).to.be.an('array');
      chai.expect(fetchInstagramUserItemsResponse.data.length).to.equal(1);
    });

    it('the one item in res data should be an object', () => {
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.be.an('object');
    });

    it('the one item in res data should have the correct attributes', () => {
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('id');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('uid');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('picId');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('code');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('lowResImg');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('thumbImg');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('link');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('loc');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('cap');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('publishedAt');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('userRef');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('created_at');
      chai.expect(fetchInstagramUserItemsResponse.data[0]).to.have.property('updated_at');
    });

    it('the one item in res data should have the correct values', () => {
      chai.expect(fetchInstagramUserItemsResponse.data[0].picId).to.equal(newItem.picId);
      chai.expect(fetchInstagramUserItemsResponse.data[0].code).to.equal(newItem.code);
      chai.expect(fetchInstagramUserItemsResponse.data[0].lowResImg).to.equal(newItem.lowResImg);
      chai.expect(fetchInstagramUserItemsResponse.data[0].thumbImg).to.equal(newItem.thumbImg);
      chai.expect(fetchInstagramUserItemsResponse.data[0].link).to.equal(newItem.link);
      chai.expect(fetchInstagramUserItemsResponse.data[0].loc).to.equal(newItem.loc);
      chai.expect(fetchInstagramUserItemsResponse.data[0].cap).to.equal(newItem.cap);
      chai.expect(fetchInstagramUserItemsResponse.data[0].publishedAt.getTime()).to.equal(newItem.publishedAt.getTime());
      chai.expect(fetchInstagramUserItemsResponse.data[0].userRef).to.equal(newItem.userRef);
    });

  });

});

describe("The Server's Igrm controller - fifth batch", () => {
  // Batch five, in which we test adding instagram items in bulk, fetching all items and fetching items by their users

  let addInstagramUserResponse, addInstagramItemsInBulkResponse, fetchInstagramItemsResponse, fetchInstagramUserItemsResponse;
  let items, picId = generateUUID(), code = picId.slice(0, 11);

  before(async () => {
    addInstagramUserResponse = await igrmController.addInstagramUser(reqFactory({ name: 'test_instagram_username' }), resFactory());
    items = [
      {
        picId: picId,
        code: code,
        lowResImg: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s320x320/e35/20184605_135833860341606_6079928134822526976_n.jpg",
        thumbImg: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s150x150/e35/c3.0.1074.1074/20184605_135833860341606_6079928134822526976_n.jpg",
        link: "https://www.instagram.com/p/BW2pLXUg7oj/",
        loc: "Southampton",
        cap: "Bargate",
        publishedAt: new Date(),
        userRef: addInstagramUserResponse.data.dataValues.uid
      },
      {
        picId: "1562624329462583273_2074513016",
        code: "BWvjoxrAA_p",
        lowResImg: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s320x320/e35/20184215_409121042818452_8061400636723298304_n.jpg",
        thumbImg: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s150x150/e35/c3.0.1074.1074/20184215_409121042818452_8061400636723298304_n.jpg",
        link: "https://www.instagram.com/p/BWvjoxrAA_p/",
        loc: "Musée Rodin",
        cap: "Deep in thought, this one",
        publishedAt: new Date(parseInt("1500499357000")),
        userRef: addInstagramUserResponse.data.dataValues.uid
      },
      {
        picId: "1560090527095994425_2074513016",
        code: "BWmjhGVAjg5",
        lowResImg: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s320x320/e35/20066781_435295783522683_7030521229127712768_n.jpg",
        thumbImg: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s150x150/e35/c135.0.809.809/20066781_435295783522683_7030521229127712768_n.jpg",
        link: "https://www.instagram.com/p/BWmjhGVAjg5/",
        loc: "Brockenhurst, Hampshire",
        cap: null,
        publishedAt: new Date(parseInt("1500197305000")),
        userRef: addInstagramUserResponse.data.dataValues.uid
      }
    ];
    addInstagramItemsInBulkResponse = await igrmController.addInstagramItemsInBulk(reqFactory({ items }), resFactory());
    fetchInstagramItemsResponse = await igrmController.fetchInstagramItems(reqFactory(), resFactory());
    fetchInstagramUserItemsResponse = await igrmController.fetchInstagramItemsByUser(reqFactory(null, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
  });

  after(async () => { // clean up after yourself
    await igrmController.destroyInstagramUser(reqFactory(null, { userId: addInstagramUserResponse.data.dataValues.uid }), resFactory());
  });


  describe('# igrmController.addInstagramItemsInBulk method', () => {
    it('response statusCode should be 201', () => {
      chai.expect(addInstagramItemsInBulkResponse.statusCode).to.equal(201);
    });

    it('response data should be an array with three items in it', () => {
      chai.expect(addInstagramItemsInBulkResponse).to.have.property('data');
      chai.expect(addInstagramItemsInBulkResponse.data).to.be.an('array');
      chai.expect(addInstagramItemsInBulkResponse.data.length).to.equal(3);
    });

    it('each item in res data should be an object', () => {
      addInstagramItemsInBulkResponse.data.forEach(item => {
        chai.expect(item).to.be.an('object');
      });
    });

    it('each item in response data should contain the correct attributes', () => {
      addInstagramItemsInBulkResponse.data.forEach(item => {
        chai.expect(item.dataValues).to.have.property('uid');
        chai.expect(item.dataValues).to.have.property('picId');
        chai.expect(item.dataValues).to.have.property('code');
        chai.expect(item.dataValues).to.have.property('lowResImg');
        chai.expect(item.dataValues).to.have.property('thumbImg');
        chai.expect(item.dataValues).to.have.property('link');
        chai.expect(item.dataValues).to.have.property('loc');
        chai.expect(item.dataValues).to.have.property('cap');
        chai.expect(item.dataValues).to.have.property('publishedAt');
        chai.expect(item.dataValues).to.have.property('userRef');
        chai.expect(item.dataValues).to.have.property('created_at');
        chai.expect(item.dataValues).to.have.property('updated_at');
      });
    });

    it('each item in response data should contain the correct values', () => {
      for (var i = 0; i < 3; i++) {
        chai.expect(addInstagramItemsInBulkResponse.data[i].dataValues.picId).to.equal(items[i].picId);
        chai.expect(addInstagramItemsInBulkResponse.data[i].dataValues.code).to.equal(items[i].code);
        chai.expect(addInstagramItemsInBulkResponse.data[i].dataValues.lowResImg).to.equal(items[i].lowResImg);
        chai.expect(addInstagramItemsInBulkResponse.data[i].dataValues.thumbImg).to.equal(items[i].thumbImg);
        chai.expect(addInstagramItemsInBulkResponse.data[i].dataValues.link).to.equal(items[i].link);
        chai.expect(addInstagramItemsInBulkResponse.data[i].dataValues.loc).to.equal(items[i].loc);
        chai.expect(addInstagramItemsInBulkResponse.data[i].dataValues.cap).to.equal(items[i].cap);
        chai.expect(addInstagramItemsInBulkResponse.data[i].dataValues.publishedAt.getTime()).to.equal(items[i].publishedAt.getTime());
        chai.expect(addInstagramItemsInBulkResponse.data[i].dataValues.userRef).to.equal(items[i].userRef);        
      }
    });

  });


  describe('# igrmController.fetchInstagramItems method', () => {
    it('response statusCode should be 200', () => {
      chai.expect(fetchInstagramItemsResponse.statusCode).to.equal(200);
    });

    it('response data should be an array with three items in it', () => {
      chai.expect(fetchInstagramItemsResponse).to.have.property('data');
      chai.expect(fetchInstagramItemsResponse.data).to.be.an('array');
      chai.expect(fetchInstagramItemsResponse.data.length).to.equal(3);
    });

    it('each item in res data should be an object', () => {
      fetchInstagramItemsResponse.data.forEach(item => {
        chai.expect(item).to.be.an('object');
      });
    });

    it('each item in response data should contain the correct attributes', () => {
      fetchInstagramItemsResponse.data.forEach(item => {
        chai.expect(item.dataValues).to.have.property('uid');
        chai.expect(item.dataValues).to.have.property('picId');
        chai.expect(item.dataValues).to.have.property('code');
        chai.expect(item.dataValues).to.have.property('lowResImg');
        chai.expect(item.dataValues).to.have.property('thumbImg');
        chai.expect(item.dataValues).to.have.property('link');
        chai.expect(item.dataValues).to.have.property('loc');
        chai.expect(item.dataValues).to.have.property('cap');
        chai.expect(item.dataValues).to.have.property('publishedAt');
        chai.expect(item.dataValues).to.have.property('userRef');
        chai.expect(item.dataValues).to.have.property('created_at');
        chai.expect(item.dataValues).to.have.property('updated_at');
      });
    });

    it('each item in response data should contain the correct values', () => {
      for (var i = 0; i < 3; i++) {
        chai.expect(fetchInstagramItemsResponse.data[i].dataValues.picId).to.equal(items[i].picId);
        chai.expect(fetchInstagramItemsResponse.data[i].dataValues.code).to.equal(items[i].code);
        chai.expect(fetchInstagramItemsResponse.data[i].dataValues.lowResImg).to.equal(items[i].lowResImg);
        chai.expect(fetchInstagramItemsResponse.data[i].dataValues.thumbImg).to.equal(items[i].thumbImg);
        chai.expect(fetchInstagramItemsResponse.data[i].dataValues.link).to.equal(items[i].link);
        chai.expect(fetchInstagramItemsResponse.data[i].dataValues.loc).to.equal(items[i].loc);
        chai.expect(fetchInstagramItemsResponse.data[i].dataValues.cap).to.equal(items[i].cap);
        chai.expect(fetchInstagramItemsResponse.data[i].dataValues.publishedAt.getTime()).to.equal(items[i].publishedAt.getTime());
        chai.expect(fetchInstagramItemsResponse.data[i].dataValues.userRef).to.equal(items[i].userRef);        
      }
    });
  });


  describe('# igrmController.fetchInstagramUserItemsResponse method', () => {
    it('response statusCode should be 200', () => {
      chai.expect(fetchInstagramUserItemsResponse.statusCode).to.equal(200);
    });

    it('response data should be an array with three items in it', () => {
      chai.expect(fetchInstagramUserItemsResponse).to.have.property('data');
      chai.expect(fetchInstagramUserItemsResponse.data).to.be.an('array');
      chai.expect(fetchInstagramUserItemsResponse.data.length).to.equal(3);
    });

    it('each item in res data should be an object', () => {
      fetchInstagramUserItemsResponse.data.forEach(item => {
        chai.expect(item).to.be.an('object');
      });
    });

    it('each item in response data should contain the correct attributes', () => {
      fetchInstagramUserItemsResponse.data.forEach(item => {
        chai.expect(item.dataValues).to.have.property('uid');
        chai.expect(item.dataValues).to.have.property('picId');
        chai.expect(item.dataValues).to.have.property('code');
        chai.expect(item.dataValues).to.have.property('lowResImg');
        chai.expect(item.dataValues).to.have.property('thumbImg');
        chai.expect(item.dataValues).to.have.property('link');
        chai.expect(item.dataValues).to.have.property('loc');
        chai.expect(item.dataValues).to.have.property('cap');
        chai.expect(item.dataValues).to.have.property('publishedAt');
        chai.expect(item.dataValues).to.have.property('userRef');
        chai.expect(item.dataValues).to.have.property('created_at');
        chai.expect(item.dataValues).to.have.property('updated_at');
      });
    });

    it('each item in response data should contain the correct values', () => {
      for (var i = 0; i < 3; i++) {
        chai.expect(fetchInstagramUserItemsResponse.data[i].dataValues.picId).to.equal(items[i].picId);
        chai.expect(fetchInstagramUserItemsResponse.data[i].dataValues.code).to.equal(items[i].code);
        chai.expect(fetchInstagramUserItemsResponse.data[i].dataValues.lowResImg).to.equal(items[i].lowResImg);
        chai.expect(fetchInstagramUserItemsResponse.data[i].dataValues.thumbImg).to.equal(items[i].thumbImg);
        chai.expect(fetchInstagramUserItemsResponse.data[i].dataValues.link).to.equal(items[i].link);
        chai.expect(fetchInstagramUserItemsResponse.data[i].dataValues.loc).to.equal(items[i].loc);
        chai.expect(fetchInstagramUserItemsResponse.data[i].dataValues.cap).to.equal(items[i].cap);
        chai.expect(fetchInstagramUserItemsResponse.data[i].dataValues.publishedAt.getTime()).to.equal(items[i].publishedAt.getTime());
        chai.expect(fetchInstagramUserItemsResponse.data[i].dataValues.userRef).to.equal(items[i].userRef);        
      }
    });
  });
});


