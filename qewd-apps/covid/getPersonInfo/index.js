module.exports = function(messageObj, session, send, finished) {

  let userDoc = this.db.use('covidPerson', 'by_id', messageObj.params.id);
  let record = userDoc.getDocument(true);

  let labels = [];
  for (let label in record.labels) {
    labels.push(label);
  }
  delete record.labels;
  record.labels = labels;

  finished({record: record});

};