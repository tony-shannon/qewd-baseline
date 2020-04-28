var jsdb = require('../jsdb_shell');

var doc = jsdb.use('demo', 'x')
doc.value = 123

console.log(doc.value)
doc.value = "abcdef"
console.log(doc.name)
console.log(doc.value)

var doc2= jsdb.use('demo', 'y','z')
//doc2.value ="xyz"
//doc2.delete()

/**/
var child1 = doc2.$('child1')
child1.value = 'hello world'
var child2 = doc2.$('child2')
child2.value="another world"
var child3 = doc2.$('child3')
child3.value="last world"

console.log("doc2 exists: " + doc2.exists)
console.log("doc2 has value: " + doc2.hasValue)
console.log("doc2 has children: " + doc2.hasChildren)

console.log("child3 exists: " + child3.exists)
console.log("child3 has value: " + child3.hasValue)
console.log("child3 has children: " + child3.hasChildren)

console.log(child3.parent.name)
console.log(JSON.stringify(child3.parent.getDocument(), null, 2))
console.log(child3.parent.parent.name)
console.log(JSON.stringify(child3.parent.parent.getDocument(), null, 2))

console.log(doc2.firstChild.value)
console.log(doc2.lastChild.value)
console.log(doc2.firstChild.nextSibling.value)
console.log(doc2.lastChild.previousSibling.value)
console.log(doc2.lastChild.name)


console.log("Viewing whole 'demo' document")
var topDoc = jsdb.use('demo')
var obj = topDoc.getDocument()
console.log(JSON.stringify(obj, null, 2))

console.log("Section: Saving JSON in a Document Node")

var jsonNode = jsdb.use('demo', 'json')
var obj = {hello: {world: 123, there: 'xyz', you: 'abc123'}}
jsonNode.setDocument(obj)
var objCopy = jsonNode.getDocument()
console.log(objCopy.hello.world) // in memory access
console.log(jsonNode.$('hello').$('world').value) // access from disk - initiates 2 new nodes
console.log(jsonNode.$hello.$world.value) // access from disk - which can be used after that initiation
console.log(jsonNode.$(['hello', 'world']).value) // access from disk - cleaner 1 node initiaition

console.log("Section: Traversing JSDB Doc")
jsonNode.$('hello').forEachChild(function(name, node) {
    console.log(name)
  });
jsonNode.$('hello').forEachChild(function(name, node) {
    console.log('name: ' + name + ' + node.value: ' + node.value)
  });

  topDoc.forEachChild(function(name, lvl1Node) {
    if (lvl1Node.hasValue) {
      console.log('level 1: ' + name + ': ' + lvl1Node.value)
    }
    else {
      lvl1Node.forEachChild(function(name, lvl2Node) {   
        if (lvl2Node.hasValue) {
          console.log('  level 2: ' + name + ': ' + lvl2Node.value)
        }
        else {
          lvl2Node.forEachChild(function(name, lvl3Node) {
            if (lvl3Node.hasValue) {
              console.log('    level 3: ' + name + ': ' + lvl3Node.value)
            }
          });
        }
      });
    }
  });

  jsonNode.$hello.forEachChild({direction: 'reverse'}, function(name, node) {
    console.log(name)
  });

  var data = {
    "james": "",
    "frederick": "",
    "william": "",
    "alan": "",
    "andrew": "",
    "anthony": "",
    "brian": "",
    "brendan": "",
    "billy": "",
    "charles": "",
    "colin": ""
  }
  topDoc.$('names').setDocument(data)

  topDoc.$names.$('david').value = ''
  topDoc.$names.$('richard').value = ''
  topDoc.$names.$('Graham').value = ''

  topDoc.$names.forEachChild({range: {from: 'd'}}, function(name, node) {
    console.log(name)
  });

  topDoc.$names.forEachChild({range: {to: 'd'}}, function(name, node) {
    console.log(name)
  });
  
  console.log("applying 'range'");
  topDoc.$names.forEachChild({range: {from: 'b', to: 'd'}}, function(name, node) {
    console.log(name)
  });

  topDoc.$names.forEachChild({range: {from: 'br', to: 'cha'}}, function(name, node) {
    console.log(name)
  });
  
  topDoc.$names.forEachChild({range: {from: 'elvis', to: 'kelly'}}, function(name, node) {
    console.log(name)
  });

  console.log("applying 'prefix - br'");
  topDoc.$names.forEachChild({prefix: 'br'}, function(name, node) {
    console.log(name)
  });

  console.log("applying forEachLeafNode methods");
  topDoc.forEachLeafNode(function(value, node) {
    console.log(node.path + ': ' + value);
  });
  topDoc.$('y').forEachLeafNode(function(value, node) {
    console.log(node.path + ': ' + value);
  });

  console.log("handling arrays in JSDB");
  var arr = ["element 1", "element 2", "element 3", "element 4", "element 5"]
  topDoc.$('array').setDocument(arr)

  var arrCopy = topDoc.$array.getDocument()
  console.log(JSON.stringify(arrCopy, null, 2))   // note all out as object
 
    var objAr1 = {abc: 'xyz', arr: [1,2,3, {x: "zxc", z: [5,6,7]}, 8], q: "ggg"}
    topDoc.$array.$(5).setDocument(objAr1)
 
    var arrCopy2 = topDoc.$array.getDocument(true) // now set to getDoc(true
    console.log(JSON.stringify(arrCopy2, null, 2)) // so note some out as arrays

    topDoc.$array.$('no_longer_an_array').value = 'This should change things!'
    var arrCopy3 = topDoc.$array.getDocument(true)
    console.log(JSON.stringify(arrCopy3, null, 2))  

jsdb.close();