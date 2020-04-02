module.exports = function(messageObj, session, send, finished) {

  let doc = this.db.use('covidAuth', 'by_id', messageObj.params.id);
  let record = doc.getDocument(true);

  let userDoc = this.db.use('covidPerson', 'by_id', messageObj.params.id);
  record.firstName = userDoc.$('firstName').value;
  record.lastName = userDoc.$('lastName').value;

  finished({record: record});

};