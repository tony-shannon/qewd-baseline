    var request = require('request');
    var count = 0;
    
    module.exports = function(args, finished) {
      count++;
      var options = {
        uri: 'https://jsonplaceholder.typicode.com/todos/' + count,
        method: 'GET'
      };
      request(options, function(error, response, body) {
        finished(JSON.parse(body));
      });
    };