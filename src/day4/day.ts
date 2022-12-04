import { readLinesIntoStringArray } from "../../utils/io.ts";

export function findFullContainedPairs(input: string[]) : number {
  let pairs = 0;
  input.forEach(pair => {
    const elves = pair.split(",");
    const firstElf = elves[0];
    const secondElf = elves[1];
    const firstElfFloors = firstElf.split("-").map(floor => parseInt(floor, 10));
    const secondElfFloors = secondElf.split("-").map(floor => parseInt(floor, 10));

    if (
        (secondElfFloors[0] <= firstElfFloors[0] && secondElfFloors[1] >= firstElfFloors[1]) || 
        (firstElfFloors[0] <= secondElfFloors[0] && firstElfFloors[1] >= secondElfFloors[1])
      ) {
      pairs += 1;
    }
  })
  return pairs;
}

export function findOverlappedPairs(input: string[]) : number {
  let pairs = 0;
  input.forEach(pair => {
    const elves = pair.split(",");
    const firstElf = elves[0];
    const secondElf = elves[1];
    const firstElfFloors = firstElf.split("-").map(floor => parseInt(floor, 10));
    const secondElfFloors = secondElf.split("-").map(floor => parseInt(floor, 10));

    if (
      !(
      firstElfFloors[1] < secondElfFloors[0] || firstElfFloors[0] > secondElfFloors[1]
      )
    ) {
      pairs += 1;
    }
  })
  return pairs;
}

const input = await readLinesIntoStringArray("src/day4/input.txt");
console.log("Solution for part 1 is", findFullContainedPairs(input));
console.log("Solution for part 2 is", findOverlappedPairs(input));