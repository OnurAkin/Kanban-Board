// Column.tsx
import React from 'react';
import Card from './Card';
import { Column as ColumnType } from '../types';

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div className="p-4 bg-neutral-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
      <div className="space-y-4">
        {column.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Column;

