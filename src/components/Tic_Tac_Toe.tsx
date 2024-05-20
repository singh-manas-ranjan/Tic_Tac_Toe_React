import { useEffect, useState } from "react";
import styles from "./Tic_Tac_Toe.module.css";
const Tic_Tac_Toe = () => {
  const [options, setOptions] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [running, setRunning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");
  const [draw, setDraw] = useState<boolean>(false);

  useEffect(() => {
    checkWinner();
  });

  const winConditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    for (const combination of winConditions) {
      const [cellA, cellB, cellC] = combination;

      if (
        options[cellA] === "" ||
        options[cellB] === "" ||
        options[cellC] === ""
      ) {
        continue;
      }
      if (
        options[cellA] === options[cellB] &&
        options[cellB] === options[cellC]
      ) {
        setRunning(false);
        setWinner(currentPlayer === "X" ? "O" : "X");
        break;
      } else if (!options.includes("")) {
        setRunning(false);
        setDraw(true);
      }
    }
  };

  const startGame = () => {
    setRunning(true);
  };

  const cellClicked = (cellIdx: number) => {
    if (options[cellIdx] !== "" || !running) return;
    updateCell(cellIdx);
  };

  const updateCell = (cellIdx: number) => {
    const newOptions = [...options];
    newOptions[cellIdx] = currentPlayer;
    setOptions(newOptions);
    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer((player) => (player === "X" ? "O" : "X"));
  };

  const resetGame = () => {
    setOptions(Array(9).fill(""));
    setCurrentPlayer("X");
    setRunning(false);
    setWinner("");
    setDraw(false);
  };

  return (
    <div className={styles.container}>
      <h1>Tic - Tac - Toe</h1>
      <div className={styles.board}>
        {options.map((player, idx) => (
          <div
            key={idx}
            className={styles.cell}
            onClick={() => cellClicked(idx)}
          >
            {player}
          </div>
        ))}
      </div>
      <h2>{running ? `${currentPlayer}'s turn` : ""}</h2>
      <div className={running ? styles.hidden : styles.curtain}>
        <h1>
          {winner !== ""
            ? `${winner} Wins!`
            : draw
            ? "It's a draw"
            : "Tic-Tac-Toe"}
        </h1>
        <button
          onClick={startGame}
          className={
            options.includes("X") || options.includes("O") ? styles.hidden : ""
          }
        >
          Start Game
        </button>
        <button
          onClick={resetGame}
          className={
            running || !options.includes("X") || !options.includes("O")
              ? styles.hidden
              : ""
          }
        >
          Reset Board
        </button>
      </div>
    </div>
  );
};

export default Tic_Tac_Toe;
