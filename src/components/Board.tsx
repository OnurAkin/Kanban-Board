import React, { useEffect, useState } from 'react';
import Column from './Column';
import { COLUMN_NAMES, Column as ColumnType, Task } from '../types';
import { getTasksByBoardId } from '../services/api';

interface BoardProps {
  boardId: number;
}

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getTasksByBoardId(boardId);

        if (result.isSuccess) {
          const data: Task[] = result.data;

          const initialData: ColumnType[] = COLUMN_NAMES.map((name, index) => ({
            id: `column-${index + 1}`,
            title: name,
            cards: data.filter((task) => task.status === name),
          }));

          setColumns(initialData);
        } else {
          console.error('Error fetching tasks:', result.message);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [boardId]);

  return (
    <div className="flex justify-center items-start p-8  min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default Board;
