import React, { useEffect, useState } from 'react';
import { getAllBoards } from '../services/api';

// BoardDropdown bileşeni için prop türlerini tanımlar.
interface BoardDropdownProps {
  onSelectBoard: (boardId: number, boardName: string) => void; // Tahta seçme işlevi.
  initialBoardId: string | null; // Başlangıçta seçili olan tahta ID'si.
}

// BoardDropdown component tanımlar.
const BoardDropdown: React.FC<BoardDropdownProps> = ({ onSelectBoard, initialBoardId }) => {
  // Tüm tahtaları ve seçili boardı tutan durum değişkenlerini tanımlar.
  const [boards, setBoards] = useState<{ id: number; name: string }[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(initialBoardId);

  // Component yüklendiğinde boardları getirmek için useEffect kullanılır.
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const result = await getAllBoards(); // API'den tüm boardları getirir.
        if (result.isSuccess) { // İstek başarılıysa boardları duruma ayarlar.
          setBoards(result.data);
        } else { // Başarısızsa hata mesajını konsola yazar.
          console.error('Error fetching boards:', result.message);
        }
      } catch (error) { // Bir hata olursa yakalar ve konsola yazar.
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoards(); // boardları getirir.
  }, []);

  // initialBoardId değiştiğinde seçili boardı güncellemek için useEffect kullanılır.
  useEffect(() => {
    setSelectedBoard(initialBoardId);
  }, [initialBoardId]);

  // Seçili boardı değiştirmek için işlev tanımlar.
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value; // Seçilen ID'yi alır.
    const selectedBoard = boards.find(board => board.id === parseInt(selectedId, 10)); // Seçilen boardı bulur.
    if (selectedBoard) { // Seçilen board bulunduysa durumu günceller ve onSelectBoard işlevini çağırır.
      setSelectedBoard(selectedBoard.id.toString());
      onSelectBoard(selectedBoard.id, selectedBoard.name);
    }
  };

  return (
    // Bileşen kabuğunu oluşturur ve stil uygular.
    <div className="mb-4">
      {/* Seçme öğesi oluşturur ve seçilen değeri belirler */}
      <select
        value={selectedBoard || ''} // Seçili tahtayı belirler.
        onChange={handleChange} // Değişim olayını işler.
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Board Seç</option> {/* Varsayılan seçenek. */}
        {boards.map((board) => ( // Tüm tahtaları haritalar ve seçenekleri oluşturur.
          <option key={board.id} value={board.id}>
            {board.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BoardDropdown;
