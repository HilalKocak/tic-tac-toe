import Square from "./Square";
import { calculateWinner } from './gameLogic';

export default function Board({ xIsNext, squares, onPlay, winningLine }) {
    // const [xIsNext, setXisNext] = useState(true);
    // const [squares, setSquares] = useState(Array(9).fill(null));
  
    function handleClick(i) {
      if (squares[i] || calculateWinner(squares)) {
        return;
      }
  
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
  
      onPlay(nextSquares);
    }
  
    const winnerObject = calculateWinner(squares);


    let status;
    if (winnerObject) {
      status = "Winner: " + winnerObject.winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  
  const size = 3; 
  const board = [];
  for (let row = 0; row < size; row++) {
    const rowSquares = [];
    for (let col = 0; col < size; col++) {
    const index = row * size + col;
    rowSquares.push(
        <Square
        key={index}
        value={squares[index]}
        onSquareClick={() => handleClick(index)}
        highlight={winningLine && winningLine.includes(index)}
        />
    );
    }
    board.push(<div key={row} className="board-row">{rowSquares}</div>);
  }
    return (
        <>
        <div className="status">{status}</div>
        {board}
      </>
    );
  }
 