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


      $('#setSessionDataBtn').on('click', function(e) {

        let hero = {
          "name": "Luke Skywalker",
          "religion": "Jedi",
          "gender": "male",
          "mentor": "Yoda"

        }
      
        let msg = {
          type: 'qewd-session-t2',
          params: {
          "name": "Tony",
          "age": 49,
          "job": "Doctor",
          "starData": hero
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
  
 /*
   
 
*/




    EWD.start({
    application: 'qewd-ws-demo',
    io: io
  });


});