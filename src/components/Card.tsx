import React from "react";
import { Task } from "../types";

interface CardProps {
  card: Task;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ card, onDelete }) => {
  return (
    <div className="bg-gray-700 p-2 rounded-md flex justify-between items-center">
      <div>
        <h3 className="text-white text-lg">{card.name}</h3>
        <p className="text-gray-400">{card.description}</p>
      </div>
      <button
        onClick={onDelete}
        className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
      >
        Sil
      </button>
    </div>
  );
};

export default Card;
