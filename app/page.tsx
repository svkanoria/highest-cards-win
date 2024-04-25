"use client";

import GameView from "@/components/game-view";
import { NewGameForm } from "@/components/new-game-form";
import { Game } from "@/lib/api";
import { useState } from "react";

export default function Home() {
  const [game, setGame] = useState<Game | undefined>();

  return game ? (
    <GameView game={game} step={0} />
  ) : (
    <NewGameForm onCreate={setGame} />
  );
}
