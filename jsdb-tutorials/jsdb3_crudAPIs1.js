// start in docker exec shell for qewd
// start in mapped folder
// invoke with "node tutorials/crudAPIs1" 

var jsdb = require('../jsdb_shell');

function saveAndIndex(id, recordObj, jsdb) {
    if (id && id !== '' && recordObj && recordObj.lastName && recordObj.lastName !== '') {
      // set up the Document Node objects we'll need to use
      var telDoc = jsdb.use('telDirectory');
      var dataDoc = telDoc.$('data');
      var indexDoc = telDoc.$(['index', 'by_lastName']);
      recordObj.id = id;
      // save the data record
      dataDoc.$(id).setDocument(recordObj);
      // save the index record
      indexDoc.$([recordObj.lastName.toLowerCase(), id]).value = '';
    }
  }


  function addRecord(recordObj, jsdb) {
    // first check the record object is valid
    if (recordObj && recordObj.lastName && recordObj.lastName !== '') {
      // set up the Document Node objects we'll need to use
      var telDoc = jsdb.use('telDirectory');
      // get the next id (1 will be returned the first time this is invoked)
      var id = telDoc.$('next_id').increment();
      // save and index the new record
      saveAndIndex(id, recordObj, jsdb);
      return id;
    }
  }

  function deleteRecord(id, recordObj, jsdb) {
    // check the incoming record object for validity
    if (recordObj && recordObj.lastName && recordObj.lastName !== '') {
      // set up the Document Node objects we'll need to use
      var telDoc = jsdb.use('telDirectory');
      var dataDoc = telDoc.$('data');
      var indexDoc = telDoc.$(['index', 'by_lastName']);
      //check the incoming id is valid and is already in use
      if (id && id !== '' && dataDoc.$(id).exists) {
        // get the current lastName
        var selectedDoc = dataDoc.$(id);
        var lastName = selectedDoc.$('lastName').value.toLowerCase();
        // delete the corresponding index;
        indexDoc.$([lastName, id]).delete();
        // Now delete the data
        selectedDoc.delete();
        // dataDoc.$(id).setDocument(recordObj);  //this seems to be a mistaken line
        return true;
      }
    }
  }


  function editRecord(id, recordObj, jsdb) {
    var ok = deleteRecord(id, recordObj, jsdb);
    if (ok) {
      // save and index the new data for this record
      saveAndIndex(id, recordObj, jsdb);
    }
  }

  function getByLastName(lastName, jsdb) {
    var nodes = [];
    if (lastName !== '') {
      // set up the Document Node objects we'll need to use
      var telDoc = jsdb.use('telDirectory');
      var dataDoc = telDoc.$('data');
      var indexDoc = telDoc.$(['index', 'by_lastName']);
      indexDoc.forEachChild({prefix: lastName}, function(ix, node) {
        node.forEachChild(function(id) {
          nodes.push(dataDoc.$(id).getDocument());
        });
      });
    }
    return nodes;
  }

  var telDoc = jsdb.use('telDirectory');
  telDoc.delete();

  var record = {
    firstName: 'Rob',
    lastName: 'Tweed',
    town: 'Redhill',
    tel: '07123 456 789'
  }
  addRecord(record, jsdb)


  record = {
    firstName: 'Simon',
    lastName: 'Tweed',
    town: 'St Albans',
    tel: '07712 345 678'
  }
  addRecord(record, jsdb)

console.log("searching Tel Directory via functions")

var nodes = getByLastName('tweed', jsdb)
console.log(nodes);

record = {
    firstName: 'Simon',
    lastName: 'Smith',
    town: 'St Albans',
    tel: '07712 345 678'
  }
  editRecord(2, record, jsdb)

  console.log("Nodes with tweed")
  nodes = getByLastName('tweed', jsdb)
  console.log(nodes);
  console.log("Nodes with smith")
  nodes = getByLastName('smith', jsdb)
  console.log(nodes);



  jsdb.close();
