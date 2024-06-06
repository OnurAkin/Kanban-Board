import React, { useState, useEffect } from 'react';
import { Board } from '../types';

interface BoardDropdownProps {
  onSelectBoard: (boardId: number) => void;
}

const BoardDropdown: React.FC<BoardDropdownProps> = ({ onSelectBoard }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<number | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('https://apitodo.azurewebsites.net/Board/GetAll');
        const result = await response.json();

        if (result.isSuccess) {
          setBoards(result.data);
        } else {
          console.error('Error fetching boards:', result.message);
        }
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoards();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const boardId = parseInt(event.target.value, 10);
    setSelectedBoard(boardId);
    onSelectBoard(boardId);
  };

  return (
    <div className="mb-4">
      <label htmlFor="board-select" className="block text-sm font-medium text-gray-700">
        Select a Board
      </label>
      <select
        id="board-select"
        value={selectedBoard ?? ''}
        onChange={handleChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="" disabled>
          Select a board
        </option>
        {boards.map((board) => (
          <option key={board.id} value={board.id}>
            {board.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BoardDropdown;
