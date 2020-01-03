import { rdt as rdtController } from '../controllers';

module.exports = app => {

  /* POST add user. */
  app.post('/api/rdt/', rdtController.addRedditUser);

  /* GET all users. */
  app.get('/api/rdt/', rdtController.fetchRedditUsers);

  /* GET all items. */
  app.get('/api/rdt/items', rdtController.fetchRedditItems);

  /* GET single user. */
  app.get('/api/rdt/:userId', rdtController.fetchRedditUser);

  /* PUT update user. */
  app.put('/api/rdt/:userId', rdtController.updateRedditUser);

  /* DELETE user. */
  app.delete('/api/rdt/:userId', rdtController.destroyRedditUser);

  /* GET items by user. */
  app.get('/api/rdt/:userId/upvotes', rdtController.fetchRedditUpvotesByUser);
  app.get('/api/rdt/:userId/downvotes', rdtController.fetchRedditDownvotesByUser);

  // /* POST add channel item. */
  // app.post('/api/rdt/:userId/items', channelItemsController.add);

  // /* PUT update channel item. */
  // app.put('/api/rdt/:userId/items/:channelItemId', channelItemsController.update);

  // /* DELETE channel item. */
  // app.delete('/api/rdt/:userId/items/:channelItemId', channelItemsController.destroy);

  // For any other request method on channel items, we're going to return "Method Not Allowed"
  app.all('/api/rdt/:userId/items', (req, res) =>
    res.status(405).send({ message: 'Method Not Allowed' })
  );

};
