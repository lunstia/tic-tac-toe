const boardContainer = document.querySelector(".container");

let currentPlayer;
let players = [];

// 0  1  2
// 3  4  5
// 6  7  8

let winScenarios = "048 246 036 147 258 012 345 678";


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

    const win = ()=>{
        setTimeout(() => {
            currentPlayer.wins++
            players[0].move = 0;
            players[1].move = 0;

            clearBoard();
            createBoard();
            initBoard();

            currentPlayer = players[0];
        }, 1000);

        console.log("??????????")
    }

    const initBoard = ()=>{
        let finished = false

        for (cell of boardCells) {
            cell.addEventListener('click', e=>{
                if (e.target.dataset.marker !== "" || finished) return;

                e.target.dataset.marker = currentPlayer.marker;
                e.target.innerText = currentPlayer.marker;

                currentPlayer.move++
                
                console.log(currentPlayer.name)
                if (currentPlayer.move >= 3) { // Win is only possible after their 3rd move.
                    let playerCells = boardCells.filter(a=>currentPlayer.marker === a.dataset.marker);
                    for (playerCell of playerCells) {
                        let tempStr = playerCell.dataset.index;
                        for (nextCell of playerCells) {
                            if (playerCell == nextCell) continue;
                            let prev = tempStr;
                            tempStr = tempStr.concat(nextCell.dataset.index);
                            console.log(tempStr)
                            if (!winScenarios.includes(tempStr)) {
                                tempStr = prev
                                continue;
                            } else if (tempStr.length === 3 && winScenarios.includes(tempStr)){
                                for (let i = 0; i < 3; i++) {
                                    console.log('test')
                                    console.log( boardCells[tempStr[i]]);
                                    boardCells[tempStr[i]].style.setProperty('color','red');
                                }
                                finished = true;
                                win()
                                return;
                            }
                        }
                    }
                }

                currentPlayer = players[0] !== currentPlayer ? players[0] : players[1];
                
            });
        }
    }
    return {createBoard, clearBoard, initBoard};
})();

const Player = (name, marker) => {
    let move = 0;
    let wins = 0;
    return {name, marker, move, wins};
};

players.push(Player("player1", "X"));
players.push(Player("player2", "O"));

currentPlayer = players[0];

gameBoard.createBoard();
gameBoard.initBoard();