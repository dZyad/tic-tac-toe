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

    const checkWinner = () => {
        const currentBoard = board.getBoard();

        for (let i = 0; i < 3 ; i++ ) {
            if ( currentBoard[i][0] !== '' && currentBoard[i][0] === currentBoard[i][1] && currentBoard[i][1] === currentBoard[i][2]) {
                return currentBoard[i][0];
            }
        }

        for (let i = 0; i < 3 ; i++ ) {
            if ( currentBoard[0][i] !== '' && currentBoard[0][i] === currentBoard[1][i] && currentBoard[1][i] === currentBoard[2][i]) {
                return currentBoard[0][i];
            }
        }

        if ( currentBoard[0][0] !== '' && currentBoard[0][0] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][2] ) {
            return currentBoard[0][0];
        }

        if ( currentBoard[2][0] !== '' && currentBoard[2][0] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[0][2] ) {
            return currentBoard[2][0];
        }

        return;
    }

    const playRound = (cell) => {
        console.log(
            `${getActivePlayer().name} place ${getActivePlayer().token} in cell [${cell}]`
        );
        board.placeToken(cell, getActivePlayer().token);

        const winner = checkWinner();

        if (winner) {
            printNewRound();
            console.log(`${getActivePlayer().name} won!`);
            return;
        }

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return { playRound, getActivePlayer };
}

const game = GameController();
