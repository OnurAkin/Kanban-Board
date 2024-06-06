import React, { useState, useEffect } from 'react';
import Column from './Column';
import { COLUMN_NAMES, Column as ColumnType, Task } from '../types';

const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  // Örnek kart verileri
  const sampleTasks: Task[] = [
    { id: 'task-1', content: 'Task 1' },
    { id: 'task-2', content: 'Task 2' },
    { id: 'task-3', content: 'Task 3' },
    // Diğer görevler...
  ];

  // Bileşen yüklendiğinde sütunları oluştur
  useEffect(() => {
    const initialData: ColumnType[] = COLUMN_NAMES.map((name, index) => ({
      id: `column-${index + 1}`,
      title: name,
      cards: sampleTasks.filter((_, i) => i % 4 === index), // Her durum için sıradaki bir görev ekleyin
    }));
    setColumns(initialData);
  }, [sampleTasks]);

  return (
    <div className="flex justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-6xl">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default Board;
