const game = (() => {
    //Selectors
    const boardElement = document.querySelector('.board');

    //Gameboard
    const gameBoard = (() => {
        const board = ['','','','','','','','',''];
        const renderBoard = () => {
            boardElement.innerHTML = '';
            board.forEach((space, idx) => {
                const newElement = `<div class="board-space space-${idx} ${space ?'':'empty'}" data-idx="${idx}"><span class='letter'>${space}</span></div>`
                boardElement.insertAdjacentHTML('beforeend', newElement)
            });
        };
        const updateBoard = (index, mark) => {
            board[index] = mark;
            renderBoard()
            
        };
        const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8], [2,4,6]];

        const fullBoard = () => {
            return board.every(el => el !== '')
        }
        return { board, renderBoard, updateBoard, winningCombos, fullBoard }
    })();

    //Players
    const playerFactory = (name, mark, turn) => {
        const occupiedSpaces = [];
        return {name, mark, turn, occupiedSpaces};
    };

    const playerOne = playerFactory('Uno', 'X', true);
    const playerTwo = playerFactory('Dos', 'O', false);
    const players = [playerOne, playerTwo]
    const toggleTurn = () => {
        players.map(player => player.turn = !player.turn)
    };
   
    //Game Logic
    const init = (() => {
        gameBoard.renderBoard()
        const chooseSpace = (e) => {
            if(!e.target.classList.contains('empty')) return
            const clickedIdx = parseInt(e.target.closest('.board-space').dataset.idx);
            const [currentPlayer] = players.filter(player => player.turn === true);
            currentPlayer.occupiedSpaces.push(clickedIdx)
            gameBoard.updateBoard(clickedIdx, currentPlayer.mark)
            testForWinner(currentPlayer)
        };
        const testForWinner = (player) =>{
            player.occupiedSpaces.sort((a,b) => a - b);
            const isWin = gameBoard.winningCombos.some(combo => combo.every(space => player.occupiedSpaces.includes(space)));
            if(isWin){
                chickenDinner(player);
                boardElement.removeEventListener('click', chooseSpace)
            } else if(gameBoard.fullBoard()) {
                console.log('issa tie');
            } else {
                toggleTurn();
            }
        };
        const chickenDinner = (winner) => {
            console.log('winrar')
        };
        const eventHandlers = (() => {
            boardElement.addEventListener('click', chooseSpace)
        })();
    })();

return {playerOne, playerTwo}
})();