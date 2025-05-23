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
let currShipCount = 5;

function createGridElement1(row, col, isPlayer1 = true) {
    let div = document.createElement("div");
    let className = isPlayer1 ? "grid-element1" : "grid-element2";
    div.classList.add(className);
    
    div.dataset.row = row;
    div.dataset.col = col;

    if (isPlayer1) {
        player1EventListener(div, row, col);
    } else {
        player2EventListener(div, row, col)
    }

    return div;
}

function player1EventListener(div, row, col) {
    div.addEventListener("click", () => {
        if (!gameStart) return;

        console.log(`row: ${row}, col: ${col}`);
        console.log(isPlaceingShips);
        

        if (currentTurn === "player1" && !isPlaceingShips && currShipCount > 0) {
            const res = player1.gameboard.placeShip(row, col, currShipLength)

            if (!res) {
                return;
            }

            for (let i = 0; i < currShipLength; i++) {
                let posX = isHorizontal ? row : row + i;
                let posY = isHorizontal ? col + i : col;
                let cell = player1Board.querySelector(`[data-row="${posX}"][data-col="${posY}"]`);
                cell.classList.add("ship");
            }

            currShipCount--;
            if (currShipCount === 0) {
                isPlaceingShips = true;
                console.log("Placing phase is over.");
                return;
            }

        }
    })

    return div
}

function player2EventListener(div, row, col) {
    div.addEventListener("click", () => {
        if (!gameStart || !isPlaceingShips) return;
        if (currentTurn !== "player1") return;

        console.log("inside player2 board");
        
        const res = player1.attack(player2, row, col);
        console.log(`Player1 attacked [${row}, ${col}]: ${res}`);

        if (res === "already-hit") {
            console.log("You already attacked this square. Try Again");
            return;
        }

        if (res === "hit") div.classList.add("hit");
        else if (res === "missed") div.classList.add("miss");
        else return

        if (player2.gameboard.allShipsSunk()) {
            console.log("Player 1 wins");
            gameStart = false;
            return;
        }

        currentTurn = "player2";

        setTimeout(() => {
            botAttack()
        }, 100)

    })

    return div;
}

function botAttack() {
    let row, col, result;
    do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        result = player2.attack(player1, row, col);
    } while (result === "already-hit");

    console.log(`Bot attacked [${row}, ${col}]: ${result}`);

    const cell = player1Board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (result === "hit") cell.classList.add("hit");
    else if (result === "missed") cell.classList.add("miss");

    if (player1.gameboard.allShipsSunk()) {
        console.log("Player 2 wins");
        gameStart = false;
        return;
    }

    currentTurn = "player1";
}

let startBtn = document.querySelector("#game-start");
startBtn.addEventListener("click", () => {
    gameStart = true;
    console.log("Placing phase begins.");
    
})

for (let i = 0; i < 100; i++) {

    let row = Math.floor(i / 10);
    let col = i % 10;

    let div1 = createGridElement1(row, col);

    let div2 = createGridElement1(row, col, false);

    player1Board.appendChild(div1);
    player2Board.appendChild(div2);
}

if (player1.gameboard.allShipsSunk()) {
    console.log("Player 2 wins");
    
} else if (player2.gameboard.allShipsSunk()) {
    console.log("player 1 wins");
    
}


// player1.gameboard.placeShip(0, 0, 3);
player2.gameboard.placeShip(5, 5, 4);


// player1.attack(player2, 5, 5);
// player2.attack(player1, 0, 0);

// console.log("Player 2's missed shots:", player2.gameboard.getMissedShots());
// console.log("Player 2: all ships sunk?", player2.gameboard.allShipsSunk());


// const board = GameBoard();

// board.placeShip(0, 0, 3);

// board.receiveAttack(0, 0);
// board.receiveAttack(1, 0);
// board.receiveAttack(2, 0);
// board.receiveAttack(5, 5);

// console.log(board.allShipsSunk());
// console.log(board.getMissedShots());

