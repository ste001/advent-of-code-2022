import { readLinesIntoStringArray } from "../../utils/io.ts";

export function playUpdatedRound(round: string) : number {
  const rpsMap = {
    "AY": 6,
    "BZ": 6,
    "CX": 6,
    "AX": 3,
    "BY": 3,
    "CZ": 3,
    "AZ": 0,
    "BX": 0,
    "CY": 0,
  };
  const shapeMap = {
    "X": 1,
    "Y": 2,
    "Z": 3,
  }
  const playerChoice = round[1] === "X" ? 0 : round[1] === "Y" ? 3 : 6;

  for (const [key, value] of Object.entries(rpsMap)) {
    if (key[0] === round[0] && value === playerChoice) {
      return playerChoice + shapeMap[key[1] as keyof typeof shapeMap];
    }
  }

  return 0;
}

export function playRound(round: string) : number {
  const rpsMap = {
    "AY": 6,
    "BZ": 6,
    "CX": 6,
    "AX": 3,
    "BY": 3,
    "CZ": 3,
    "AZ": 0,
    "BX": 0,
    "CY": 0,
  };
  return rpsMap[round as keyof typeof rpsMap];
}

export function pointsAfterGuide(input: string[]) : number {
  let totalScore = 0;
  input.forEach(round => {
    const roundString = round.split(" ").join("");
    const shapeMap = {
      "X": 1,
      "Y": 2,
      "Z": 3,
    }
    totalScore += playRound(roundString) + shapeMap[roundString[1] as keyof typeof shapeMap];
  });

  return totalScore;
}

export function pointsAfterUpdatedGuide(input: string[]) : number {
  let totalScore = 0;
  input.forEach(round => {
    const roundString = round.split(" ").join("");
    totalScore += playUpdatedRound(roundString);
  });

  return totalScore;
}

const input = await readLinesIntoStringArray("src/day2/input.txt");
console.log("Solution for part 1 is", pointsAfterGuide(input));
console.log("Solution for part 2 is", pointsAfterUpdatedGuide(input));