// Card.tsx
import React from "react";
import { Card as CardType } from "../types";

interface CardProps {
  card: CardType;
  onDelete: () => void;
  color: string;
}

const Card: React.FC<CardProps> = ({ card, onDelete, color }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md text-white`} style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold">{card.name}</h3>
        <button
          onClick={onDelete}
          type="button"
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-sm">{card.description}</p>
    </div>
  );
};

export default Card;
