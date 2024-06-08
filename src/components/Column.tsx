import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import { Column as ColumnType, ColumnName } from "../types";
import AddTaskModal from "./AddTaskModal";

interface ColumnProps {
  column: ColumnType;
  onAddTask: (task: {
    name: string;
    description: string;
    boardId: number;
    status: ColumnName;
  }) => void;
}

const Column: React.FC<ColumnProps> = ({ column, onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (task: { name: string; description: string }) => {
    onAddTask({
      ...task,
      boardId: Number(column.id.split("-")[1]),
      status: column.title,
    });
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
              type="button"
              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            {column.cards.map((card, index) => (
              <Draggable
                key={card.id.toString()}
                draggableId={card.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className=" rounded-md"
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
