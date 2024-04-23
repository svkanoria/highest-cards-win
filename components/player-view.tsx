import { Player } from "@/lib/api";
import { PlayingCardList } from "./playing-card-list";

export const PlayerView = ({
  player,
  numberOfCardsOpened,
}: {
  player: Player;
  numberOfCardsOpened: number;
}) => (
  <div>
    <PlayingCardList
      cards={player.cards}
      color={player.color}
      numberOfCardsOpened={numberOfCardsOpened}
    />
  </div>
);
