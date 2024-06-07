import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import { Column as ColumnType } from '../types';

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="p-4 bg-neutral-800 rounded-lg shadow-md w-full max-w-xs sm:max-w-md md:max-w-sm lg:max-w-xs xl:max-w-md"
        >
          <h2 className="text-lg font-semibold mb-4 text-white">{column.title}</h2>
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
        </div>
      )}
    </Droppable>
  );
};

export default Column;
