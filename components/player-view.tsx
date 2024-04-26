import { Player } from "@/lib/api";
import { PlayingCardList } from "./playing-card-list";
import { useEffect, useState } from "react";

export const PlayerView = ({
  player,
  operations,
  numberOfCardsOpened,
  score,
  viewUpdateDelay = 0,
}: {
  player: Player;
  operations: string[];
  numberOfCardsOpened: number;
  score: number;
  viewUpdateDelay?: number;
}) => {
  const [state, setState] = useState<
    | {
        numberOfCardsOpened: number;
        score: number;
      }
    | undefined
  >();
  useEffect(() => {
    if (!state) {
      // First render
      setState({ numberOfCardsOpened, score });
    } else {
      // Subsequent renders
      setTimeout(() => {
        setState({ numberOfCardsOpened, score });
      }, viewUpdateDelay);
    }
  }, [numberOfCardsOpened, score, viewUpdateDelay]);

  if (!state) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <img
          height={100}
          width={100}
          src={`https://api.dicebear.com/8.x/adventurer/png/seed=${player.name}`}
        />
        <span className="text-xl" style={{ color: player.color }}>
          {player.name}
        </span>
        <div className="ml-auto text-5xl" style={{ color: player.color }}>
          {state.score}
        </div>
      </div>
      <PlayingCardList
        cards={player.cards}
        color={player.color}
        operations={operations}
        numberOfCardsOpened={state.numberOfCardsOpened}
      />
    </div>
  );
};
