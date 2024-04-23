import { PlayingCard } from "@/lib/api";
import { Card, CardBody } from "@nextui-org/card";
import clsx from "clsx";

export const PlayingCardView = ({
  card,
  color,
  isOpen,
}: {
  card: PlayingCard;
  color: string;
  isOpen: boolean;
}) => {
  if (isOpen) {
    return (
      <Card className="w-24 h-36">
        <CardBody className="items-center justify-center">
          <div className="text-5xl">{card.value}</div>
          {card.name ?? <div className="text-2xl">{card.name}</div>}
        </CardBody>
      </Card>
    );
  } else {
    return (
      <Card className={"w-24 h-36"} style={{ backgroundColor: color }}></Card>
    );
  }
};
