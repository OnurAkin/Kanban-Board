// Card.tsx
import React from 'react';
import { Task } from '../types';

interface CardProps {
  card: Task;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="p-4 bg-pink-400 rounded-lg shadow-md">
      <p className="text-sm">{card.content}</p>
    </div>
  );
};

export default Card;
