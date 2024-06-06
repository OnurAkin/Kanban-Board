// Card.tsx
import React from 'react';
import { Task } from '../types';

interface CardProps {
  card: Task;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="p-4 bg-pink-500 rounded-lg shadow-md">
      <h3 className="text-md font-semibold">{card.name}</h3>
      <p className="text-sm">{card.description}</p>
    </div>
  );
};

export default Card;
