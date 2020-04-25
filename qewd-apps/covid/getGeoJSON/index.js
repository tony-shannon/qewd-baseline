module.exports = function(messageObj, session, send, finished) {

    if (!session.authenticated) {
      return finished({error: 'unauthenticated'});
    }
  
    let geoJSONplaces = this.db.use('geoJ', 'JSONdata', 'places');
  
    let places = geoJSONplaces.getDocument(true);
    geoJSONplaces.forEachChild(function(name, node) {
      if (name === messageObj.params.id) {
        console.log("well node#: " + name + "matches the incoming id request of geoJSON" )
      }
      console.log(JSON.stringify(node));
      console.log(typeof name);
      console.log(typeof messageObj.params.id);
      console.log("nodeName is" + name);
    });

    /*
    geoJSONplaces.forEachLeafNode(function(value, node) {
      if (value === messageObj.params.id) {
        console.log("well node#: matches the incoming id request of geoJSON" )
      }
      console.log(JSON.stringify(node));
      console.log(typeof value);
      console.log(typeof messageObj.params.id);
      console.log("nodeName_fELN is" + node.name);
    });
*/

   // let resultsD = [];

   console.log("##########-------- #######");
   console.log("MsgObj Params: " + JSON.stringify(messageObj.params))
   console.log("<<<<<<<<<<<------- >>>>>>>") 
   //let docV = doc;
    //console.log("DocValue is " + doc.value)
    //resultsD.push(doc);
  
    finished({geoPlaces: places,
              //docValue: resultsD,
            //  docB: doc
            });
  };
  