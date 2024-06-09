import React, { useState } from 'react';
import { addBoard } from '../services/api';

// AddBoardModal bileşeni için prop türlerini tanımlar.
interface AddBoardModalProps {
  onBoardAdded: () => void; // Yeni bir board eklendiğinde çağrılan işlev.
  onClose: () => void; // Modal'ı kapatmak için işlev.
}

// AddBoardModal bileşenini tanımlar.
const AddBoardModal: React.FC<AddBoardModalProps> = ({ onBoardAdded, onClose }) => {
  // Board adı ve yüklenme durumunu izlemek için durum değişkenlerini tanımlar.
  const [boardName, setBoardName] = useState(''); // Board adını tutar.
  const [isLoading, setIsLoading] = useState(false); // Yüklenme durumunu tutar.

  // Form gönderildiğinde yeni board eklemek için işlev.
  const handleAddBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Yüklenme durumunu başlatır.

    try {
      // API'ye board ekleme isteği gönderir.
      const result = await addBoard(boardName);

      // Başarılı olursa, ilgili işlevleri çağırır.
      if (result.isSuccess) {
        onBoardAdded(); // Board eklendiğinde güncelleme yapmak için çağrılır.
        onClose(); // Modal'ı kapatır.
      } else {
        console.error('Error adding board:', result.message); // Hata mesajını konsola yazdırır.
      }
    } catch (error) {
      console.error('Error adding board:', error); // Hata mesajını konsola yazdırır.
    } finally {
      setIsLoading(false); // Yüklenme durumunu sıfırlar.
    }
  };

  return (
    // Modal arka planını ve içeriğini render eder.
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Yeni Board Ekle</h2>
        {/* Board ekleme formunu render eder. */}
        <form onSubmit={handleAddBoard}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Board Adı</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={boardName} // Board adını input alanına bağlar.
              onChange={(e) => setBoardName(e.target.value)} // Input alanında değişiklikleri yönetir.
              required // Input alanını zorunlu yapar.
            />
          </div>
          {/* İptal ve ekle düğmelerini render eder. */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose} // Modal'ı kapatmak için tıklama işlevi.
              className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              İptal
            </button>
            <button
              type="submit"
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
              disabled={isLoading} // Yüklenme durumuna göre düğmeyi devre dışı bırakır.
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
