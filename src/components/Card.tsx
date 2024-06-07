// Card.tsx
import React from 'react';
import { Task } from '../types';

interface CardProps {
  card: Task;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h3 className="text-md font-semibold">{card.name}</h3>
      <p className="text-sm">{card.description}</p>
    </div>
  );
};

export default Card;
