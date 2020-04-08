module.exports = function(messageObj, session, send, finished) {

    if (!session.authenticated) {
      return finished({error: 'Unauthenticated'});
    }
  
    let id = messageObj.params.id;
    if (!id || id === '') {
      return finished({error: 'Missing or empty user id'});
    }
  
    let doc = this.db.use('dbIssues');
    let byId = doc.$(['by_id', id]);
  
    let record = byId.getDocument(true);
    doc.$(['by_postcode', record.postcode, id]).delete();
    for (let label in record.labels) {
      doc.$(['by_labels', label, id]).delete();
    }
  
    byId.delete();
  
    finished({ok: true});
  
  };