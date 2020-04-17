module.exports = function(messageObj, session, send, finished) {

    if (!session.authenticated) {
      return finished({error: 'unauthenticated'});
    }
  
    let doc = this.db.use('geoJ');
  
  
    let results = [];
  
    results.push(doc);
  
    finished({summary: results});
  };
  