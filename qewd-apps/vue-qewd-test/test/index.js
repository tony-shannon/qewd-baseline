module.exports = function(messageObj, session, send, finished) {
      var incomingText = messageObj.params.text || "";
      var d = new Date();
      // return the response to the client using WebSockets (or Ajax mode)
      finished({
        text: "You sent: " + incomingText + " at " + d.toUTCString()
      });
   
};
