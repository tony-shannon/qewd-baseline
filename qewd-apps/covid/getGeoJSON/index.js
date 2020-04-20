module.exports = function(messageObj, session, send, finished) {

    if (!session.authenticated) {
      return finished({error: 'unauthenticated'});
    }
  
    let doc = this.db.use('geoJ');
  
    let results = doc.getDocument(true);
   // let resultsD = [];
   //let docV = doc;
    //console.log("DocValue is " + doc.value)
    resultsD.push(doc);
  
    finished({summary: results,
              //docValue: resultsD,
              docB: doc});
  };
  