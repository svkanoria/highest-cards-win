import { Game } from "@/lib/api";
import { PlayerView } from "./player-view";

export default function GameView({ game }: { game: Game }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-8">
        {game.players.map((player, index) => (
          <PlayerView
            key={index}
            player={player}
            numberOfCardsOpened={game.numberOfCardsOpened}
          />
        ))}
      </div>
    </div>
  );
}
