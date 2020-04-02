const bcrypt = require('bcrypt');

module.exports = function(messageObj, session, send, finished) {

  if (session.authenticated) {
    return finished({error: 'You are already logged in'});
  }

  if (!messageObj.params) {
    return finished({error: 'Invalid request'});
  }

  let username = messageObj.params.username;
  if (!username || username === '') {
    return finished({error: 'Invalid request'});
  }

  let password = messageObj.params.password;
  if (!password || password === '') {
    return finished({error: 'Invalid request'});
  }

  let authDoc = this.db.use('covidAuth');

  if (!authDoc.exists) {
    // first time user
    session.authenticated = true;
    session.timeout = 3600;
    return finished({ok: true, first_use: true});
  }

  let userDoc = this.db.use('covidPerson', 'by_email', username);

  if (!userDoc.exists) {
    return finished({error: 'Invalid login attempt 1'});
  }

  let id = userDoc.firstChild.value;
  let pwDoc = authDoc.$(['by_id', id]);
  let hash = pwDoc.$('password').value;

  var match = bcrypt.compareSync(password, hash);
  if (!match) {
    return finished({error: 'Invalid login attempt 2'});
  }

  session.authenticated = true;
  session.timeout = 3600;
  finished({ok: true, role: 'admin'});

};
