import { Ship } from "./classes";

let GameBoard = () => {
    let board = Array.from({ length: 10 }, () => Array(10).fill(0));
    let ships = [];
    let missedShots = [];

    function clearBoard(player) {

    }

    function placeShip(x, y, length, isHorizontal = true) {
        const ship = new Ship(length);
        ships.push({ ship, coordinates: [] });

        for (let i = 0; i < length; i++) {
            let posX = isHorizontal ? x + i : x;
            let posY = isHorizontal ? y : y + i;
            board[posX][posY] = ship;
            ships[ships.length - 1].coordinates.push([posX, posY]);
        }

        return ship;

    }

    function receiveAttack(x, y) {
        if (x < 0 || x >= 10 || y < 0 || y >= 10) {
            return "invalid";
        }
        
        const target = board[x][y];

        if (target !== 0 && typeof target.hit === "function") {
            target.hit();
            return "hit";
        } else {
            missedShots.push([x, y]);
            return "missed";
        }
    }

    function allShipsSunk() {
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].ship.isSunk()) {
                return false;
            }
        }

        return true;
    }

    function getMissedShots() {
        return missedShots;
    }

    return {
        placeShip,
        receiveAttack,
        allShipsSunk,
        getMissedShots
    }


};

export { GameBoard }