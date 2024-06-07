'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddBoardButton from '../components/AddBoardButton';
import BoardDropdown from '../components/BoardDropdown';

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
    <div className="p-8 bg-gray-100 min-h-screen">
      <AddBoardButton onBoardAdded={handleBoardAdded} />
      <BoardDropdown
        key={updateFlag.toString()}
        onSelectBoard={handleSelectBoard}
        initialBoardId={null}
      />
    </div>
  );
};

export default HomePage;
