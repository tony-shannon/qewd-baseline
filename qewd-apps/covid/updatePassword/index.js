const bcrypt = require('bcrypt');
var zxcvbn = require('zxcvbn');

module.exports = function(messageObj, session, send, finished) {

  if (!session.authenticated) {
    return finished({error: 'Unauthenticated'});
  }

  let id = messageObj.params.id;
  if (!id || id === '') {
    return finished({error: 'Missing or empty user id'});
  }
  let password1 = messageObj.params.password1;
  if (!password1 || password1 === '') {
    return finished({error: 'Missing or empty user password'});
  }
  let password2 = messageObj.params.password2;
  if (!password2 || password2 === '') {
    return finished({error: 'Missing or empty user password'});
  }
  if (password1 !== password2) {
    return finished({error: 'Passwords do not match'});
  }
  if (password1.length < 6) {
    return finished({error: 'Password must be at least 6 characters'});
  }

  let errorMessage;
  let dbResults = zxcvbn(password1);
  if (dbResults.score < 3) {
    errorMessage = 'That password would be too easy to guess - try again';
    if (dbResults.feedback && dbResults.feedback.warning !== '') {
      errorMessage = dbResults.feedback.warning;
      if (dbResults.feedback.suggestions) {
        dbResults.feedback.suggestions.forEach(function(suggestion) {
          errorMessage = errorMessage + '; ' + suggestion;
        });
      }
    }
    return finished({error: errorMessage});
  }

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password1, salt);

  let doc = this.db.use('covidAuth', 'by_id', messageObj.params.id);
  doc.$('password').value = hash;

  finished({ok: true});

};