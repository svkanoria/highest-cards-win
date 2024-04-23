import { PlayingCard } from "@/lib/api";
import { PlayingCardView } from "./playing-card-view";

export const PlayingCardList = ({
  cards,
  color,
  numberOfCardsOpened,
}: {
  cards: PlayingCard[];
  color: string;
  numberOfCardsOpened: number;
}) => (
  <div className="flex gap-4">
    {cards.map((card, index) => (
      <PlayingCardView
        key={index}
        card={card}
        color={color}
        isOpen={index < numberOfCardsOpened}
      />
    ))}
  </div>
);
