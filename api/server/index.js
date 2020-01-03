// This will be our application entry. We'll setup our server here.
import http from 'http';
import app from './app'; // The express app we just created
import debug from 'debug';
import models from './models';

const PORT = normalizePort(process.env.PORT || 8000);
app.set('port', PORT);

const DBug = debug('express-test:server');

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({'error': err});
});

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 * sync() will create all table if they doesn't exist in database
 */
models.sequelize.sync().then(() => {
  server.listen(PORT);
  server.on('error', onError);
  server.on('listening', onListening);
  console.log(`Express server listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  var PORT = parseInt(val, 10);

  if (isNaN(PORT)) {
    return val; // named pipe
  }

  if (PORT >= 0) {
    return PORT; // port number
  }

  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof PORT === 'string'
    ? 'Pipe ' + PORT
    : 'Port ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  DBug('Listening on ' + bind);
};
