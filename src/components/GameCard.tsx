import { Link } from "react-router-dom";
import type { Game } from "./Game";
import "./gameCard.css";
import React from "react";

interface GameCardProps {
    key: string;
    game: Game;
    isFavorite: boolean;
    onToggleFavorite: (game: Game) => void;
}

const GameCardComponent: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite }) => {

  return (
    <div className="card-game relative max-w-sm rounded overflow-hidden shadow-lg">
      <button
        className="absolute top-2 z-10 right-2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md transition"
        aria-label="Add to favorites"
        onClick={() => onToggleFavorite(game)}
      >
        {isFavorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            className="fill-yellow-400 stroke-yellow-400 transition-colors duration-200"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            className="stroke-black hover:stroke-yellow-400 transition-colors duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        )}
      </button>

      <Link to={`/game/${game.gameID}`} className="block">
        <img
          className="w-full object-cover game-img"
          src={game.thumb}
          alt={game.external}
        />
        <div className="middle z-10">
          <div className="text">{game.external}</div>
        </div>
      </Link>
    </div>
  );
};

export const GameCard = React.memo(GameCardComponent);
