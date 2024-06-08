'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Board from '../../components/Board';
import BoardDropdown from '../../components/BoardDropdown';
import AddBoardModal from '../../components/AddBoardModal';
import { getAllBoards, getTasksByBoardId } from '../../services/api'; // Yeni import

const BoardPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const boardName = pathname.split('/')[1];
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [updateFlag, setUpdateFlag] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBoard, setSelectedBoard] = useState<{ id: number; name: string } | null>(null); // Yeni state

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const result = await getAllBoards();
        if (result.isSuccess) {
          const boards = result.data;
          const board = boards.find((board: { name: string }) => board.name === boardName);
          if (board) {
            setSelectedBoardId(board.id);
            setSelectedBoard(board); // Seçilen pano bilgisini ayarla
          }
        } else {
          console.error('Error fetching boards:', result.message);
        }
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoards();
  }, [boardName, updateFlag]);

  const handleSelectBoard = async (boardId: number, boardName: string) => {
    router.push(`/${boardName}`);
    setSelectedBoardId(boardId);
    const tasksResult = await getTasksByBoardId(boardId); // Seçilen pano için görevleri getir
    // İlgili işlemler yapılacak: setColumns gibi
  };

  const handleBoardAdded = () => {
    setUpdateFlag((prev) => prev + 1);
  };

  return (
    <div className="p-8 min-h-screen">
      <div className='grid grid-cols-6 gap-4'>
        <div className='col-start-1 col-end-3'>
          <BoardDropdown
            key={updateFlag.toString()}
            onSelectBoard={handleSelectBoard}
            initialBoardId={selectedBoardId ? selectedBoardId.toString() : null}
          />
        </div>
        <div className='col-end-9 col-span-2'>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Yeni Board Ekle
          </button>
        </div>
      </div>
      {selectedBoard && (
        <Board key={selectedBoard.id} boardId={selectedBoard.id} /> // Seçilen panoyu yükle
      )}
      {isModalOpen && (
        <AddBoardModal onBoardAdded={handleBoardAdded} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default BoardPage;
