// Card.tsx
import React from 'react';
import { Task } from '../types';

interface CardProps {
  card: Task;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="block max-w-sm p-6 rounded-lg shadow hover:bg-gray-100 bg-pink-400 dark:hover:bg-gray-700">
      <h3 className="text-md font-semibold">{card.name}</h3>
      <p className="text-sm break-words">{card.description}</p>
    </div>
  );
};

export default Card;
