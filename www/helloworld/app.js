$(document).ready(function() {
     
        $('#messageBtn').hide();        
  
        UIJSON = {"UI1": "String1",
                  "UIN": 123}
         
        EWD.on('ewd-registered', function() {
          EWD.log = true;

       //   $('#messageBtn').on('click', function(e) {
       //     alert('about to send a message');
       //   });
          
           $('#messageBtn').on('click', function(e) {
            EWD.send({
              type: 'hello',
              UIdata: UIJSON 
            }, function(responseObj) {
              $('#content').text('Hello ' + responseObj.message.hello);
              
            });
            
        
          });
          
          $('#messageBtn').show();
        });
      
      EWD.start({
        application: 'helloworld',
        io: io
      });
    });