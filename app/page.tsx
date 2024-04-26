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
  const [disabled, setDisabled] = useState(false);

  const isOver = game && step === game.operations.length;
  const staggerInMs = 1000;

  return game ? (
    <div className="flex flex-col items-center gap-28">
      <GameView
        game={game}
        step={step}
        playerViewUpdationStagger={staggerInMs}
      />
      <Button
        size="lg"
        disabled={disabled}
        isDisabled={disabled}
        onClick={() => {
          setDisabled(true);
          if (isOver) {
            setGame(undefined);
            setStep(0);
          } else {
            setStep((s) => s + 1);
          }
          setTimeout(
            () => setDisabled(false),
            game.players.length * staggerInMs
          );
        }}
      >
        {isOver ? "Play New Game" : "Next"}
      </Button>
    </div>
  ) : (
    <NewGameForm onCreate={setGame} />
  );
}
