const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.getElementById('reset');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(cell) {
    const index = cell.getAttribute('data-index');
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.textShadow = "0 0 8px #0f0";

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (board.includes("")) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        statusText.textContent = "It's a Tie!";
        gameActive = false;
    }
}

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = "");
}
