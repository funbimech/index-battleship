import { ship } from "./ship.js";
ship();
let playermove = 0;
let computermove = 0;
let gameover = false;
const cells = document.querySelectorAll(".boxs");
function gameboard(size = 10) {
  const board = Array(size)
    .fill(null)
    .map(() => Array(size).fill(""));
  const placedships = [];
  const missedShots = [];
  function placeship(shipobj, a, b, direction = "horizontal") {
    const length = shipobj.length;
    if (direction === "horizontal") {
      if (b + length > board[0].length) return false;
    } else {
      if (a + length > board[0].length) return false;
    }
    for (let i = 0; i < length; i++) {
      const row = direction === "horizontal" ? a : a + i;
      const col = direction === "horizontal" ? b + i : b;
      if (board[row][col] !== "") {
        return false;
      }
    }
    for (let i = 0; i < length; i++) {
      const row = direction === "horizontal" ? a : a + i;
      const col = direction === "horizontal" ? b + i : b;
      board[row][col] = shipobj;
    }
    placedships.push(shipobj);
    return true;
  }
  function receiveAttack(a, b) {
    const target = board[a][b];
    if (target !== "" && target !== null && typeof target.hit === 'function') {
      target.hit();
      const sunk = target.sunk;
      const gameover = placedships.every(ship => ship.sunk);
      return { result: "hit", sunk, gameover };
    } else {
      missedShots.push([a, b]);
      return { result: "miss", sunk: false, gameover: false };
    }
  }
  return {
    board,
    placedships,
    placeship,
    receiveAttack,
    missedShots,
  };
}
function game() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      cell.style.backgroundColor = rdmcolor;
    });
  });
}
function rdmcolor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export { gameboard, game, cells, rdmcolor };
