// import "./style.css";

import { gameboard } from "./gameboard.js";
const cells = document.querySelectorAll(".cell");

console.log(cells);
cells.addEventListener("click", () => {
  alert("hello");
});
gameboard();
