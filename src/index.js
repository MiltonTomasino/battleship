import "./style.css"
import { Player } from "./classes";

let player1Board = document.querySelector(".player1");
let player2Board = document.querySelector(".player2");

function createGridElement(index, row, col) {
    let div = document.createElement("div");
    div.classList.add("grid-element");
    div.classList.add(`${row}-${col}`);

    div.addEventListener("click", () => {
        console.log(div.classList[1]);
        
    })

    return div;
}

for (let i = 0; i < 100; i++) {

    let row = Math.floor(i / 10);
    let col = i % 10;

    let div1 = createGridElement(i, row, col);

    let div2 = createGridElement(i, row, col);

    player1Board.appendChild(div1);
    player2Board.appendChild(div2);
}



let player1 = new Player("Jonathan");
let player2 = new Player("Bot", "Computer");


player1.gameboard.placeShip(0, 0, 3);
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

