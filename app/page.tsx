import GameView from "@/components/game-view";
import { makeDeck, makeGame } from "@/lib/api";

export default function Home() {
  const deck = makeDeck({ "1": 20, "2": 15, "3": 10, "4": 6, "5": 6, "10": 1 });
  const game = makeGame({
    deck,
    playerNames: ["Rootle Singh", "Gah Person"],
    operationSequence: "+,+,-,+,*,+,-,/",
  });

  return <GameView game={game} />;
}
