const boardContainer = document.querySelector(".container");

let currentPlayer;
let players = [];

const gameBoard = (()=>{
    let boardCells = [];

    const createBoard = ()=>{
        boardCells = [];

        for (let i = 0; i < 9; i++) {
            let div = document.createElement('div');
            div.dataset.index = i;
            div.dataset.marker = "";
            boardCells.push(div);
            boardContainer.appendChild(div);
        }
    };

    const clearBoard = ()=>{
        boardContainer.replaceChildren();
        boardCells.length = 0;
    };

    const initBoard = ()=>{
        for (cell of boardCells) {
            cell.addEventListener('click', e=>{
                if (e.target.dataset.marker !== "") return;

                e.target.dataset.marker = currentPlayer.marker;
                e.target.innerText = currentPlayer.marker;

                currentPlayer.move++

                currentPlayer = players[0] !== currentPlayer ? players[0] : players[1];
                console.log(currentPlayer);
            });
        }
    }
    return {createBoard, clearBoard, initBoard};
})();

const Player = (name, marker) => {
    let move = 0;
    return {name, marker, move};
};

players.push(Player("player1", "X"));
players.push(Player("player2", "O"));

currentPlayer = players[0];

gameBoard.createBoard();
gameBoard.initBoard();