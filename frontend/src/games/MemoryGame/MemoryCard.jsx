import { saveGameResult } from "../../utils/api";
function MemoryCard({ card, isFlipped, isMatched, onClick }) {
  return (
    <button
      className={`memory-card ${
        isFlipped || isMatched ? "flipped" : ""
      }`}
      onClick={onClick}
      disabled={isMatched}
      aria-label={
        isFlipped || isMatched
          ? `Card showing ${card.value}`
          : "Hidden memory card"
      }
    >
      <div className="card-inner">
        <div className="card-front">
          ?
        </div>

        <div className="card-back">
          {card.value}
        </div>
      </div>
    </button>
  );
}

export default MemoryCard;