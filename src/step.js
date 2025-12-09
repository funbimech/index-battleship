import "./style.css";
import { gameboard, game, cells, rdmcolor } from "./gameboard.js";
import { ship } from "./ship.js";

ship();
const games = gameboard();
const ships = ship(3);

cells.forEach((cells, index) => {
  cells.addEventListener("click", () => {
    cells.style.backgroundColor = rdmcolor();
    // if (games.placeship(ships, 2, 3)) {
    // }
  });
});
console.log(games.placeship(ships, 2, 3));
console.log(rdmcolor());
gameboard();
