var express = require('express');
var server = express();
var http = require('http');
var path = require('path');
var historyApiFallback = require('connect-history-api-fallback');

// all environments
server.set('port', process.env.PORT || 8080);

// Serve static assets normally
server.use(express.static(path.resolve(__dirname, 'build')));

// Handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
server.use(historyApiFallback({ verbose: false }));

// Ensure that anything not routed is captured here
server.get('*', (req, res, next) => {

  return res
          .status(200)
          .type('text/html')
          .sendFile(path.join(__dirname, './build/index.html'));
});


http.createServer(server).listen(server.get('port'), function(){
  console.log(`Express server listening on port ${server.get('port')}`);
  console.log(`http://localhost:${server.get('port')}`);
});
