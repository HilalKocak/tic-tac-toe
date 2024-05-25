import Board from './Board';
import { useState } from 'react'

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [currentMove, setCurrentMove] = useState(0); //keep track of which step the user is currently viewing
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isAscending, setIsAscending] = useState(true); 

  function handlePlay(nextSquares) { //when you click on a square
    //If you “go back in time” and then make a new move from that point, you only want to keep the history up to that point. 
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // you’re only keeping that portion of the old history.

    setHistory(nextHistory);
    console.log("nextHistory ->", nextHistory)
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove); 
  }
  const toggleSort = () => {
    setIsAscending(!isAscending); 
  };
  
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
  
  
  if (!isAscending) {
    moves.reverse(); 
  }

  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : null;

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!currentSquares.includes(null)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winningLine={winningLine}/>
      </div>
      <div className="game-info">
      <div>{status}</div>
      <button onClick={toggleSort}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}