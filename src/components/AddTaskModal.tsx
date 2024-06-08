import React, { useState } from 'react';
import { COLUMN_NAMES, ColumnName } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: { name: string; description: string; status: ColumnName }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ColumnName>(COLUMN_NAMES[0]); // Default to the first status

  const handleSubmit = () => {
    onSubmit({ name, description, status });
    setName('');
    setDescription('');
    setStatus(COLUMN_NAMES[0]); // Reset to default status
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        ></textarea>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ColumnName)}
          className="w-full mb-4 p-2 border rounded"
        >
          {COLUMN_NAMES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
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
