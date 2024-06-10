// pages/index.tsx
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AddBoardButton from "../components/AddBoardButton";
import BoardDropdown from "../components/BoardDropdown";
import Board from '../components/Board';
import { useVisitedPages } from "../visited/useVisitedPages";
import { useRouter } from "next/navigation";
import { getAllBoards } from "../services/api"; // getAllBoards fonksiyonunun aktarımı.

// Dinamik olarak yükle (Next.js yalnızca istemci tarafında yükler)
const RecentPages = dynamic(() => import("../visited/RecentPages"), { ssr: false });

const HomePage: React.FC = () => {
  const router = useRouter();
  const [updateFlag, setUpdateFlag] = useState<number>(0);
  const [boards, setBoards] = useState<Array<{ id: number, name: string }>>([]); // Boards state
  const [initialBoardId, setInitialBoardId] = useState<number>(0); // Initial board ID state

  useVisitedPages();
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const result = await getAllBoards(); // API'den tüm boardları getirir.
        if (result.isSuccess) { // İstek başarılıysa boardları duruma ayarlar.
          setBoards(result.data);
          if (result.data.length > 0) {
            setInitialBoardId(result.data[0].id); // İlk board'un ID'sini ayarlar
          }
        } else { // Başarısızsa hata mesajını konsola yazar.
          console.error('Error fetching boards:', result.message);
        }
      } catch (error) { // Bir hata olursa yakalar ve konsola yazar.
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoards(); // boardları getirir.
  }, [updateFlag]);
  const handleSelectBoard = (boardId: number, boardName: string) => {
    router.push(`/${boardName}`);
  };

  const handleBoardAdded = () => {
    setUpdateFlag(updateFlag + 1);
  };

  return (
    <div className="p-8 min-h-screen relative">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-1 col-end-3">
          <BoardDropdown
            key={updateFlag.toString()}
            onSelectBoard={handleSelectBoard}
            initialBoardId={null}
          />
        </div>

        <div className="col-end-9 col-span-2">
          <AddBoardButton onBoardAdded={handleBoardAdded} />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-1 col-end-3">

        </div>

        <div className="col-end-9 col-span-2">
        <RecentPages />
        </div>
      </div>
    
      <Board key={initialBoardId} boardId={initialBoardId} />
    </div>
  );
};

export default HomePage;
