let board;
let currentPlayer;
let gameMode;
let gameOver = false;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function startGame(mode) {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameMode = mode;
    gameOver = false;
    document.getElementById('status').textContent = `Current Player: ${currentPlayer}`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
        cell.style.color = '#333';
    });
}

function handleClick(index) {
    if (!gameOver && !board[index]) {
        board[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].textContent = currentPlayer;

        if (checkWinner()) {
            document.getElementById('status').textContent = `${currentPlayer} Wins!`;
            endGame();
        } else if (board.every(cell => cell)) {
            document.getElementById('status').textContent = 'It\'s a Draw!';
            endGame();
        } else {
            switchPlayer();
            if (gameMode === 'computer' && currentPlayer === 'O') {
                computerMove();
            }
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function endGame() {
    gameOver = true;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.pointerEvents = 'none';
    });
}

function resetGame() {
    startGame(gameMode);
}

function computerMove() {
    setTimeout(() => {
        let emptyCells = board.map((val, index) => val === null ? index : null).filter(val => val !== null);
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        handleClick(randomIndex);
    }, 500);
}
