import { Player } from "@/lib/api";
import { PlayingCardList } from "./playing-card-list";
import { useEffect, useState } from "react";
import { adventurer } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { motion } from "framer-motion";

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
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <img
          height={100}
          width={100}
          src={createAvatar(adventurer, { seed: player.name }).toDataUriSync()}
        />
        <span className="text-xl" style={{ color: player.color }}>
          {player.name}
        </span>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1.0 }}
          transition={{ type: "spring", bounce: 0.75 }}
          key={state.numberOfCardsOpened}
          className="ml-auto text-7xl"
          style={{ color: player.color }}
        >
          {state.score}
        </motion.div>
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
