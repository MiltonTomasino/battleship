import "./style.css"
import { Player } from "./classes";

let player1Board = document.querySelector(".player1");
let player2Board = document.querySelector(".player2");

let player1 = new Player("Jonathan");
let player2 = new Player("Bot", "Computer");

let gameStart = false;
let isPlaceingShips = false;
let currentTurn = "player1";
let currShipLength = 3;
let isHorizontal = true;

function createGridElement(row, col, isPlayer1 = true) {
    let div = document.createElement("div");
    let className = isPlayer1 ? "grid-element1" : "grid-element2";
    div.classList.add(className);
    
    div.dataset.row = row;
    div.dataset.col = col;

    div.addEventListener("click", () => {
        console.log(`row: ${row}, col: ${col}`);
        if (currentTurn === "player1" && !gameStart) {
            const res = player1.gameboard.placeShip(row, col, currShipLength)

            if (!res) {
                return;
            }

            for (let i = 0; i < currShipLength; i++) {
                let posX = isHorizontal ? row : row + i;
                let posY = isHorizontal ? col + i : col;
                let cell = document.querySelector(`[data-row="${posX}"][data-col="${posY}"]`);
                cell.classList.add("ship");
            }

        }
    })

    return div;
}

for (let i = 0; i < 100; i++) {

    let row = Math.floor(i / 10);
    let col = i % 10;

    let div1 = createGridElement(row, col);

    let div2 = createGridElement(row, col, false);

    player1Board.appendChild(div1);
    player2Board.appendChild(div2);
}


// player1.gameboard.placeShip(0, 0, 3);
player2.gameboard.placeShip(5, 5, 4);


player1.attack(player2, 5, 5);
player2.attack(player1, 0, 0);

console.log("Player 2's missed shots:", player2.gameboard.getMissedShots());
console.log("Player 2: all ships sunk?", player2.gameboard.allShipsSunk());


// const board = GameBoard();

// board.placeShip(0, 0, 3);

// board.receiveAttack(0, 0);
// board.receiveAttack(1, 0);
// board.receiveAttack(2, 0);
// board.receiveAttack(5, 5);

// console.log(board.allShipsSunk());
// console.log(board.getMissedShots());

