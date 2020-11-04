/*----- constants -----*/

// what to put on the grid!
const IMAGES = {
    '-1': "url('https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif')",
    '1': "url('https://media.giphy.com/media/JRE3AvLsSRXg360F6l/giphy.gif')",
}

// if all of the elements in any one of the sub arrays are the same, someone won!
// 0 - 9 represent the different indexes in moves

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


/*----- app's state (variables) -----*/
let moves;
let turn;
let winner;

/*----- cached element references -----*/
let grid = document.getElementById('grid');
let button = document.querySelector('button');
let message = document.querySelector('h1');

/*----- event listeners -----*/
grid.addEventListener('click', handleClick);
button.addEventListener('click', init);

/*----- functions -----*/

init()

function init() {
    moves = new Array(9).fill(null);
    turn = 1;
    winner = null;
    render();
}

function render() {
    // hide the button
    button.style.display = 'none';
    // fill the grid
    moves.forEach((element, idx) => {
        document.getElementById(idx).style.backgroundImage = element && IMAGES[element];
    })
    // display the message appropriately
    if (winner) {
        message.textContent = `Player ${winner > 0 ? 1 : 2} wins!`;
        button.style.display = null;
    } else if (!moves.includes(null)) {
        message.textContent = "It's a tie";
        button.style.display = null;
    }
    else {
        message.textContent = `Player ${turn > 0 ? 1 : 2}'s turn!`;
    }   
}

function handleClick(evt) {
    // don't register click if the move is already filled
    if (moves[evt.target.id]) return;
    // or if there is a winner
    if (winner) return;
    // assign the turn to the correct moves index
    moves[evt.target.id] = turn;
    checkWinner();
    // switch the turn and render
    turn *= -1;
    render();
}

function checkWinner() {
    // check to see if at least one of the combinations matches what our moves
    let check = WINNING_COMBINATIONS.some(combination => (
        Math.abs(moves[combination[0]] + moves[combination[1]] + moves[combination[2]]) === 3)
    );
    if (check) winner = turn;
}

