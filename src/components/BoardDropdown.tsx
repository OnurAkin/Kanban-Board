// components/BoardDropdown.tsx

import React, { useEffect, useState } from 'react';
import { getAllBoards } from '../services/api';

interface BoardDropdownProps {
  onSelectBoard: (boardId: number, boardName: string) => void;
  initialBoardId: string | null;
}

const BoardDropdown: React.FC<BoardDropdownProps> = ({ onSelectBoard, initialBoardId }) => {
  const [boards, setBoards] = useState<{ id: number; name: string }[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(initialBoardId);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const result = await getAllBoards();
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedBoard = boards.find(board => board.id === selectedId);
    if (selectedBoard) {
      setSelectedBoard(selectedBoard.id.toString());
      onSelectBoard(selectedBoard.id, selectedBoard.name);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Board Seç</label>
      <select
        value={selectedBoard || ''}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
      >
        <option value="">Board Seç</option>
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
