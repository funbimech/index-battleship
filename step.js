import "./style.css";
import { gameboard, rdmcolor } from "./gameboard.js";
import { ship } from "./ship.js";
import { player } from "./player.js";

document.addEventListener("DOMContentLoaded", () => {
  const playerBoardCells = document.querySelectorAll(".gameboard1 .cell");
  const computerBoardCells = document.querySelectorAll(".gameboard11 .cell");

  const human = player('human');
  const computer = player('computer');

  human.setEnemy(computer.board);
  computer.setEnemy(human.board);

  let currentPlayer = 'human';
  let gameOver = false;
  let playerScore = 0;
  let computerScore = 0;
  let playerMisses = 0;
  let computerMisses = 0;
  let playerAttacksThisTurn = 0;
  let computerAttacksThisTurn = 0;
  let roundPhase = 0;
  function updateScoreboard() {
    document.getElementById('player-hits').textContent = playerScore;
    document.getElementById('player-misses').textContent = playerMisses;
    document.getElementById('computer-hits').textContent = computerScore;
    document.getElementById('computer-misses').textContent = computerMisses;
  }

  function updateTurnDisplay() {
    document.querySelector('.final').textContent = currentPlayer === 'human' ? 'Your Turn' : 'Computer Turn';
  }

  function endRound() {
    const messageDiv = document.getElementById('message');
    if (playerScore > computerScore) {
      messageDiv.textContent = 'Player wins the round!';
    } else if (computerScore > playerScore) {
      messageDiv.textContent = 'Computer wins the round!';
    } else {
      messageDiv.textContent = 'Round is a tie!';
    }
    messageDiv.style.display = 'block';
    setTimeout(() => {
      messageDiv.style.display = 'none';
      resetGame();
    }, 3000);
  }

  function resetGame() {
    roundPhase = 0;
    currentPlayer = 'human';
    gameOver = false;
    playerAttacksThisTurn = 0;
    computerAttacksThisTurn = 0;
    playerScore = 0;
    computerScore = 0;
    playerMisses = 0;
    computerMisses = 0;
    // reset boards
    human.board.board = Array(10).fill(null).map(() => Array(10).fill(""));
    human.board.placedships = [];
    computer.board.board = Array(10).fill(null).map(() => Array(10).fill(""));
    computer.board.placedships = [];
    human.attacks = [];
    computer.attacks = [];
    human.board.missedShots = [];
    computer.board.missedShots = [];
    // reset UI
    playerBoardCells.forEach(cell => cell.style.backgroundColor = '#8bbfbb');
    computerBoardCells.forEach(cell => cell.style.backgroundColor = '#3c4952');
    // place ships for computer
    computer.placeShips();
    // reset human placement
    currentShipIndex = 0;
    currentShip = ship(shipLengths[currentShipIndex]);
    shipCells = [];
    shipDirection = null;
    // update
    updateTurnDisplay();
    updateScoreboard();
  }

  function computerTurn() {
    if (computerAttacksThisTurn < 3 && !gameOver) {
      const { row: compRow, col: compCol, result: compResult, sunk: compSunk } = computer.attack();
      const compIndex = compRow * 10 + compCol;
      if (compResult === "hit") {
        computerScore++;
        playerBoardCells[compIndex].style.backgroundColor = "red";
      } else if (compResult === "miss") {
        computerMisses++;
        playerBoardCells[compIndex].style.backgroundColor = "gray";
      }
      updateScoreboard();
      computerAttacksThisTurn++;
      if (computerAttacksThisTurn >= 3) {
        computerAttacksThisTurn = 0;
        roundPhase++;
        if (roundPhase === 4) {
          endRound();
        } else {
          currentPlayer = roundPhase % 2 === 0 ? 'human' : 'computer';
          updateTurnDisplay();
        }
      } else {
        setTimeout(computerTurn, 1000);
      }
    }
  }

  // Ship placement for human (multiple ships)
  const shipLengths = [5, 4, 3, 3, 2];
  let currentShipIndex = 0;
  let currentShip = ship(shipLengths[currentShipIndex]);
  let shipCells = [];
  let shipDirection = null;

  function placeSegment(row, col) {
    shipCells.push([row, col]);
    const uiIndex = row * 10 + col;
    playerBoardCells[uiIndex].style.backgroundColor = rdmcolor();
    if (shipCells.length === currentShip.length) {
      shipCells.forEach(([r, c]) => {
        human.board.board[r][c] = currentShip;
      });
      human.board.placedships.push(currentShip);
      shipCells = [];
      shipDirection = null;
      currentShipIndex++;
      if (currentShipIndex < shipLengths.length) {
        currentShip = ship(shipLengths[currentShipIndex]);
      } else {
        currentShip = null; // All ships placed
      }
    }
  }

  // Human ship placement
  playerBoardCells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (currentShip && !gameOver) {
        const row = Math.floor(index / 10);
        const col = index % 10;
        if (human.board.board[row][col] !== "") return;
        if (shipCells.length === 0) {
          placeSegment(row, col);
          return;
        }
        const [r0, c0] = shipCells[0];
        if (shipCells.length === 1) {
          shipDirection = r0 === row ? "horizontal" : "vertical";
          placeSegment(row, col);
          return;
        }
        const [lastRow, lastCol] = shipCells.at(-1);
        // Removed adjacent check to allow flexible shapes
        placeSegment(row, col);
      }
    });
  });

  // Attacks on computer board
  computerBoardCells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (currentShip) {
        currentShip = null; // Stop ship placement on first attack attempt
      }
      if (currentPlayer === 'human' && !currentShip && !gameOver) {
        const row = Math.floor(index / 10);
        const col = index % 10;
        const { result, sunk } = human.attack(row, col);
        if (result === "hit") {
          playerScore++;
          cell.style.backgroundColor = "red";
        } else if (result === "miss") {
          playerMisses++;
          cell.style.backgroundColor = "gray";
        }
        playerAttacksThisTurn++;
        updateScoreboard();
        if (playerAttacksThisTurn >= 3) {
          playerAttacksThisTurn = 0;
          roundPhase++;
          if (roundPhase === 4) {
            endRound();
          } else {
            currentPlayer = roundPhase % 2 === 0 ? 'human' : 'computer';
            updateTurnDisplay();
            if (currentPlayer === 'computer') {
              setTimeout(computerTurn, 1000);
            }
          }
        }
      }
    });
  });
  updateTurnDisplay();
  updateScoreboard();
});
