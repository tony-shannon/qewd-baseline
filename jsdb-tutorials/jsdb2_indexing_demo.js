// start in docker exec shell for qewd
// start in mapped folder
// invoke with "node tutorials/indexing_demo1" 

var jsdb = require('../jsdb_shell');

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
 telDoc.setDocument(data)


 var index = {
    "tweed": {
      "1": "",
      "2": ""
    },
    "munt": {
      "3": ""
    },
    "smith": {
      "4": ""
    },
    "salling": {
      "5": ""
    }
  }

  var indexDoc = jsdb.use('telDirectory', 'index', 'by_lastName')
  indexDoc.setDocument(index);

 console.log("now searching in the index");
// note this JSON structure
// "tweed": {
//    "1": "",
//    "2": ""
//  }
// so each child of tweed, has a nodeName ( 1, 2)
     // and this is being passed into the function that forEachChild can invokes
     // and in this case those nodeNames are being passed to the function as "id"
     // but we will see below this can be done with another other name 
 indexDoc.$('tweed').forEachChild(function(id) {  
    console.log(telDoc.$([id, 'tel']).value)
  });
// eg here we use another nodeName alias
  indexDoc.$('tweed').forEachChild(function(banana) {  // banana is stupid name but it proves the point 
    console.log(telDoc.$([banana, 'tel']).value)
   });
// now we use prefix

console.log("now searching with the prefix s ")

indexDoc.forEachChild({prefix: 's'}, function(lastName, node) {
    console.log("by_lastName childNode_Name " + lastName + " childNode_DocNodeObj.name " + node.name)
    console.log("by_lastName childNode_Name " + lastName + " childNode_DocNodeObj.nextSibling.name " + node.nextSibling.name)
    console.log("by_lastName childNode_Name " + lastName + " childNode_DocNodeObj.firstChild.name " + node.firstChild.name)
});

//nested forEachChild where "node" is used to trigger a nested forEachChild further
indexDoc.forEachChild({prefix: 's'}, function(lastName, node) {
   node.forEachChild(function(id) { 
    // we know that we are looking at subset of indexes and each child of Sailing and Smith is node with an index # , aka id #
    // so we use that id# to grab detail from the main telDir object and use this $([id, 'tel']) syntax to get to the area we need
    console.log(lastName + ': ' + telDoc.$([id, 'tel']).value)
    });
  });


  //adding a record
  var data = {
    "6": {
      "firstName": "David",
      "lastName": "Smythe",
      "town": "Redhill",
      "tel": "07613 173 475"
    }
  }
  var index = {
    "smythe": {
      "6": ""
    }
  }
  telDoc.setDocument(data)
  indexDoc.setDocument(index)

  indexDoc.forEachChild({prefix: 's'}, function(lastName, node) {
    node.forEachChild(function(id) {
      console.log(lastName + ': ' + telDoc.$([id, 'tel']).value)
    });
  });

  console.log("searching with prefix sm");
  indexDoc.forEachChild({prefix: 'sm'}, function(lastName, node) {
    node.forEachChild(function(id) {
      console.log(lastName + ': ' + telDoc.$([id, 'tel']).value)
    });
  });


  jsdb.close();
