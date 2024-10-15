import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

type Player = 'X' | 'O' | null;

const App: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);

  const checkWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderSquare = (index: number) => (
    <button
      className="w-20 h-20 bg-white border border-gray-300 text-4xl font-bold flex items-center justify-center"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => renderSquare(index))}
      </div>
      {winner ? (
        <p className="text-2xl font-semibold mb-4">Winner: {winner}</p>
      ) : board.every((square) => square !== null) ? (
        <p className="text-2xl font-semibold mb-4">It's a draw!</p>
      ) : (
        <p className="text-2xl font-semibold mb-4">Next player: {currentPlayer}</p>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        onClick={resetGame}
      >
        <RefreshCw className="mr-2" size={20} />
        Reset Game
      </button>
    </div>
  );
};

export default App;