import { IgrmUsers, IgrmItems } from '../models';

module.exports = {
  addInstagramUser(req, res) {
    return IgrmUsers
      .create({ name: req.body.name, isActive: true })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  fetchInstagramUsers(req, res) {
    return IgrmUsers.findAll()
      .then(names => res.status(200).json(names))
      .catch(error => res.status(400).send(error));
  },
  fetchInstagramUser(req, res) {
    return IgrmUsers
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  updateInstagramUser(req, res) {
    return IgrmUsers
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User Not Found' });
        }
        return user
          .update({
            name: req.body.hasOwnProperty('name') ? req.body.name : user.name,
            isActive: req.body.hasOwnProperty('isActive') ? req.body.isActive : user.isActive
          })
          .then(() => res.status(201).send(user))  // Send back the updated user.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroyInstagramUser(req, res) {
    return IgrmUsers
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
  addInstagramItem(req, res) {
    return IgrmItems
      .create({
        picId: req.body.picId,
        code: req.body.code,
        lowResImg: req.body.lowResImg,
        thumbImg: req.body.thumbImg,
        link: req.body.link,
        loc: req.body.loc,
        cap: req.body.cap,
        publishedAt: req.body.publishedAt,
        userRef: req.body.userRef
      })
      .then(item => res.status(201).send(item))
      .catch(error => res.status(400).send(error));
  },
  addInstagramItemsInBulk(req, res) {
    return IgrmItems.bulkCreate(req.body.items, { raw: true })
      .then(items => res.status(201).send(items))
      .catch(error => res.status(400).send(error));
  },
  fetchInstagramItems(req, res) {
    return IgrmItems.findAll()
      .then(items => {
        return res.status(200).send(items);
      })
      .catch(error => res.status(400).send(error));
  },
  fetchInstagramItemsByUser(req, res) {
    return IgrmItems
      .findAll({ where: { userRef: req.params.userId } })
      .then(items => {
        return res.status(200).send(items);
      })
      .catch(error => res.status(400).send(error));
  }
};
