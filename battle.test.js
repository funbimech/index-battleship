const ship = require("./ship");
const gameboard = require("./gameboard");
const player = require("./player");

describe("Ship factory", () => {
  test("Ship can record hits", () => {
    const shipinstance = ship(3);
    shipinstance.hit();
    expect(shipinstance.hits).toBe(1);
  });
  test("Ship sinks when hits >= length", () => {
    const shipinstances = ship(2);
    shipinstances.hit();
    shipinstances.hit();
    expect(shipinstances.sunk).toBe(true);
  });
});
describe("Gameboard factory", () => {
  test("Places ship correctly on board", () => {
    const game = gameboard();
    const ships = ship(3);
    game.placeship(ships, 2, 3);
    expect(game.board[2][3]).toBe(ships);
  });
  test("Registers hit on ship", () => {
    const shipss = ship(2);
    const games = gameboard();
    games.placeship(shipss, 1, 1);
    games.receiveAttack(1, 1);
    expect(shipss.hits).toBe(1);
  });
  test("Records missed shots", () => {
    const board = gameboard();
    board.receiveAttack(0, 0);
    expect(board.missedShots).toContainEqual([0, 0]);
  });
});
describe("Player factory", () => {
  test("Creates human and computer players with different gameboards", () => {
    const human = player("human");
    const computer = player("computer");
    expect(human.type).toBe("human");
    expect(computer.type).toBe("computer");
    expect(human.gameboards).not.toBe(computer.gameboards);
  });
});
