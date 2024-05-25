import Square from "./Square";


export default function Board({ xIsNext, squares, onPlay }) {
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
  
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
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
        return squares[a];
      }
    }
    return null;
  }