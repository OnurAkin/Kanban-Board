import React, { useState } from 'react';
import AddBoardModal from './AddBoardModal';

interface AddBoardButtonProps {
  onBoardAdded: () => void;
}

const AddBoardButton: React.FC<AddBoardButtonProps> = ({ onBoardAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Yeni Board Ekle
      </button>
      {isModalOpen && <AddBoardModal onBoardAdded={onBoardAdded} onClose={handleCloseModal} />}
    </div>
  );
};

export default AddBoardButton;
