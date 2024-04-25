"use client";

import { Game, makeDeck, makeGame } from "@/lib/api";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const DEFAULT_DECK = makeDeck({
  "1": 15,
  "2": 12,
  "3": 9,
  "4": 6,
  "5": 3,
  "10": 1,
});

export const NewGameForm = ({
  onCreate,
}: {
  onCreate: (game: Game) => void;
}) => {
  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col gap-8 w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const game = makeGame({
            deck: DEFAULT_DECK,
            playerNames: [
              formData.get("player1") as string,
              formData.get("player2") as string,
            ],
            operationSequence: formData.get("operations") as string,
          });
          onCreate(game);
        }}
      >
        <Input
          name="player1"
          type="text"
          label="Player 1"
          isRequired
          size="lg"
        />
        <Input
          name="player2"
          type="text"
          label="Player 2"
          isRequired
          size="lg"
        />
        <Input
          name="operations"
          type="text"
          label="Operations"
          defaultValue="+++-+*-/*"
          isRequired
          size="lg"
          pattern="^[+\-\*\/\s]+$"
          description="Any combination of +, -, * or /"
          classNames={{ input: "font-mono tracking-[0.5rem]" }}
        />
        <Button type="submit" size="lg" color="primary">
          Go!
        </Button>
      </form>
    </div>
  );
};
