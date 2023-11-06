import { useState } from 'react';
import './App.css';

function Square({ value, onMakeTurn }){
  return (
    <button className='square' onClick={onMakeTurn}>{value}</button>
  );
}

function Board({ turnX, square, onPlay }) {
  function handleClick(ind) {
    if (square[ind] || getWinner(square)) {
      return;
    }
    const nextSquare = square.slice();
    if (turnX) {
      nextSquare[ind] = 'X';
    }
    else{
      nextSquare[ind] = '0';
    }
    onPlay(nextSquare)
  }

  const winner = getWinner(square);
  let status;
  if (winner) {
    status = "Winner" + winner;
  } else {
    status = "Next Player: " + (turnX? "X" : "0");
  }

  return (
    <>
      <h1>TicTacToe</h1> 
      <div className='board'>
        <div className='status'>{status}</div>
        <div className='board-row'>
          <Square value={square[0]} onMakeTurn={()=> handleClick(0)} />
          <Square value={square[1]} onMakeTurn={()=> handleClick(1)} />
          <Square value={square[2]} onMakeTurn={()=> handleClick(2)} />
        </div>
        <div className='board-row'>
          <Square value={square[3]} onMakeTurn={()=> handleClick(3)} />
          <Square value={square[4]} onMakeTurn={()=> handleClick(4)} />
          <Square value={square[5]} onMakeTurn={()=> handleClick(5)} />
        </div>
        <div className='board-row'>
          <Square value={square[6]} onMakeTurn={()=> handleClick(6)} />
          <Square value={square[7]} onMakeTurn={()=> handleClick(7)} />
          <Square value={square[8]} onMakeTurn={()=> handleClick(8)} />
        </div>
      </div>
    </>
  )
}

// Default and Main Funtion

export default function App() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const turnX = currentMove % 2 === 0;

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove +1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
  }

  function pastMove(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((square, move) => {
    let description;
    (move > 0? description = `GoTo move ${move}` : description = 'GoTo Start')
    return (
      <li key={move}>
        <button onClick={() => pastMove(move)}>{description}</button>
      </li>
    );
  })

  return (
    <>
    <div className="game">
      <div className="game-board">
        <Board turnX={turnX} square={currentSquare} onPlay={handlePlay}  />
      </div>
      <div className="game-history">
        <ol>{moves}</ol>
      </div>
    </div>
    </>
  );
}

function getWinner(square) {
  const winnerCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let index = 0; index < winnerCombo.length; index++) {
    const [a, b, c] = winnerCombo[index];
    if (square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}