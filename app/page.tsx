"use client";

import { GameView } from "@/components/game-view";
import { Game } from "@/lib/api";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import dynamic from "next/dynamic";

const NewGameForm = dynamic(
  () => import("@/components/new-game-form").then((m) => m.NewGameForm),
  {
    ssr: false,
  }
);

export default function Home() {
  const [game, setGame] = useState<Game | undefined>();
  const [step, setStep] = useState(0);

  const isOver = game && step === game.operations.length;

  return game ? (
    <div className="flex flex-col items-center gap-28">
      <GameView game={game} step={step} />
      <Button
        size="lg"
        onClick={() => {
          if (isOver) {
            setGame(undefined);
            setStep(0);
          } else {
            setStep((s) => s + 1);
          }
        }}
      >
        {isOver ? "Play New Game" : "Next"}
      </Button>
    </div>
  ) : (
    <NewGameForm onCreate={setGame} />
  );
}
