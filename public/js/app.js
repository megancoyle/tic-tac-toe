// Initialize client socket
 var socket = io();

 // Define initial Angular module
 angular
   .module('tictactoe', [])
  //  .config([
  //    '$stateProvider',
  //    function($stateProvider){
  //      $stateProvider
  //      .state('homeIndex', {
  //        url: '',
  //        templateUrl: 'views/welcome.html'
  //      })
  //      .state('gameView', {
  //        url: '/game',
  //        templateUrl: 'views/index.html',
  //        controller: 'mainCtrl'
  //      })
  //    }
  //  ])
