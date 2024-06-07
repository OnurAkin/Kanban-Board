'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Board from '../../components/Board';
import BoardDropdown from '../../components/BoardDropdown';

const BoardPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { boardName } = params;
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

  useEffect(() => {
    if (boardName) {
      const fetchBoardId = async () => {
        try {
          const response = await fetch('https://apitodo.azurewebsites.net/Board/GetAll');
          const result = await response.json();

          if (result.isSuccess) {
            const boards = result.data;
            const board = boards.find((board: { name: string }) => board.name === boardName);
            if (board) {
              setSelectedBoardId(board.id);
            }
          } else {
            console.error('Error fetching boards:', result.message);
          }
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
      };

      fetchBoardId();
    }
  }, [boardName]);

  const handleSelectBoard = (boardId: number, boardName: string) => {
    router.push(`/${boardName}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <BoardDropdown onSelectBoard={handleSelectBoard} initialBoardId={selectedBoardId} />
      {selectedBoardId && <Board boardId={selectedBoardId} />}
    </div>
  );
};

export default BoardPage;
