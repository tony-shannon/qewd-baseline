module.exports = function(messageObj, session, send, finished) {
  
  var jsDB= this.documentStore.use('WebSockDb1');
  var jsDBDoc=jsDB.$('demo');
  
  testData = {
    "key1": "TonySKey#2",
    "key2": "TonysDataA",
    "key3": messageObj.UIdata
  }
  
  jsDBDoc.setDocument(testData);
  
  var DBout = jsDBDoc.getDocument();
  console.log("output is " + JSON.stringify(DBout));
  
      finished({
        hello: 'world',
        out: DBout,
        fromUI: messageObj.UIdata
        });
    };