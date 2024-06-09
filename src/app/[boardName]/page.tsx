// 'use client' ifadesi, bu dosyanın istemci tarafında çalışacağını belirtir.
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Board from '../../components/Board';
import BoardDropdown from '../../components/BoardDropdown';
import AddBoardModal from '../../components/AddBoardModal';
// API servislerini içe aktarır.
import { getAllBoards, getTasksByBoardId } from '../../services/api';

const BoardPage: React.FC = () => {
  const router = useRouter(); // Sayfalar arasında yönlendirme yapar.
  const pathname = usePathname(); // Geçerli sayfanın yolunu alır.
  const boardName = pathname.split('/')[1]; // URL'den board adını çıkarır.
  
  // Durum değişkenlerini tanımlar.
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null); // Seçili board id'sini tutar.
  const [updateFlag, setUpdateFlag] = useState<number>(0); // Güncelleme işlemleri için flag.
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal'ın açık olup olmadığını takip eder.
  const [selectedBoard, setSelectedBoard] = useState<{ id: number; name: string } | null>(null); // Seçili board bilgisini tutar.

  // Component ilk yüklendiğinde ve boardName veya updateFlag değiştiğinde board'ları getirir.
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const result = await getAllBoards();
        if (result.isSuccess) {
          const boards = result.data;
          const board = boards.find((board: { name: string }) => board.name === boardName);
          if (board) {
            setSelectedBoardId(board.id); // Seçili board id'sini ayarla.
            setSelectedBoard(board); // Seçili board bilgisini ayarla.
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

  // Board seçildiğinde çalışır.
  const handleSelectBoard = async (boardId: number, boardName: string) => {
    router.push(`/${boardName}`); // Yeni board'a yönlendir.
    setSelectedBoardId(boardId); // Seçili board id'sini ayarla.
    const tasksResult = await getTasksByBoardId(boardId); // Seçili board'ın görevlerini getir.
    // Görevlerle ilgili işlemler burada yapılacak, örneğin setColumns gibi.
  };

  // Yeni bir board eklendiğinde çalışır.
  const handleBoardAdded = () => {
    setUpdateFlag((prev) => prev + 1); // updateFlag'i artırarak useEffect'i tetikler.
  };

  return (
    <div className="p-8 min-h-screen">
      <div className='grid grid-cols-6 gap-4'>
        {/* Board seçme dropdown menüsü */}
        <div className='col-start-1 col-end-3'>
          <BoardDropdown
            key={updateFlag.toString()} // Güncelleme için benzersiz anahtar.
            onSelectBoard={handleSelectBoard}
            initialBoardId={selectedBoardId ? selectedBoardId.toString() : null} // Başlangıçtaki seçili board id'si.
          />
        </div>
        {/* Yeni board ekleme butonu */}
        <div className='col-end-9 col-span-2'>
          <button
            onClick={() => setIsModalOpen(true)} // Modal'ı açar.
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Yeni Board Ekle
          </button>
        </div>
      </div>
      {/* Seçilen board'ı render eder */}
      {selectedBoard && (
        <Board key={selectedBoard.id} boardId={selectedBoard.id} />
      )}
      {/* Modal'ı render eder */}
      {isModalOpen && (
        <AddBoardModal onBoardAdded={handleBoardAdded} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};


export default BoardPage;
