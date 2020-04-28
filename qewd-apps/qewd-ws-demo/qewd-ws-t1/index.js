module.exports = function(messageObj, session, send, finished) {
    let ShoutName = messageObj.params.name.toUpperCase();
    send("test message from qewd"); // is working will the function is doing other tasks eg that UpperCase task above
    finished({wsback: 'Back from Qewd',
              shout: ShoutName  });
  };