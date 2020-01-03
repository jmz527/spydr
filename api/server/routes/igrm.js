import { igrm as igrmController } from '../controllers';

module.exports = app => {

  /* POST add user. */
  app.post('/api/igrm/', igrmController.addInstagramUser);

  /* GET all users. */
  app.get('/api/igrm/', igrmController.fetchInstagramUsers);

  /* GET items. */
  app.get('/api/igrm/items', igrmController.fetchInstagramItems);

  /* GET single user. */
  app.get('/api/igrm/:userId', igrmController.fetchInstagramUser);

  /* PUT update user. */
  app.put('/api/igrm/:userId', igrmController.updateInstagramUser);

  /* DELETE user. */
  app.delete('/api/igrm/:userId', igrmController.destroyInstagramUser);

  /* GET items by user. */
  app.get('/api/igrm/:userId/items', igrmController.fetchInstagramItemsByUser);

  // /* POST add items. */
  // app.post('/api/igrm/:userId/items', igrmController.add);

  // /* PUT update item. */
  // app.put('/api/igrm/:userId/items/:channelItemId', igrmController.update);

  // /* DELETE item. */
  // app.delete('/api/igrm/:userId/items/:channelItemId', igrmController.destroy);

  // For any other request method on channel items, we're going to return "Method Not Allowed"
  app.all('/api/igrm/:userId/items', (req, res) =>
    res.status(405).send({ message: 'Method Not Allowed' })
  );

};
