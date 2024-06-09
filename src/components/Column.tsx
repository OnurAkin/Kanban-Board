import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import { Column as ColumnType, ColumnName } from "../types";
import AddTaskModal from "./AddTaskModal";
import { COLUMN_COLORS } from "../types";

// Column bileşeni için prop türlerini tanımlar.
interface ColumnProps {
  column: ColumnType; // Sütunun verilerini içerir.
  onAddTask: (task: { // Görev ekleme işlevi.
    name: string;
    description: string;
    boardId: number;
    status: ColumnName;
  }) => void;
  onDeleteTask: (taskId: number) => void; // Görev silme işlevi.
}

// Column bileşenini tanımlar.
const Column: React.FC<ColumnProps> = ({ column, onAddTask, onDeleteTask }) => {
  // Modal açma/kapama durumunu takip eder.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Görev ekleme işlemini ele alır.
  const handleAddTask = (task: { name: string; description: string }) => {
    onAddTask({
      ...task,
      boardId: Number(column.id.split("-")[1]), // Tahta ID'sini sütun ID'sinden alır.
      status: column.title, // Görevin durumunu sütun başlığı olarak ayarlar.
    });
  };

  return (
    // Droppable alanı tanımlar ve sütun ID'sini droppableId olarak belirler.
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps} // Droppable özelliklerini uygular.
          ref={provided.innerRef} // İç referansı Droppable'a bağlar.
          className="p-4 rounded-lg dark:bg-gray-700 shadow-md w-full max-w-xs sm:max-w-md md:max-w-sm lg:max-w-xs xl:max-w-md" // Stil sınıflarını uygular.
        >
          {/* Sütun başlığı ve görev ekleme butonunu içerir. */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">{column.title}</h2>
            <button
              onClick={() => setIsModalOpen(true)} // Butona tıklandığında modalı açar.
              type="button"
              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              {/* SVG ile artı işareti oluşturur. */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
          {/* Kartlar için alan oluşturur ve map ile kartları oluşturur. */}
          <div className="space-y-4">
            {column.cards.map((card, index) => (
              <Draggable
                key={card.id.toString()} // Kart ID'sini anahtar olarak kullanır.
                draggableId={card.id.toString()} // Kart ID'sini draggableId olarak belirler.
                index={index} // Kartın sırasını belirler.
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef} // İç referansı Draggable'a bağlar.
                    {...provided.draggableProps} // Draggable özelliklerini uygular.
                    {...provided.dragHandleProps} // Sürükleme özelliklerini uygular.
                    className={`rounded-md bg-${COLUMN_COLORS[column.title]}`} // Kartın rengini belirler.
                  >
                    {/* Kart bileşenini render eder. */}
                    <Card
                      card={card}
                      onDelete={() => onDeleteTask(card.id)} // Silme işlemi için işlev sağlar.
                      color={COLUMN_COLORS[column.title]} // Kartın rengini belirler.
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder} {/* Sürükleme sırasında alan boşluğunu korur. */}
          </div>
          {/* Görev ekleme modalini render eder. */}
          <AddTaskModal
            isOpen={isModalOpen} // Modalın açık olup olmadığını belirler.
            onClose={() => setIsModalOpen(false)} // Modalı kapatma işlevi sağlar.
            onSubmit={handleAddTask} // Görev ekleme işlevi sağlar.
          />
        </div>
      )}
    </Droppable>
  );
};

export default Column;
