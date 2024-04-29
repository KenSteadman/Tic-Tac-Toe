let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handlePlayerTurn(clickedCellIndex) {
  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  board[clickedCellIndex] = currentPlayer;
  checkWinnerorDraw();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", cellClicked, false);
});

function cellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace("cell-", ``)) - 1;

  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handlePlayerTurn(clickedCellIndex);
  updateBoard();
}

function updateBoard() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = board[i];
    if (board[i] === "X") {
      cells[i].classList.add("cell-x");
      cells[i].classList.remove("cell-o");
    } else if (board[i] === "O") {
      cells[i].classList.add("cell-o");
      cells[i].classList.remove("cell-x");
    } else {
      cells[i].classList.remove("cell-x", "cell-o");
    }
  }
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinnerorDraw() {
  let roundWon = false;
  let winningCells = [];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      winningCells = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    announceWinner(currentPlayer);
    highlightWinningCells(winningCells);
    gameActive = false;
    return;
  }

  let roundDraw = !board.includes("");
  if (roundDraw) {
    announceDraw();
    gameActive = false;
    return;
  }
}

function highlightWinningCells(winningCells) {
  winningCells.forEach((cellIndex) => {
    cells[cellIndex].classList.add("winning-cell");
  });
}

function announceWinner(player) {
  const messageElement = document.getElementById("gameMessage");
  messageElement.innerText = `Player ${player} has won!`;
}

function announceDraw() {
  const messageElemnet = document.getElementById("gameMessage");
  messageElemnet.innerText = "It's a draw!";
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("winning-cell"); // Remove the winning-cell class
  });
  document.getElementById("gameMessage").innerText = "";
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame, false);
