// import gameboard from "./gameboard.js";
const gameboard = require("./gameboard");

function player(type) {
  const gameboards = gameboard();
  return {
    type,
    gameboards,
  };
}
module.exports = player;
