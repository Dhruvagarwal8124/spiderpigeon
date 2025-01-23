let statusDisplay = document.querySelector('.gameStatus');
let button = document.querySelector('.restartGame');
let currentPlayer = 'X';
let gameInput = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let winList=document.getElementById('winList');

const winningMessage = () => `Player ${currentPlayer} has won`;
const drawMessage = () => `The game is a draw`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerText = currentPlayerTurn();




document.querySelectorAll(".cell").forEach(cell => 
    {
     cell.addEventListener('mousedown',handleMouseDown);
     cell.addEventListener('mouseup',handleMouseUp);
     cell.addEventListener('click', handleCellClick);
    });
button.addEventListener('click', handleButtonClick);

function handleMouseDown(e){
    const cell=e.target;
    if(cell.innerHTML===""&& gameActive){
        cell.style.backgroundColor="grey";
    }
}
function handleMouseUp(e){
    const cell=e.target;
    if(cell.innerHTML==="" && gameActive){
        cell.style.backgroundColor="black";
    }
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Ignore click if the cell is already filled or if the game is not active
    if (gameInput[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handlePlayedCell(clickedCell, clickedCellIndex);
    handleGameResult();
}

function handlePlayedCell(clickedCell, clickedCellIndex) {
    gameInput[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

function handleGameResult() {
    let roundWon = false;

    // Loop through all winning conditions
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameInput[winCondition[0]];
        let b = gameInput[winCondition[1]];
        let c = gameInput[winCondition[2]];

        // If a, b, or c is empty, skip to the next condition
        if (a === "" || b === "" || c === "") {
            continue;
        }

        // If the three values match, it's a win
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        statusDisplay.innerText = winningMessage();
        handleWinList();
        return;
    }

    // Check if the board is full and it's a draw
    let roundDraw = !gameInput.includes("");
    if (roundDraw) {
        statusDisplay.innerText = drawMessage();
        gameActive = false;
        return;
    }

    // Change the player turn
    handlePlayerChange();
}

function handleWinList(){
    const listItem=document.createElement('li');
    listItem.textContent=`Player ${currentPlayer}`;
    winList.appendChild(listItem);
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = currentPlayerTurn();
}

function handleButtonClick() {
    // Reset the game
    gameActive=true;
    gameInput=["","","","","","","","",""];
    currentPlayer='X';
    statusDisplay.innerText=currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell=>cell.innerHTML="");
}
