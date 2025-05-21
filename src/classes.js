import { GameBoard } from "./game-board";

class Ship {
    constructor(length) {
        this.length = length,
        this.sunk = false;
        this.hitAmount = 0;
    }

    hit() {
        this.hitAmount += 1;
    }

    isSunk() {
        if (this.hitAmount === this.length) return true;
        else return false;
    }

}

class Player {
    constructor(name, type = "real") {
        this.name = name;
        this.type = type;
        this.gameboard = GameBoard();
    }

    attack(opp, x, y) {
        return opp.gameboard.receiveAttack(x, y);
    }

    randomAttack(opponent) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        return opponent.gameboard.receiveAttack(x, y);
    }
}
export { Ship, Player }