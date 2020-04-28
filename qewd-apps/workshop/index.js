
var jsdb = require('../../jsdb_shell');



// original CRUD functions from JSDB tutorial

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
    console.log("recordObj.lastName is " + recordObj.lastName);
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
        dataDoc.$(id).setDocument(recordObj);
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

  var data = {
    "1": {
      "firstName": "Rob",
      "lastName": "Tweed",
      "town": "Redhill",
      "tel": "07123 456 789"
    },
    "2": {
      "firstName": "Simon",
      "lastName": "Tweed",
      "town": "St Albans",
      "tel": "07712 345 678"
    },
    "3": {
      "firstName": "Chris",
      "lastName": "Munt",
      "town": "Banstead",
      "tel": "07321 987 765"
    },
    "4": {
      "firstName": "John",
      "lastName": "Smith",
      "town": "London",
      "tel": "07713 473 812"
    },
    "5": {
      "firstName": "Susanne",
      "lastName": "Salling",
      "town": "Redhill",
      "tel": "07654 321 123"
    }
  }

 var telDoc = jsdb.use('telDirectory', 'data')
 telDoc.setDocument(data);

 // ##############################################
  // refactored functions by TS - for generic use 

  function saveAndIndex2(id, recordObj, DocName, indexField, jsdb) {
    console.log("Saving and Indexing by Field:" + indexField); 
      if (id && id !== '' && recordObj && recordObj[indexField] && recordObj[indexField] !== '') {
        // set up the Document Node objects we'll need to use
        var DBDoc = jsdb.use(DocName);
        var dataDoc = DBDoc.$('data');
        var indexDoc = DBDoc.$(['index', "by_" + indexField]);
        recordObj.id = id;
        // save the data record
        dataDoc.$(id).setDocument(recordObj);
        // save the index record
        indexDoc.$([recordObj[indexField].toLowerCase(), id]).value = '';
        console.log("Saved & Indexed Record with id:" + id);
        //return true; not sure if return would be good here
      }
    }
  //example
  //NB This is invoked by other functions such as addRecord2
  //saveAndIndex2(1, recordObj, "test22", "lastName", jsdb)
  
  function addRecord2(recordObj, indexField, DocName, jsdb) {
      // first check the record object is valid
      console.log("We are adding this users record: " + recordObj.username + " by this indexField " + indexField + " with this value: " + recordObj[indexField]);
      if (recordObj && recordObj[indexField] && recordObj[indexField] !== '') {
        // set up the Document Node objects we'll need to use
        var DBDoc = jsdb.use(DocName);
        // get the next id (1 will be returned the first time this is invoked)
        var id = DBDoc.$('next_id').increment();
        // save and index the new record
        saveAndIndex2(id, recordObj, DocName, indexField, jsdb);
        console.log("Saved & Indexed record- id returned: " + id);
        return id;
      }
    }
  
function deleteRecord2(id, recordObj, indexField, DocName, jsdb) {
    // check the incoming record object for validity
    
    if (recordObj && recordObj[indexField] && recordObj[indexField] !== '') {
      // set up the Document Node objects we'll need to use
      var DBDoc = jsdb.use(DocName);
      var dataDoc = DBDoc.$('data');
      var indexDoc = DBDoc.$(['index', "by_" + indexField]);
      console.log("In process of deleting");
      //check the incoming id is valid and is already in use
      if (id && id !== '' && dataDoc.$(id).exists) {
        // get the current lastName
        
        var selectedDoc = dataDoc.$(id);
        var indexFieldLowCase = selectedDoc.$([indexField]).value.toLowerCase();
        // delete the corresponding index;
        indexDoc.$([indexFieldLowCase, id]).delete();
        // Now delete the data
        selectedDoc.delete();
        console.log("Delete done on record id: " + id);
        //dataDoc.$(id).setDocument(recordObj);
        return true;
      }
    }
  }

function editRecord2(id, recordObj, indexField, DocName, jsdb) {
    console.log ("Editing: deletion before resaving");
    var ok = deleteRecord2(id, recordObj, indexField, DocName, jsdb);
    if (ok) {
      // save and index the new data for this record
      console.log("Editing: now saving and indexing")
      saveAndIndex2(id, recordObj, DocName, indexField, jsdb);
    }
  }


  
function getByIndexField2(Search, indexField, DocName,  jsdb) {
    var nodes = [];
    if (Search !== '') {
      // set up the Document Node objects we'll need to use
      var DBDoc = jsdb.use(DocName);
      var dataDoc = DBDoc.$('data');
      var indexDoc = DBDoc.$(['index', "by_" + indexField]);
      //var indexDoc = telDoc.$(['index', 'by_lastName']);
      console.log("in search for : " + Search );
      console.log("searching in " +  JSON.stringify(indexDoc.getDocument()));
      indexDoc.forEachChild({prefix: Search}, function(childNodeName, node) {
        console.log("In GetByIndex search loop for " + Search )  
        console.log("ChildNode Name is " + childNodeName + " aka " + node.name);
        node.forEachChild(function(id) {
          console.log("ID is " + id);
          nodes.push(dataDoc.$(id).getDocument());
        });
      });
    }
    return nodes;
  }
  
function getById(DocName, id, jsdb) {
    var nodes = [];
    if (id !== '') {
      // set up the Document Node objects we'll need to use
      var DBDoc = jsdb.use(DocName);
      var dataDoc = DBDoc.$('data');
      //var indexDoc = DBDoc.$(['index', "by_" + indexField]);
      //var indexDoc = telDoc.$(['index', 'by_lastName']);
      //console.log("in search for : " + Search );
      //indexDoc.forEachChild({prefix: Search}, function(ix, node) {
      //  console.log("IX is " + ix);
      //  node.forEachChild(function(id) {
          console.log("Getting Doc based on this ID: " + id);
          nodes.push(dataDoc.$(id).getDocument());
      //  });
      //});
    }
    console.log(JSON.stringify(nodes));
    return nodes;
  }

//user from https://jsonplaceholder.typicode.com/users/1

  var user =  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }

var user2= {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  }

//example
//addRecord2(user2, "email", "UserList", jsdb);
//deleteRecord2(1, user, "email", "UserList", jsdb);
//editRecord2(4, user2, "email", "UserList", jsdb);
//getById("UserList", 1, jsdb);
getByIndexField2("sin", "email","UserList",  jsdb)