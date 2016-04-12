'use strict';

const express = require('express'),
      http = require('http'),
      redis = require('redis');

const appPort = 8080,
      redisHost = process.env.REDIS_IP || '127.0.0.1',
      redisPort = process.env.REDIS_PORT || 6379;
const client = redis.createClient(redisPort, redisHost);

const app = express();

app.get('/', function(req, res, next) {
  client.incr('visits', function(err, visits) {
    if(err) return next(err);
    res.send('You have viewed this page ' + visits + ' times!');
  });
});

http.createServer(app).listen(appPort, function() {
  console.log('Listening on port ' + appPort);
});
