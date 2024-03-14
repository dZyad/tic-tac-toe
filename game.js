function GameBoard() {
    const board = [['','', ''], ['','', ''], ['','', '']];
    
    const getBoard = () => board;

    const placeToken = ( cell, player ) => {
        if (board[cell[0]][cell[1]] !== '') return;
        board[cell[0]][cell[1]] = player;
    }

    const printBoard = () => {
        const boardToPrint = board.map(row => row.join(' | ')).join('\n---------\n');
        console.log(boardToPrint);
    }

    return { getBoard, placeToken, printBoard };
}

function GameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = GameBoard();

    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (cell) => {
        console.log(
            `${getActivePlayer().name} place ${getActivePlayer().token} in cell [${cell}]`
        );
        board.placeToken(cell, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return { playRound, getActivePlayer };
}

const game = GameController();
