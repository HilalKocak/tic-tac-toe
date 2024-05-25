import Board from './Board';
import { useState } from 'react'

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [currentMove, setCurrentMove] = useState(0); //keep track of which step the user is currently viewing
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) { //when you click on a square
    //If you “go back in time” and then make a new move from that point, you only want to keep the history up to that point. 
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // you’re only keeping that portion of the old history.

    setHistory(nextHistory);
    console.log("nextHistory ->", nextHistory)
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove); // changing currentMove
  }
  
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = move === currentMove ? `You are at move #${move}` : "Go to move #" + move;
    } else {
      description = move === currentMove ? "You are at game start" : "Go to game start";
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          <span>{description}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });
  

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}