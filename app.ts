document.addEventListener('DOMContentLoaded', () => {
	console.log('LOADED');

	class Player {
		name:string;
		letter:string;
		moves:number;
		constructor(name:string, letter:string) {
			this.name = name;
			this.letter = letter;
			this.moves = 0;
		}
	}

	class TicTacToe {
		selectedSquares:number;
		node:any;
		player1:Player;
		player2:Player;
		winner:any;
		turn:Player;
		cells:any;
		constructor() {
			this.selectedSquares = 0;
			this.node = document.getElementById('board');
			this.player1 = new Player('Player 1', 'x');
			this.player2 = new Player('Player 2', 'o');
			this.cells = document.getElementsByTagName('td');
			this.turn = this.player1;
			this.winner = null;
		}

		attachEvents():void {
			this.node.addEventListener('click', this.handleClick.bind(this));
			this.node.addEventListener('keydown', this.handleKeydown.bind(this));
		}

		handleClick(event):void {
			const cell = event.target;

			if(cell.tagName.toLowerCase() === 'td') {
				this.markSquare(cell);
			}
		}

		handleKeydown(event):void {
			const cell = event.target;
			const enterOrSpace = event.keyCode === 32 || event.keyCode === 13;

			if(enterOrSpace && cell.tagName.toLowerCase() === 'td') {
				this.markSquare(cell);
			}
		}

		switchTurns():void {
			this.turn = this.turn === this.player1 ? this.player2 : this.player1;
		}

		checkGameStatus():void {
			const playerTurn = this.turn;

			if(playerTurn.moves >= 3) {
				const isAWinner:boolean = this.checkIfWinner(playerTurn);
				if(isAWinner) {
					this.winner = playerTurn.name;
					this.endGame();			
				}
			}
			
			if(this.selectedSquares === 9) {
				this.winner = 'No one';
				this.endGame();
			}
		}

		checkIfWinner(playerTurn):boolean {
			const cells:any[] = Array.from(this.cells);
			const moves = cells.filter( (cell) => {
				return cell.classList.contains(playerTurn.letter);
			});
			
			const total:number = moves.reduce((acc, move) => {
				return acc += move.cellIndex;
			}, 0);

			if(total === 0 || total === 3 || total === 6) {
				return true;
			}

			return false;
		}

		endGame():void {
			const messageContainer = document.getElementById('game-over');
			const gameMessage = `${this.winner} has won the game!`;

			messageContainer.textContent = gameMessage;
		}

		markSquare(cell):void {
			const playerTurn:Player = this.turn === this.player1 ? this.player1 : this.player2;
			const playerClass:string = playerTurn.letter;

			if(!cell.classList.contains('x') && !cell.classList.contains('o') ) {
				cell.classList.add(playerClass);
				this.selectedSquares++;
				playerTurn.moves++;
				this.checkGameStatus();
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