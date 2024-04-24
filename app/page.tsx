import GameView from "@/components/game-view";
import { makeDeck, makeGame } from "@/lib/api";

export default function Home() {
  const game = makeGame({
    deck: makeDeck({
      "1": 15,
      "2": 12,
      "3": 9,
      "4": 6,
      "5": 3,
      "10": 1,
    }),
    playerNames: ["Little Baby P", "Aanu Panu Poo"],
    operationSequence: "+,+,-,+,+,+,-,/",
  });

  return <GameView game={game} step={8} />;
}
