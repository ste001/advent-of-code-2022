import { readLinesIntoGroupedNumberArray } from "../../utils/io.ts";

export function findTopThreeCombined(input: number[]) : number {
  let max = 0;
  for (let i = 0; i < input.length; i = i + 1) {
    for (let j = i + 1; j < input.length; j = j + 1) {
      for (let k = j + 1; k < input.length; k = k + 1) {
        if (input[i] + input[j] + input[k] > max) {
          max = input[i] + input[j] + input[k];
        }
      }
    }
  }
  return max;
}

const input = await readLinesIntoGroupedNumberArray("src/day1/input.txt");
const max = Math.max(...input);
console.log("Solution of part 1 is", max);
console.log("Solution of part 2 is", findTopThreeCombined(input));