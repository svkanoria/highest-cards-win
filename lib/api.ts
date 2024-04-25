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
}

export interface Game {
  deck: PlayingCard[];
  players: Player[];
  operations: string[];
}

export interface GameState {
  scores: number[];
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
}: {
  deck: PlayingCard[];
  playerNames: string[];
  operationSequence: string;
}): Game {
  const operations = operationSequence
    .split("")
    .map(trim)
    .filter((o) => o !== "");
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
    });
  }
  return { deck, players, operations };
}

export function getGameState(game: Game, step: number): GameState {
  const state: GameState = { scores: [] };
  for (const player of game.players) {
    const ops = game.operations.slice(0, step);
    var score = 0;
    for (var i = 0; i < ops.length; i++) {
      const cardValue = player.cards[i].value;
      switch (ops[i]) {
        case "+":
          score += cardValue;
          break;
        case "-":
          score -= cardValue;
          break;
        case "*":
          score *= cardValue;
          break;
        case "/":
          score = Math.ceil(score / cardValue);
          break;
        default:
          throw new Error(
            `Operation '${ops[i]}' not recognized. It should be +,-,* or /`
          );
      }
    }
    state.scores.push(Math.max(score, 0));
  }
  return state;
}
