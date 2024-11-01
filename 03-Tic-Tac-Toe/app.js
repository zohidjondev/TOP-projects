function TicTacToe() {
  this.board = ["", "", "", "", "", "", "", "", ""];
  this.isGameRunning = true;
  this.turnOfPlayer = 0;

  this.player1Points = 0;
  this.player2Points = 0;

  // Initialize game
  this.init = () => {
    this.player1Name =
      document.querySelector("input.player1").value || "Player 1";
    this.player2Name =
      document.querySelector("input.player2").value || "Player 2";

    this.turnOfPlayerName = this.player1Name;
    this._print(`${this.turnOfPlayerName} starts the game`);

    this._render();
  };

  // Change player turn
  this._changeTurn = () => {
    this.turnOfPlayer = this.turnOfPlayer === 0 ? 1 : 0;
    this.turnOfPlayerName =
      this.turnOfPlayer === 0 ? this.player1Name : this.player2Name;
    this._print(`${this.turnOfPlayerName}'s turn`);
  };

  // Handle a move
  this._move = (cell) => {
    if (this.board[cell] === "") {
      this.board[cell] = this.turnOfPlayer === 0 ? "X" : "O";
      document.querySelectorAll(".cell")[cell].textContent = this.board[cell];
      this._checkWin();
      if (this.isGameRunning) this._changeTurn();
    } else {
      this._print("You cannot move to this cell");
    }
  };

  // Check win condition
  this._checkWin = () => {
    const winCond = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of winCond) {
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this._print(`${this.turnOfPlayerName} won the game!`);
        if (this.turnOfPlayer === 0) {
          this.player1Points += 1;
          this.board = ["X", "X", "X", "X", "X", "X", "X", "X", "X"];
        } else if (this.turnOfPlayer === 1) {
          this.player2Points += 1;
          this.board = ["O", "O", "O", "O", "O", "O", "O", "O", "O"];
        }

        document.querySelector(".player1points").textContent =
          this.player1Points;
        document.querySelector(".player2points").textContent =
          this.player2Points;

        this.isGameRunning = false;
        break;
      }
    }

    if (this.isGameRunning && !this.board.includes("")) {
      this._print("It's a draw!");
      this.isGameRunning = false;
    }
  };

  this._restartGame = () => {
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.isGameRunning = true;
    this._changeTurn();
    this.init();
  };

  // Render board
  this._render = () => {
    const DOMBoard = document.querySelector(".board");
    DOMBoard.innerHTML = "";
    this.board.forEach((_, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => this._move(index));
      DOMBoard.appendChild(cell);
    });

    const player1name = document.querySelector(".player1name");
    player1name.textContent = this.player1Name;
    const player2name = document.querySelector(".player2name");
    player2name.textContent = this.player2Name;
  };

  // Print messages
  this._print = (message = "") => {
    const element = document.querySelector(".text-print");
    element.textContent = message;
  };
}

// Create Game and play
const game = new TicTacToe();

function gameStart() {
  // Hide the start menu and show the game board
  document.querySelector(".start-menu").style.display = "none";
  document.querySelector(".gameBoard").style.display = "flex";

  game.init();
}
