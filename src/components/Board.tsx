import React, { useEffect, useState } from 'react';
import Column from './Column';
import { COLUMN_NAMES, Column as ColumnType, Task, ColumnName } from '../types';
import { getTasksByBoardId, addTask, deleteTask } from '../services/api';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface BoardProps {
  boardId: number;
}

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTasksByBoardId(boardId);

        if (result.isSuccess) {
          const data: Task[] = result.data;

          const newColumns: ColumnType[] = COLUMN_NAMES.map((name) => {
            const cards = data.filter((task) => task.status === name);
            return {
              id: `column-${COLUMN_NAMES.indexOf(name) + 1}`,
              title: name,
              cards,
            };
          });

          setColumns(newColumns);
        } else {
          console.error('Error fetching tasks:', result.message);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [boardId]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceColumnIndex = columns.findIndex(col => col.id === source.droppableId);
    const destinationColumnIndex = columns.findIndex(col => col.id === destination.droppableId);

    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn = columns[destinationColumnIndex];

    const [movedCard] = sourceColumn.cards.splice(source.index, 1);
    destinationColumn.cards.splice(destination.index, 0, movedCard);

    const newColumns = [...columns];
    newColumns[sourceColumnIndex] = sourceColumn;
    newColumns[destinationColumnIndex] = destinationColumn;

    setColumns(newColumns);
  };

  const handleAddTask = async (task: { name: string; description: string; boardId: number; status: ColumnName }) => {
    try {
      task.boardId = boardId;
      const result = await addTask(task);
      if (result.isSuccess) {
        setColumns((prevColumns) => {
          const updatedColumns = [...prevColumns];
          const columnIndex = updatedColumns.findIndex((col) => col.title === task.status);
          if (columnIndex >= 0) {
            updatedColumns[columnIndex].cards.push(result.data);
          }
          return updatedColumns;
        });
      } else {
        console.error('Error adding task:', result.message);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const result = await deleteTask(taskId);
      if (result.isSuccess) {
        setColumns((prevColumns) => {
          const updatedColumns = prevColumns.map((col) => ({
            ...col,
            cards: col.cards.filter((card) => card.id !== taskId),
          }));
          return updatedColumns;
        });
      } else {
        console.error("Error deleting task:", result.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center items-start p-8 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl">
          {columns.map((column) => (
            <Column key={column.id} column={column} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
