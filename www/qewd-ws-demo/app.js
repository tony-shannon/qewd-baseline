$(document).ready(function() {
    
    
    EWD.on('ewd-registered', function() {
      EWD.log = true;


      $('#content').text('Qewd WS  Demo is ready for use!');
    
      $('#messageBtn').on('click', function(e) {
        //alert('about to send a message');
        EWD.send({
            type: 'qewd-ws-t1'
          });
      });

      $('#messageBtn').show();
     
    });
  



    EWD.start({
    application: 'qewd-ws-demo',
    io: io
  });


});