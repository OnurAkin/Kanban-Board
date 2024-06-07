"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AddBoardButton from "../components/AddBoardButton";
import BoardDropdown from "../components/BoardDropdown";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [updateFlag, setUpdateFlag] = useState<number>(0);

  const handleSelectBoard = (boardId: number, boardName: string) => {
    router.push(`/${boardName}`);
  };

  const handleBoardAdded = () => {
    setUpdateFlag(updateFlag + 1);
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-1 col-end-3">
          <BoardDropdown
            key={updateFlag.toString()}
            onSelectBoard={handleSelectBoard}
            initialBoardId={null}
          />
        </div>

        <div className="col-end-9 col-span-2">
          {" "}
          <AddBoardButton onBoardAdded={handleBoardAdded} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
