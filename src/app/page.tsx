// pages/index.tsx
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import AddBoardButton from "../components/AddBoardButton";
import BoardDropdown from "../components/BoardDropdown";
import { useVisitedPages } from "../visited/useVisitedPages";
import { useRouter } from "next/navigation";

// Dinamik olarak yükle (Next.js yalnızca istemci tarafında yükler)
const RecentPages = dynamic(() => import("../visited/RecentPages"), { ssr: false });

const HomePage: React.FC = () => {
  const router = useRouter();
  const [updateFlag, setUpdateFlag] = useState<number>(0);

  useVisitedPages();

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
      <RecentPages />
    </div>
  );
};

export default HomePage;
