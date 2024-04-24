import { PlayingCard } from "@/lib/api";
import { PlayingCardView } from "./playing-card-view";

export const PlayingCardList = ({
  cards,
  color,
  operations,
  numberOfCardsOpened,
}: {
  cards: PlayingCard[];
  color: string;
  operations: string[];
  numberOfCardsOpened: number;
}) => (
  <div className="flex gap-4">
    {cards.map((card, index) => (
      <PlayingCardView
        key={index}
        card={card}
        color={color}
        operation={operations[index]}
        isOpen={index < numberOfCardsOpened}
      />
    ))}
  </div>
);
