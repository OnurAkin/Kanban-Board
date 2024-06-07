import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import { Column as ColumnType } from '../types';
import AddTaskModal from './AddTaskModal';

interface ColumnProps {
  column: ColumnType;
  onAddTask: (task: { name: string; description: string; boardId: number }) => void;
}

const Column: React.FC<ColumnProps> = ({ column, onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddTask = (task: { name: string; description: string }) => {
    onAddTask({ ...task, boardId: Number(column.id.split('-')[1]) });
  };
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="p-4 bg-neutral-800 rounded-lg shadow-md w-full max-w-xs sm:max-w-md md:max-w-sm lg:max-w-xs xl:max-w-md"
        >
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">{column.title}</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Task
            </button>
          </div>
          <div className="space-y-4">
            {column.cards.map((card, index) => (
              <Draggable key={card.id.toString()} draggableId={card.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-gray-700 p-2 rounded-md"
                  >
                    <Card card={card} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
          <AddTaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddTask}
          />
        </div>
      )}
    </Droppable>
  );
};

export default Column;
