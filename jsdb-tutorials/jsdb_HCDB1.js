var jsdb = require('../jsdb_shell');


// experiments with data from the Healthcare DB work

//var doc = jsdb.use('demoAllergies', 'y2');
var doc3 = jsdb.use('demoAllergies');
//doc.value ="aasddd";
doc3.delete();
//doc3.$('y2').delete();
//doc3.$('y3').value ="assfff";
///doc3.$(['y3', 'z4']).value ="assfffzzz";
//valueZ= doc3.$(['y3', 'z4']).value;
//console.log(doc3.value);
//console.log(valueZ);
//console.log(doc3.$(['y3', 'z4']).value);
//console.log(doc3.$(['by_ptID', '2']).value);
//console.log(doc3.$(['by_ptID', '2', 'name']).value);
//console.log(doc3.$(['by_ptID', '2']).getDocument());
//console.log('by_ptID')