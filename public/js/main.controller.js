angular
  .module('tictactoe')
  .controller('mainCtrl', [
    "$scope",
    mainController
  ])

  // Define Main controller
  function mainController($scope){
    var vm = this;
    // var player1 = 'X';
    // var player2 = 'O';
    var plays = 1;
    var turn = 0;
    vm.winner = "no one"
    vm.endGame = false;

  // set up initial board values
  vm.board = [
    [{ value: '' }, { value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }, { value: '' }]
  ];
  vm.class = "tile";

  socket.on('sync board', function (board) {
    vm.board = board;
    $scope.$apply();
    // console.log('got a new board from the server', board);
  });

  socket.on('reset game', function () {
    // console.log('resetting');

    vm.board = [
      [{ value: '' }, { value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }, { value: '' }]
    ];
    plays = 1;
    turn = 0;
    vm.endGame = false;
    vm.winner = "no one";
    $scope.$apply();
  });

  socket.on('winner info', function (winner) {
    vm.winner = winner;
    vm.endGame = true;
    $scope.$apply();
  });

  // logic for clicking tiles
  vm.onCellClick = function(row, column, value) {
    if (value !== '') {
      // console.log('already taken');
      return;
    }

    if (turn == 0) {
      // if x is up
      vm.board[row][column].value = 'X';
      turn = 1;
    } else if (turn == 1){
      // if o is up
      vm.board[row][column].value = 'O';
      turn = 0;
    }
    checkScore();
    syncBoard();
    plays++;
  }

  // clear the board
  vm.resetBoard = function() {
    socket.emit('reset game');
  }

  function syncBoard() {
    // console.log('board to sync', vm.board);
    socket.emit('sync board', vm.board);
  }

  function printWinner() {
    socket.emit('winner info', vm.winner);
  }

  function checkScore(){

      // 00, 01, 02 (top row)
      if (vm.board[0][0].value && vm.board[0][0].value === vm.board[0][1].value &&
        vm.board[0][1].value === vm.board[0][2].value) {
          vm.winner = vm.board[0][0].value;
          // console.log(winner, 'wins (top row)');
          vm.endGame = true;
          printWinner();
      // 10, 11, 12 (middle row)
      } else if (vm.board[1][0].value && vm.board[1][0].value === vm.board[1][1].value &&
        vm.board[1][1].value === vm.board[1][2].value) {
          vm.winner = vm.board[1][0].value;
          // console.log(winner, 'wins (middle row)');
          vm.endGame = true;
          printWinner();
      // 20, 21, 22 (bottom row)
      } else if (vm.board[2][0].value && vm.board[2][0].value === vm.board[2][1].value &&
        vm.board[2][1].value === vm.board[2][2].value) {
          vm.winner = vm.board[2][0].value;
          // console.log(winner, 'wins (bottom row)');
          vm.endGame = true;
          printWinner();
      // 00, 10, 20 (left column)
      } else if (vm.board[0][0].value && vm.board[0][0].value === vm.board[1][0].value &&
        vm.board[1][0].value === vm.board[2][0].value) {
          vm.winner = vm.board[0][0].value;
          // console.log(winner, 'wins (first column)');
          vm.endGame = true;
          printWinner();
      // 01, 11, 21 (middle column)
      } else if (vm.board[0][1].value && vm.board[0][1].value === vm.board[1][1].value &&
        vm.board[1][1].value === vm.board[2][1].value) {
          vm.winner = vm.board[0][1].value;
          // console.log(winner, 'wins (middle column)');
          vm.endGame = true;
          printWinner();
      // 02, 12, 22 (right column)
      } else if (vm.board[0][2].value && vm.board[0][2].value === vm.board[1][2].value &&
          vm.board[1][2].value === vm.board[2][2].value) {
            vm.winner = vm.board[0][2].value;
            // console.log(winner, 'wins (last column)');
            vm.endGame = true;
            printWinner();
      // 00, 11, 22 ( top-left, bottom-right diagonal )
      } else if (vm.board[0][0].value && vm.board[0][0].value === vm.board[1][1].value &&
            vm.board[1][1].value === vm.board[2][2].value) {
              vm.winner = vm.board[0][0].value;
              // console.log(winner, 'wins (diagonal 1)');
              vm.endGame = true;
              printWinner();
      // 02, 11, 20 ( bottom-left, top-right diagonal)
      } else if (vm.board[0][2].value && vm.board[0][2].value === vm.board[1][1].value &&
          vm.board[1][1].value === vm.board[2][0].value) {
            vm.winner = vm.board[0][2].value;
            // console.log(winner, 'wins (diagonal 1)');
            vm.endGame = true;
            printWinner();
      } else if (plays == 9) {
      // console.log('tie game!');
      vm.endGame = true;
      printWinner();
      }
    }

}
