import React from "react";
import { Card as CardType } from "../types";

// Card bileşeni için prop türlerini tanımlar.
interface CardProps {
  card: CardType; // Kart verilerini içerir.
  onDelete: () => void; // Kartı silme işlevi.
  color: string; // Kartın arka plan rengi.
}

// Card bileşenini tanımlar.
const Card: React.FC<CardProps> = ({ card, onDelete, color }) => {
  return (
    // Kartın ana kabuğunu oluşturur ve stil uygulamalarını yapar.
    <div className={`p-4 rounded-lg shadow-md text-white`} style={{ backgroundColor: color }}>
      {/* Kartın başlık kısmını ve silme butonunu içerir. */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold break-all">{card.name}</h3>
        <button
          onClick={onDelete} // Butona tıklandığında onDelete işlevini çağırır.
          type="button"
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          {/* SVG ile çarpı (X) işareti oluşturur. */}
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
      {/* Kartın açıklama kısmını içerir. */}
      <p className="text-sm break-words">{card.description}</p>
    </div>
  );
};

export default Card;
