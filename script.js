let playerOne = '';
let playerTwo = '';
let playerTwoTurn;

const winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


const tiles = document.querySelectorAll('.tile');
const winnerText = document.querySelector('.winner-text');
const newGameBtn = document.querySelector('.new-game');
const gameForm = document.querySelector('.game-form');
const modal = document.querySelector('.modal');

// Displays Names
const playerOneName = document.querySelector('.one-name');

const playerTwoName = document.querySelector('.two-name');



// Game Form
gameForm.addEventListener('submit', (e) => {
    // Prevents submit
    e.preventDefault();
    const playerOneInput = document.querySelector('.playerOneInput').value;
    const playerTwoInput = document.querySelector('.playerTwoInput').value;
    playerOne = playerOneInput;
    playerTwo = playerTwoInput;
    playerOneName.innerHTML = playerOne;
    playerTwoName.innerHTML = playerTwo;
    modal.style.display = 'none';
    startGame();
})

// New game button
newGameBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
    document.querySelector('.playerOneInput').value = '';
    document.querySelector('.playerTwoInput').value = '';

});


startGame();

function startGame() {

    playerTwoTurn = false;
    playerOneName.style.backgroundColor = 'red';
    playerTwoName.style.backgroundColor = '';
    tiles.forEach(tile => {
        tile.classList.remove(`x`);
        tile.classList.remove(`circle`);
        tile.removeEventListener('click', handleClick);
        playerOneName.style.display = 'block';
        playerTwoName.style.display = 'block';
        winnerText.style.display = 'none';
        tile.addEventListener('click', handleClick, {once: true})

});
};





function handleClick(e) {
    const tile = e.target;
    const currentPlayer = playerTwoTurn ? playerTwo : playerOne;

    // Place Mark
    placeMark(tile, currentPlayer);

    // Check for win
    if(checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns()
    }

};

function endGame(draw) {
    if (draw) {
        playerOneName.style.display = 'none';
        playerTwoName.style.display = 'none';
        winnerText.style.display = 'flex';
        winnerText.innerHTML = `It's a Draw!`;
    } else {
        playerOneName.style.display = 'none';
        playerTwoName.style.display = 'none';
        winnerText.style.display = 'flex';
        winnerText.innerHTML = `${playerTwoTurn ? playerTwo : playerOne} Wins!`;
    }
};


function isDraw() {
    return [...tiles].every(tile => {
        return tile.classList.contains(playerOne) ||
        tile.classList.contains(playerTwo)
    })
}


function placeMark(tile, currentPlayer) {
    if(currentPlayer == playerOne) {
        tile.classList.add(`x`);
        tile.classList.add(`${currentPlayer}`);
        playerTwoName.style.backgroundColor = 'red';
        playerOneName.style.backgroundColor = '';
    } else {
        tile.classList.add(`circle`);
        tile.classList.add(`${currentPlayer}`);
       playerOneName.style.backgroundColor = 'red';
        playerTwoName.style.backgroundColor = ''; 
    }
};


function swapTurns() {
    playerTwoTurn = !playerTwoTurn;
};


function checkWin(currentPlayer) {
    return winningCombo.some(combo => {
        return combo.every(index => {
            return tiles[index].classList.contains(currentPlayer);
        })
    })
};
