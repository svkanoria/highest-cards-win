import { PlayingCard } from "@/lib/api";
import { Card, CardBody } from "@nextui-org/card";
import clsx from "clsx";

const PlayingCardInner = ({
  card,
  color,
  isOpen = false,
}: {
  card: PlayingCard;
  color: string;
  isOpen?: boolean;
}) => {
  if (isOpen) {
    return (
      <Card className="w-20 h-32">
        <CardBody className="items-center justify-center">
          <div className="text-5xl">{card.value}</div>
          {card.name ?? <div className="text-2xl">{card.name}</div>}
        </CardBody>
      </Card>
    );
  } else {
    return (
      <Card className="w-20 h-32" style={{ backgroundColor: color }}></Card>
    );
  }
};

export const PlayingCardView = ({
  card,
  color,
  operation,
  isOpen,
}: {
  card: PlayingCard;
  color: string;
  operation: string;
  isOpen: boolean;
}) => {
  return (
    <div className="grid">
      {operation === "*" ? (
        <div
          className="flex justify-center items-center w-36 rotate-[45deg]"
          style={{ gridArea: "1/1" }}
        >
          <PlayingCardInner card={card} color="#bbbbbb55" />
        </div>
      ) : null}
      <div
        className={clsx("flex justify-center items-center", {
          "w-32 -rotate-90": operation === "-",
          "w-28 rotate-[30deg]": operation === "/",
          "w-36 -rotate-[45deg]": operation === "*",
        })}
        style={{ gridArea: "1/1" }}
      >
        <PlayingCardInner card={card} color={color} isOpen={isOpen} />
      </div>
    </div>
  );
};
