import { gameboard } from "./gameboard.js";
import { ship } from "./ship.js";

function player(type) {
  const board = gameboard();
  const attacks = [];
  const isComputer = type === 'computer';
  let enemyBoard = null;

  function setEnemy(board) {
    enemyBoard = board;
  }

  function randomAttack() {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (attacks.some(([r, c]) => r === row && c === col));
    attacks.push([row, col]);
    const attackResult = enemyBoard.receiveAttack(row, col);
    return { row, col, ...attackResult };
  }

  function placeShipsRandomly() {
    const shipLengths = [5, 4, 3, 3, 2]; // Standard Battleship ships
    shipLengths.forEach(length => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        placed = board.placeship(ship(length), row, col, direction);
      }
    });
  }

  if (isComputer) {
    placeShipsRandomly();
  }

  return {
    type,
    board,
    setEnemy,
    placeShips: placeShipsRandomly,
    attack: isComputer ? randomAttack : (row, col) => {
      attacks.push([row, col]);
      const attackResult = enemyBoard.receiveAttack(row, col);
      return { row, col, ...attackResult };
    },
    attacks,
  };
}

export { player };
