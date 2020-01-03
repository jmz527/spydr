import { RdtUsers, RdtUps, RdtDowns, RdtItems } from '../models';

module.exports = {
  addRedditUser(req, res) {
    return RdtUsers
      .create({ user: req.body.user, isActive: true })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  fetchRedditUsers(req, res) {
    return RdtUsers.findAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },
  fetchRedditUser(req, res) {
    return RdtUsers
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  updateRedditUser(req, res) {
    return RdtUsers
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return user
          .update({ user: req.body.user || user.user })
          .then(() => res.status(201).send(user))  // Send back the updated user.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroyRedditUser(req, res) {
    return RdtUsers
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(400).send({ message: 'User Not Found' });
        }
        return user
          .destroy()
          .then(() => res.status(204).send({ message: 'User deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  addRedditItem(req, res) {
    return RdtItems
      .create({
        thingId: req.body.thingId,
        fullname: req.body.fullname,
        title: req.body.title,
        href: req.body.href,
        author: req.body.author,
        subreddit: req.body.subreddit,
        timestamp: req.body.timestamp,
        url: req.body.url,
        commentsCount: req.body.commentsCount,
        score: req.body.score
      })
      .then(item => res.status(201).send(item))
      .catch(error => res.status(400).send(error));
  },
  addRedditItemsInBulk(req, res) {
    return RdtItems.bulkCreate(req.body.items, { raw: true })
      .then(items => res.status(201).send(items))
      .catch(error => res.status(400).send(error));
  },
  fetchRedditItems(req, res) {
    return RdtItems.findAll()
      .then(items => res.status(200).send(items))
      .catch(error => res.status(400).send(error));
  },
  fetchRedditUpvotesByUser(req, res) {
    return RdtUps.findAll({ where: { userRef: req.params.userId }, include: [RdtItems] })
      .then(items => res.status(200).send(items))
      .catch(error => res.status(400).send(error));
  },
  fetchRedditDownvotesByUser(req, res) {
    return RdtDowns.findAll({ where: { userRef: req.params.userId }, include: [RdtItems] })
      .then(items => res.status(200).send(items))
      .catch(error => res.status(400).send(error));
  },
};
