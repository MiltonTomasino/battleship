import { GameBoard } from "./game-board";
import { Ship } from "./classes";
import { Player } from "./classes";

describe("GameBoard", () => {
    let board;

    beforeEach(() => {
        board = GameBoard();
    });

    test("places a ship correctly", () => {
        const ship = board.placeShip(0, 0, 3);
        expect(typeof ship.hit).toBe("function");
    });

    test("registers a hit", () => {
        board.placeShip(0, 0, 2);
        const result = board.receiveAttack(0, 0);
        expect(result).toBe("hit");
    });

    test("registers a miss", () => {
        const result = board.receiveAttack(5, 5);
        expect(result).toBe("missed");
        expect(board.getMissedShots()).toContainEqual([5, 5]);
    });

    test("reports all ships sunk correctly", () => {
        const ship = board.placeShip(0, 0, 2);
        board.receiveAttack(0, 0);
        board.receiveAttack(1, 0);
        expect(ship.isSunk()).toBe(true);
        expect(board.allShipsSunk()).toBe(true);
    });
});

test("Player can attack another player's board", () => {
    const player1 = new Player("P1");
    const player2 = new Player("P2");

    player2.gameboard.placeShip(0, 0, 1);
    const result = player1.attack(player2, 0, 0);
    expect(result).toBe("hit");
});

describe("Ship", () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(3);
    })

    test("Ship is hit", () => {
        ship.hit();
        expect(ship.hitAmount).toBe(1)
    })

    test("Ship is not sunk", () => {
        expect(ship.isSunk()).toBeFalsy();
    })

    test("Ship is sunk", () => {
        for (let i = 0; i < ship.length; i++) {
            ship.hit();
        }

        expect(ship.isSunk()).toBeTruthy()
    })

})