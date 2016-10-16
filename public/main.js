/* global $ */
//main js file, inits the page, creates globals for socket, input and messages

$(document).ready(function() {
    var socket = io();
    
    //sets up the username and input values
    var username = $('input#username');
    var input = $('input#messages');
    
    //sets up the output section to display the messages in
    var un = $('#un');
    var messages = $('#rec_messages');

     
    //addMessage function to display the emitter messages from the server
    var addName = function( theName) {
       un.append('<div>' +  theName + " says:" + '</div>');
       
    };
    var addMessage = function( message) {
       messages.append('<div>' +  message + '</div>');
    };

    //keydown checks for input boxes
    username.on('keydown', function(event) {
      if (event.keyCode == 13) {
           return;
            }
    });



    //
    input.on('keydown', function(event) {
       if (event.keyCode != 13) {
            return;
        }

    //gets the values by var from the input boxes
    var theName = username.val();
    var message = input.val();
    
    //calls the addMessage function to display the message you typed into the above div, local
    addName(theName);
    addMessage(message);

    //sends the message 'message' type to the server with the message content
    socket.emit('theName' ,  theName);
    socket.emit('message' ,  message);

    //resets the input for the message, but leaves the username there
    username.val('');
    input.val('');
    
    });
    
//listener for incoming messages.  if it receives one, pass the message onto the addMessage func for display
socket.on('theName', addName);
socket.on('message', addMessage);

});//end doc.ready