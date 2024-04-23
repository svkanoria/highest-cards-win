import { shuffle, times, trim } from "lodash";
import { HSLtoString, generateHSL } from "./color-utils";

export interface PlayingCard {
  value: number;
  name?: string;
}

export interface Player {
  name: string;
  color: string;
  cards: PlayingCard[];
  score: number;
}

export interface Game {
  deck: PlayingCard[];
  players: Player[];
  operations: string[];
  currentStep: number;
}

function makeCard(str: string): PlayingCard {
  const [valueStr, name] = str.split(":");
  const value = parseInt(valueStr);
  if (isNaN(value)) {
    throw new Error(
      `Playing card '${str}' is incorrect. It must be like 'number' or 'number:name'`
    );
  }
  return { value, name };
}

export function makeDeck(cardCounts: Record<string, number>): PlayingCard[] {
  const deck = [];
  for (const key in cardCounts) {
    deck.push(...times(cardCounts[key], () => makeCard(key)));
  }
  return shuffle(deck);
}

export function makeGame({
  deck,
  playerNames,
  operationSequence,
  currentStep = 1,
}: {
  deck: PlayingCard[];
  playerNames: string[];
  operationSequence: string;
  currentStep?: number;
}): Game {
  const operations = operationSequence.split(",").map(trim);
  if (operations.length * playerNames.length > deck.length) {
    throw new Error(
      `The game has ${playerNames.length} players, each needing ${operations.length} cards. ` +
        `However, the deck has only ${deck.length} cards in it`
    );
  }
  const players = [];
  for (const name of playerNames) {
    players.push({
      name,
      color: HSLtoString(generateHSL(name)),
      cards: deck.splice(0, operations.length),
      score: 0,
    });
  }
  return { deck, players, operations, currentStep };
}
