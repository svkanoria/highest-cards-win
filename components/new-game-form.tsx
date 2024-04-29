"use client";

import { Game, makeDeck, makeGame } from "@/lib/api";
import { generateName } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { motion } from "framer-motion";

const MAKE_DEFAULT_DECK = () =>
  makeDeck({
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
    <div className="flex items-center justify-center gap-12">
      <motion.div
        initial={{ opacity: 0, x: -200, scale: 0.7 }}
        animate={{ opacity: 1, x: 0, rotate: 360, scale: 1.0 }}
        transition={{ type: "spring" }}
      >
        <Image
          src="/logo.png"
          alt="Highest Cards Win logo"
          width={400}
          height={400}
          className="rounded-lg"
        />
      </motion.div>
      <form
        className="flex flex-col gap-8 w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const game = makeGame({
            deck: MAKE_DEFAULT_DECK(),
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
          defaultValue={generateName()}
          isRequired
          size="lg"
        />
        <Input
          name="player2"
          type="text"
          label="Player 2"
          defaultValue={generateName()}
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
