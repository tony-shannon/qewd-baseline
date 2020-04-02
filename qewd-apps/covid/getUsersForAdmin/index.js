module.exports = function(messageObj, session, send, finished) {

  if (!session.authenticated) {
    return finished({error: 'unauthenticated'});
  }

  let doc = this.db.use('covidPerson');

  let byId = doc.$('by_id');
  let byUser = doc.$(['by_labels', 'user']);

  let results = [];
  let properties = messageObj.params.properties;
  byUser.forEachChild(function(id) {
    let result = {};
    let personDoc = byId.$(id);
    result.id = personDoc.$('id').value;
    properties.forEach(function(property) {
      if (property !== 'id') {
        result[property] = personDoc.$(property).value;
      }
    });
    results.push(result);
  });

  finished({summary: results});
};



