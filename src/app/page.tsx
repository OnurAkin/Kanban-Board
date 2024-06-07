'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BoardDropdown from '../components/BoardDropdown';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleSelectBoard = (boardId: number, boardName: string) => {
    router.push(`/${boardName}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <BoardDropdown onSelectBoard={handleSelectBoard} />
    </div>
  );
};

export default HomePage;
