$(document).ready(function() {
    
    
    EWD.on('ewd-registered', function() {
      EWD.log = true;


      $('#content').text('Qewd WS  Demo is ready for use!');
    
      

      $('#messageBtn').on('click', function(e) {
      
      let msg = {
        type: 'qewd-ws-t1',
        params: {
        "name": "Tony",
        "age": 49,
        "job": "Doctor"
        }
      }

       
        //alert('about to send a message');
        EWD.send(
          msg
          //{
        //    type: 'qewd-ws-t1',
        //    params: {"name": "tonyshannon", "age": 49}
         // }
          , function(responseObj) {
            $('#content').text('Got this back: ' + responseObj.message.wsback);
          }
          );


      });

      $('#messageBtn').show();
     
    });
  



    EWD.start({
    application: 'qewd-ws-demo',
    io: io
  });


});