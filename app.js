document.addEventListener('DOMContentLoaded', function () {
    console.log('LOADED');
    var Player = /** @class */ (function () {
        function Player(name, letter) {
            this.name = name;
            this.letter = letter;
            this.moves = 0;
        }
        return Player;
    }());
    var TicTacToe = /** @class */ (function () {
        function TicTacToe() {
            this.selectedSquares = 0;
            this.node = document.getElementById('board');
            this.player1 = new Player('Player 1', 'x');
            this.player2 = new Player('Player 2', 'o');
            this.cells = document.getElementsByTagName('td');
            this.turn = this.player1;
            this.winner = null;
        }
        TicTacToe.prototype.attachEvents = function () {
            this.node.addEventListener('click', this.handleClick.bind(this));
            this.node.addEventListener('keydown', this.handleKeydown.bind(this));
        };
        TicTacToe.prototype.handleClick = function (event) {
            var cell = event.target;
            if (cell.tagName.toLowerCase() === 'td') {
                this.markSquare(cell);
            }
        };
        TicTacToe.prototype.handleKeydown = function (event) {
            var cell = event.target;
            var enterOrSpace = event.keyCode === 32 || event.keyCode === 13;
            if (enterOrSpace && cell.tagName.toLowerCase() === 'td') {
                this.markSquare(cell);
            }
        };
        TicTacToe.prototype.switchTurns = function () {
            this.turn = this.turn === this.player1 ? this.player2 : this.player1;
        };
        TicTacToe.prototype.checkGameStatus = function () {
            var playerTurn = this.turn;
            if (playerTurn.moves >= 3) {
                var isAWinner = this.checkIfWinner(playerTurn);
                if (isAWinner) {
                    this.winner = playerTurn.name;
                    this.endGame();
                }
            }
            if (this.selectedSquares === 9) {
                this.winner = 'No one';
                this.endGame();
            }
        };
        TicTacToe.prototype.checkIfWinner = function (playerTurn) {
            var cells = Array.from(this.cells);
            var moves = cells.filter(function (cell) {
                console.log('CELL', cell);
                return cell.classList.contains(playerTurn.letter);
            });
            console.log(moves);
            var total = moves.reduce(function (acc, move) {
                return acc += move.cellIndex;
            }, 0);
            if (total === 0 || total === 3 || total === 6) {
                return true;
            }
            return false;
        };
        TicTacToe.prototype.endGame = function () {
            var messageContainer = document.getElementById('game-over');
            var gameMessage = this.winner + " has won the game!";
            messageContainer.textContent = gameMessage;
        };
        TicTacToe.prototype.markSquare = function (cell) {
            var playerTurn = this.turn === this.player1 ? this.player1 : this.player2;
            var playerClass = playerTurn.letter;
            if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
                cell.classList.add(playerClass);
                this.selectedSquares++;
                playerTurn.moves++;
                this.checkGameStatus();
                this.switchTurns();
            }
        };
        return TicTacToe;
    }());
    function init() {
        var game = new TicTacToe();
        game.attachEvents();
    }
    init();
});
