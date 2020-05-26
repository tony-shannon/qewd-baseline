module.exports = function(messageObj, session, send, finished) {
    let data2session = messageObj.params.starData;
    send("test message from qewd"); // is working will the function is doing other tasks eg that UpperCase task above
    session.data.$('sessionStarWarsHero').value = "R2D2";  
    session.data.$('sessionStarWarsWarrior').setDocument(data2session);    
    finished({wsback: 'Saved session data to Qewd',
             stuff: session.data.$('sessionStarWarsWarrior').getDocument()
          });
  };