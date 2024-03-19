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

    const checkTie = () => {
        const currentBoard = board.getBoard();

        for ( let i = 0; i < 3; i++ ) {
            for ( let j = 0; j < 3; j++ ) {
                if (currentBoard[i][j] === '') {
                    return false;
                }
            }
        }

        return true;
    }

    const playRound = (cell) => {
        console.log(
            `${getActivePlayer().name} place ${getActivePlayer().token} in cell [${cell}]`
        );
        board.placeToken(cell, getActivePlayer().token);

        const winner = checkWinner();
        const tie = checkTie();

        if (winner) {
            printNewRound();
            console.log(`${getActivePlayer().name} won!`);
            return;
        }

        if (tie) {
            printNewRound();
            console.log(`It's a tie!`);
            return;
        }

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return { playRound, getActivePlayer, getBoard: board.getBoard, checkWinner, checkTie };
}

function ScreenController() {
    let game = GameController();
    const playerTurnDiv = document.querySelector('#turn');
    const cells = document.querySelectorAll('.cell');
    const resultDiv = document.querySelector('#result');
    const restartDiv = document.querySelector('#restart');

    const updateScreen = () => {
        if (!game.checkWinner() && !game.checkTie()) {
            const activePlayer = game.getActivePlayer();
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
        }
    };

    const printResult = (result) => {
        resultDiv.textContent = result;
        endGame();
    }

    const restartGame = () => {
        game = GameController();
        restartDiv.removeChild(restartDiv.querySelector('button'));
        updateScreen();
        resultDiv.textContent = '';
        cells.forEach(cell => {
            cell.classList.add('active');
            cell.textContent = '';
        });
        addClickableCells();
    }

    const endGame = () => {
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart Game';
        restartButton.id = 'restartButton';

        cells.forEach(cell => {
            cell.removeEventListener('click', clickHandlerBoard);
        });

        restartDiv.appendChild(restartButton);
        restartButton.addEventListener('click', restartGame);
        playerTurnDiv.textContent = '';
    }

    const playRoundAndUpdate = (cell) => {
        const token = game.getActivePlayer().token;
        game.playRound(cell);
        updateScreen();

        const winner = game.checkWinner();
        const tie = game.checkTie();

        if (winner) {
            printResult(`${token} won!`);
        } else if (tie) {
            printResult(`It's a Tie!`);
        }
    }

    function clickHandlerBoard(e) {
        const token = game.getActivePlayer().token;
        const cell = e.target;
        if (!cell.classList.contains('active')) {
            return;
        }
        
        const cellId = cell.id;
        const cellIndex = parseInt(cellId.split('-')[1]);
        const row = Math.floor(cellIndex / 3);
        const col = cellIndex % 3;

        playRoundAndUpdate([row, col]);
        cell.classList.remove('active');
        cell.textContent = `${token}`;
        updateScreen();
    };

    function addClickableCells() {
        cells.forEach(cell => {
            cell.addEventListener('click', clickHandlerBoard);
        });
    }

    updateScreen();
    addClickableCells();
}

ScreenController();
