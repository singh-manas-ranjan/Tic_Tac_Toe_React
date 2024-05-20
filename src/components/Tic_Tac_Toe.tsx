import { useState } from "react";
import styles from "./Tic_Tac_Toe.module.css";
const Tic_Tac_Toe = () => {
  const [options, setOptions] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [running, setRunning] = useState<boolean>(false);

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

  const startGame = () => {
    setRunning(true);
  };

  const checkWinner = (options: string[]) => {
    for (let i = 0; i < winConditions.length; i++) {
      const combination = winConditions[i];
      const [a, b, c] = combination;

      if (options[a] === "" || options[b] === "" || options[c] === "") continue;
      if (options[a] === options[b] && options[b] === options[c]) {
        setRunning(false);
        return true;
      }
    }
  };

  const cellClicked = (cellIdx: number) => {
    if (options[cellIdx] !== "" || !running) return;
    const win = checkWinner(options);
    if (win) alert(`${currentPlayer} Wins!`);
    updateCell(cellIdx);
  };

  const updateCell = (cellIdx: number) => {
    const newOptions = [...options];
    newOptions[cellIdx] = currentPlayer;
    setOptions(newOptions);
    setCurrentPlayer((player) => (player === "X" ? "O" : "X"));
  };

  const resetGame = () => {
    setOptions(Array(9).fill(""));
    setCurrentPlayer("X");
    setRunning(false);
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
        <h1>Tic-Tac-Toe</h1>
        <button onClick={startGame}>Start Game</button>
        <button onClick={resetGame} className={running ? "" : styles.hidden}>
          Reset Board
        </button>
      </div>
    </div>
  );
};

export default Tic_Tac_Toe;
