import "./style.css";
import { gameboard, game, cells, rdmcolor } from "./gameboard.js";
import { ship } from "./ship.js";

ship();
const games = gameboard();
const ships = ship(3);

cells.forEach((cells, index) => {
  cells.addEventListener("click", () => {
    if (games.placeship(ships, 2, 3))  {
      cells.style.backgroundColor = rdmcolor();
      console.log("ship placed successfully");
    } else {
      console.log("failed to place ship");
    }
      // cells.style.backgroundColor = rdmcolor();
    // if (games.placeship(ships, 2, 3)) {
    // }
  });
});
// if (games.placeship(ships, 2, 3)) {
//   console.log("ship placed successfully");
// } else {
//   console.log("failed to place ship");
// }
// console.log(rdmcolor());
gameboard();
