import { readLinesIntoStringArray } from "../../utils/io.ts";

export function findSignalStrength(input: string[]) : number {
  let sumOfStrenghts = 0;
  let cycle = 0;
  let x = 1;

  input.forEach(instruction => {
    const instructionArray = instruction.split(" ");
    if (instructionArray[0] === "noop") {
      cycle += 1;
      if (cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle == 180 || cycle === 220) {
        sumOfStrenghts += x * cycle;
      }
    } else if (instructionArray[0] === "addx") {
      for (let i = 0; i < 2; i++) {
        cycle += 1;
        if (cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle == 180 || cycle === 220) {
          sumOfStrenghts += x * cycle;
        }
        if (i === 1) {
          const v = parseInt(instructionArray[1], 10);
          x += v;
        }
      }
    }
  })
  
  return sumOfStrenghts;
}

export function getCrt(input: string[]) : string[][] {
  let cycle = 0;
  let x = 1;
  let pixelsVisible = [0,1,2];
  let line = 0;

  const crt = new Array(6).fill(".").map(() => new Array(40).fill("."));

  input.forEach(instruction => {
    const instructionArray = instruction.split(" ");
    if (instructionArray[0] === "noop") {
      if (pixelsVisible.includes(cycle)) {
        crt[line][cycle] = "#";
      }
      cycle += 1;
      if (cycle % 40 === 0) {
        cycle = 0;
        line += 1;
      }
    } else if (instructionArray[0] === "addx") {
      for (let i = 0; i < 2; i++) {
        if (pixelsVisible.includes(cycle)) {
          crt[line][cycle] = "#";
        }
        cycle += 1;
        if (cycle % 40 === 0) {
          cycle = 0;
          line += 1;
        }
        if (i === 1) {
          const v = parseInt(instructionArray[1], 10);
          x += v;
          pixelsVisible = [x - 1, x, x + 1];
        }
      }
    }
  })

  return crt;
}

export function printCrt(input: string[][]) : void {
  for (let i = 0; i < input.length; i++) {
      console.log(input[i].join(""));
  }
}

const input = await readLinesIntoStringArray("src/day10/input.txt");
console.log("Solution for part 1 is", findSignalStrength(input));
const crtScreen = getCrt(input);
console.log("Solution for part 2 is");
printCrt(crtScreen);