angular.module('MainCtrl', []).controller('MainController', function() {
	var vm = this;
	// var player1 = 'X';
	// var player2 = 'O';
	var plays = 1;
	var turn = 0;

	vm.tagline = 'Start the game!';

	vm.board = [
		[{ value: '' }, { value: '' }, { value: '' }],
		[{ value: '' }, { value: '' }, { value: '' }],
		[{ value: '' }, { value: '' }, { value: '' }]
	]
	vm.class = "tile";

	vm.onCellClick = function(row, column, value) {
		if (value !== '') {
			console.log('already taken');
		} else {
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
		}
		plays++;
	}

	function checkScore(){

		// 00, 01, 02 (top row)
		if (vm.board[0][0].value && vm.board[0][0].value === vm.board[0][1].value &&
				vm.board[0][1].value === vm.board[0][2].value) {
					var winner = vm.board[0][0].value;
					console.log(winner, 'wins (top row)');
		// 10, 11, 12 (middle row)
		} else if (vm.board[1][0].value && vm.board[1][0].value === vm.board[1][1].value &&
				vm.board[1][1].value === vm.board[1][2].value) {
					var winner = vm.board[1][0].value;
					console.log(winner, 'wins (middle row)');
		// 20, 21, 22 (bottom row)
		} else if (vm.board[2][0].value && vm.board[2][0].value === vm.board[2][1].value &&
				vm.board[2][1].value === vm.board[2][2].value) {
					var winner = vm.board[2][0].value;
					console.log(winner, 'wins (bottom row)');
		// 00, 10, 20 (left column)
		} else if (vm.board[0][0].value && vm.board[0][0].value === vm.board[1][0].value &&
				vm.board[1][0].value === vm.board[2][0].value) {
					var winner = vm.board[0][0].value;
					console.log(winner, 'wins (first column)');
		// 01, 11, 21 (middle column)
		} else if (vm.board[0][1].value && vm.board[0][1].value === vm.board[1][1].value &&
				vm.board[1][1].value === vm.board[2][1].value) {
					var winner = vm.board[0][1].value;
					console.log(winner, 'wins (middle column)');
		// 02, 12, 22 (right column)
		} else if (vm.board[0][2].value && vm.board[0][2].value === vm.board[1][2].value &&
					vm.board[1][2].value === vm.board[2][2].value) {
						var winner = vm.board[0][2].value;
						console.log(winner, 'wins (last column)');
		// 00, 11, 22 ( top-left, bottom-right diagonal )
		} else if (vm.board[0][0].value && vm.board[0][0].value === vm.board[1][1].value &&
						vm.board[1][1].value === vm.board[2][2].value) {
							var winner = vm.board[0][0].value;
							console.log(winner, 'wins (diagonal 1)');
		// 02, 11, 20 ( bottom-left, top-right diagonal)
	} else if (vm.board[0][2].value && vm.board[0][2].value === vm.board[1][1].value &&
					vm.board[1][1].value === vm.board[2][0].value) {
						var winner = vm.board[0][2].value;
						console.log(winner, 'wins (diagonal 1)');
		} else if (plays == 9) {
			console.log('tie game!');
		}
	}


});
