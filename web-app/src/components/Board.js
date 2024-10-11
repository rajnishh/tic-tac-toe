import React from 'react';
import './Board.css';

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((row, i) =>
        row.map((cell, j) => (
          <div key={`${i}-${j}`} className="cell" onClick={() => onClick(i, j)}>
            {cell === 1 ? 'O' : cell === -1 ? 'X' : ''}
          </div>
        ))
      )}
    </div>
  );
};

export default Board;
