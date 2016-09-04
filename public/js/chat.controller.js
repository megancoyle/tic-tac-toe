angular
  .module('tictactoe')
  .controller('chatCtrl', [
    "$scope",
    chatController
  ])

// Define Chat Controller
function chatController ($scope) {
  var cm = this;
  cm.messages = [];
  cm.newMessage = '';

  // When a user enters a new message...
  cm.sendMessage = function () {
    // Broadcast event to server, pass along data
    socket.emit('chat message', cm.newMessage)
    cm.newMessage = '';
  }

  // When the server sends back the new message...
  socket.on('chat message', function (msg) {
    // need to trigger angular event loop to render updated data
    $scope.$apply(function () {
      cm.messages.push(msg)
    })
    var messages = document.getElementById("messages");
    messages.scrollTop = messages.scrollHeight;
  });
}
