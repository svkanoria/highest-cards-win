import { Player } from "@/lib/api";
import { PlayingCardList } from "./playing-card-list";

export const PlayerView = ({
  player,
  operations,
  numberOfCardsOpened,
  score,
}: {
  player: Player;
  operations: string[];
  numberOfCardsOpened: number;
  score: number;
}) => (
  <div>
    <div className="flex items-center gap-4">
      <img
        height={100}
        width={100}
        src={`https://api.dicebear.com/8.x/big-smile/png/seed=${player.name}`}
      />
      <span className="text-xl" style={{ color: player.color }}>
        {player.name}
      </span>
      <div className="ml-auto text-5xl" style={{ color: player.color }}>
        {score}
      </div>
    </div>
    <PlayingCardList
      cards={player.cards}
      color={player.color}
      operations={operations}
      numberOfCardsOpened={numberOfCardsOpened}
    />
  </div>
);
