const soundex = require('soundex-code');

module.exports = function(messageObj, session, send, finished) {

  if (!session.authenticated) {
    return finished({error: 'Unauthenticated'});
  }

  let allowEmpty = {
    address2: true,
    email: true,
    yob: true,
    comments: true
  };

  let error = '';
  let delim = '';
  for (let name in messageObj.params) {
    if (!allowEmpty[name] && messageObj.params[name] === '') {
      error = error + delim + name + ': Missing value';
      delim = '; ';
    }
  }
  if (error !== '') {
    return finished({error: error});
  }

  let id = messageObj.params.id;
  if (!id || id === '') {
    return finished({error: 'Missing or empty user id'});
  }

  let doc = this.db.use('dbOrg');
  let newRecord = messageObj.params;

  let labels = {};
  newRecord.labels.forEach(function(label) {
    labels[label] = true;
  });

  newRecord.soundex = soundex(newRecord.lastName, 6);

  if (id === 'new-record') {
    id = doc.$('id_counter').increment();
    newRecord.id = id;
  }
  else {
    let oldRecord = doc.$(['by_id', id]).getDocument(true);
    if (oldRecord.postCode !== newRecord.postCode) {
      doc.$(['by_postcode', oldRecord.postcode, id]).delete();
    }
    if (oldRecord.soundex !== newRecord.soundex) {
      doc.$(['by_soundex', oldRecord.soundex, id]).delete();
    }
    if (oldRecord.email !== newRecord.email) {
      doc.$(['by_email', oldRecord.email, id]).delete();
    }
    for (let label in oldRecord.labels) {
      if (!labels[label]) {
        doc.$(['by_labels', label, id]).delete();
      }
    }
  }
  delete newRecord.labels;
  newRecord.labels = labels;

  doc.$(['by_id', id]).delete();
  doc.$(['by_id', id]).setDocument(newRecord);
  doc.$(['by_postcode', newRecord.postcode, id]).value = id;
  doc.$(['by_soundex', newRecord.soundex, id]).value = id;
  doc.$(['by_email', newRecord.email, id]).value = id;
  for (label in labels) {
    doc.$(['by_labels', label, id]).value = id;
  }

  finished({ok: true});


};