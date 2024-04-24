import { Game, getGameState } from "@/lib/api";
import { PlayerView } from "./player-view";

export default function GameView({ game, step }: { game: Game; step: number }) {
  const state = getGameState(game, step);
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-8">
        {game.players.map((player, index) => (
          <PlayerView
            key={index}
            player={player}
            operations={game.operations}
            numberOfCardsOpened={step}
            score={state.scores[index]}
          />
        ))}
      </div>
    </div>
  );
}
