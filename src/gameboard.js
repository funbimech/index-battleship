import { ship } from "./ship.js";

ship();
let playermove = 0;
let computermove = 0;
let gameover = false;
let options = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];
const cells = document.querySelectorAll(".boxs");

function gameboard(size) {
  const board = Array(size)
    .fill(null)
    .map(() => Array(size).fill(""));
  const placedships = [];
  const missedShots = [];

  function placeship(ships, a, b) {
    if (cells[a][b] === "") {
      cells[a][b] = ships;
      placedships.push(ships);
    }
  }
  function receiveAttack(a, b) {
    const target = cells[a][b];
    if (!target !== "" && target !== null && target.hit) {
      target.hit();
    } else {
      missedShots.push([a, b]);
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
  cells.forEach((cells, index) => {
    cells.addEventListener("click", () => {
      if (gameover) return;
      if (cells.textContent.trim() != "") return;
      handleplayermove(index);
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
// function handleplayermove(cellindex) {
//   if (playermove >= playermovelimit || gameover) return;
//   if (gameover || options[cellindex] !== "") return;
//   options[cellindex] = "x";
//   cells[cellindex].textContent = "x";
//   playermove++;
//   computerplay();
//   checkwinner();
// }
export const greet = "hello";
export { gameboard, game, cells,rdmcolor };
// module.exports = gameboard;
