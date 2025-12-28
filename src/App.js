import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function App() {
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([]);

  function makeMove(move) {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);

    if (result) {
      const classification = classifyMove(result);
      setHistory((prev) => [
        ...prev,
        `${result.san} — ${classification}`
      ]);
      setGame(gameCopy);
    }
  }

  function onDrop(source, target) {
    makeMove({
      from: source,
      to: target,
      promotion: "q"
    });
    return true;
  }

  function classifyMove(move) {
    if (move.flags.includes("c")) return "Good capture";
    if (move.san.includes("+")) return "Good check";
    if (move.san.includes("#")) return "Brilliant checkmate";
    if (move.piece === "p") return "Normal";
    return "Inaccuracy";
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Chess Move Classifier</h2>
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      <h3>Moves</h3>
      <ul>
        {history.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
                }
