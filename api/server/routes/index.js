import igrm from './igrm';
import rdt from './rdt';
import yts from './yts';

module.exports = (app) => {

  // Routes
  // app.use('/', index)

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Spydr API.'
  }));

  igrm(app);
  rdt(app);
  yts(app);

};
