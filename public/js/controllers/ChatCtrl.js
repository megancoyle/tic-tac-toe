angular.module('ChatCtrl', []).controller('ChatController', function() {
  var socket = io();
  var chatCtrl = this;

  // chatCtrl.test = "hello world";

          chatCtrl.messages = [];
          chatCtrl.newMessage = '';

          // When a user enters a new message...
          chatCtrl.sendMessage = function () {
            // Broadcast event to server, pass along data
            socket.emit('chat message', chatCtrl.newMessage)
            chatCtrl.newMessage = '';
          }

          // When the server sends back the new message...
          socket.on('chat message', function (msg) {
            // need to trigger angular event loop to render updated data
            chatCtrl.$apply(function () {
              chatCtrl.messages.push(msg)
            })
          });

});
