  var isEmpty = require('../../utils/isEmpty');
    
    module.exports = function(args, finished) {
      if (isEmpty(args.req.body)) {
        return finished({error: 'No body payload sent in the request'});
      }
      if (!args.req.body.hello) {
        return finished({error: 'Missing hello property in the body payload'});
      }
      finished({
        ok: true,
        hello: args.req.body.hello
      });
    };