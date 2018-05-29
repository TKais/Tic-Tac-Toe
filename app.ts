document.addEventListener('DOMContentLoaded', () => {
	console.log('LOADED');

	class Player {
		letter:string;
		moves:object[];
		winner:object;
		constructor(letter:string) {
			this.letter = letter;
			this.moves = [];
			this.winner = null;
		}
	}

	class TicTacToe {
		selectedSquares:number;
		node:any;
		player1:Player;
		player2:Player;
		turn:object;
		constructor() {
			this.selectedSquares = 0;
			this.node = document.getElementById('board');
			this.player1 = new Player('x');
			this.player2 = new Player('o');
			this.turn = this.player1;
		}

		attachEvents():void {
			this.node.addEventListener('click', this.handleClick.bind(this));
			this.node.addEventListener('keydown', this.handleKeydown.bind(this));
		}

		handleClick(event):void {
			const cell = event.target;

			if(cell.tagName.toLowerCase() === 'td') {
				this.markSquare(cell);
				this.checkGameStatus();
			}
		}

		handleKeydown(event):void {
			const cell = event.target;
			const enterOrSpace = event.keyCode === 32 || event.keyCode === 13;

			if(enterOrSpace && cell.tagName.toLowerCase() === 'td') {
				this.markSquare(cell);
				this.checkGameStatus();
			}
		}

		switchTurns():void {
			this.turn = this.turn === this.player1 ? this.player2 : this.player1;
		}

		checkGameStatus():void {
			
			if(this.selectedSquares === 9) {
				this.endGame();
			}
		}

		endGame():void {
			const messageContainer = document.getElementById('game-over');
			const winner = 
			const gameMessage = 

		}

		markSquare(cell):void {
			const playerTurn:Player = this.turn === this.player1 ? this.player1 : this.player2;
			const playerClass:string = playerTurn.letter;

			if(!cell.classList.contains('x') && !cell.classList.contains('o') ) {
				cell.classList.add(playerClass);
				this.selectedSquares++;
				this.switchTurns();
			}
		}
	}

	function init() {
		const game = new TicTacToe();
		game.attachEvents();
	}

	init();
});