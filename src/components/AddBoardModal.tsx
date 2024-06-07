// components/AddBoardModal.tsx

import React, { useState } from 'react';
import { addBoard } from '../services/api';

interface AddBoardModalProps {
  onBoardAdded: () => void;
  onClose: () => void;
}

const AddBoardModal: React.FC<AddBoardModalProps> = ({ onBoardAdded, onClose }) => {
  const [boardName, setBoardName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await addBoard(boardName);

      if (result.isSuccess) {
        onBoardAdded();
        onClose();
      } else {
        console.error('Error adding board:', result.message);
      }
    } catch (error) {
      console.error('Error adding board:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Yeni Board Ekle</h2>
        <form onSubmit={handleAddBoard}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Board Adı</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              İptal
            </button>
            <button
              type="submit"
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Ekleniyor...' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBoardModal;
