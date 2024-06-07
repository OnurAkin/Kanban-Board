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

  useEffect(() => {
    setSelectedBoard(initialBoardId);
  }, [initialBoardId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedBoard = boards.find(board => board.id === parseInt(selectedId, 10));
    if (selectedBoard) {
      setSelectedBoard(selectedBoard.id.toString());
      onSelectBoard(selectedBoard.id, selectedBoard.name);
    }
  };

  return (
    <div className="mb-4">

      <select
        value={selectedBoard || ''}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
