import React, { useState } from 'react';
import { COLUMN_NAMES, ColumnName } from '../types';

// AddTaskModal bileşeni için prop türlerini tanımlar.
interface AddTaskModalProps {
  isOpen: boolean; // Modal'ın açık olup olmadığını belirler.
  onClose: () => void; // Modal'ı kapatmak için işlev.
  onSubmit: (task: { name: string; description: string; status: ColumnName }) => void; // Yeni görevi eklemek için işlev.
}

// AddTaskModal bileşenini tanımlar.
const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  // Görev adı, açıklama ve durumu için durum değişkenlerini tanımlar.
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ColumnName>(COLUMN_NAMES[0]); // Varsayılan olarak ilk durumu seçer.

  // Görev ekleme formu gönderildiğinde çağrılan işlevi tanımlar.
  const handleSubmit = () => {
    onSubmit({ name, description, status }); // Görevi gönderir.
    // Form alanlarını varsayılan değerlere sıfırlar.
    setName('');
    setDescription('');
    setStatus(COLUMN_NAMES[0]); // Varsayılan duruma sıfırlar.
    onClose(); // Modal'ı kapatır.
  };

  // Modal kapalıysa hiçbir şey render etmez.
  if (!isOpen) return null;

  return (
    // Modal içeriğini render eder.
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>
        {/* Görev adını girmek için input alanı. */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        {/* Görev açıklamasını girmek için textarea. */}
        <div className="mb-4">
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          ></textarea>
        </div>
        {/* Görev durumunu seçmek için dropdown menü. */}
        <div className="mb-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ColumnName)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            {COLUMN_NAMES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        {/* İptal ve ekle düğmeleri. */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 bg-gray-300 p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
