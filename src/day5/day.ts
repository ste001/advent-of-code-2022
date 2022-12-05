import { Stack } from "../../utils/data_structures/stack.ts";
import { readLinesIntoStringArray } from "../../utils/io.ts";

export function createStacks(input: string[]) : Stack<string>[] {
  const stackNumbers = input[input.length - 1].match(/.{1,4}/g)?.map(value => parseInt(value.trim(), 0));
  if (stackNumbers) {
    const numberOfStacks = stackNumbers[stackNumbers.length - 1];
    const stacks : string[][] = [];
    for (let i = 0; i < numberOfStacks; i++) {
      stacks.push([]);
    }
    for (let i = 0; i < input.length - 1; i++) {
      const crates = input[i].match(/.{1,4}/g)?.map(value => value.trim());
      if (crates) {
        for (let j = 0; j < crates.length; j++) {
          stacks[j].push(crates[j]);
        }
      }
    }
    for (let i = 0; i < numberOfStacks; i++) {
      stacks[i].reverse();
    }
    
    const finalStacks: Stack<string>[] = [];
    for (let i = 0; i < stacks.length; i++) {
      let s = new Stack<string>();
      for (let j = 0; j < stacks[i].length; j++) {
        if (stacks[i][j] !== "") {
          s.push(stacks[i][j]); 
        }
      }
      finalStacks.push(s);
    }
    return finalStacks;
  }

  return [];
}

export function getMessage(stacks: Stack<string>[], moves: string[]) : string {
  moves.forEach(move => {
    const moveFormatted = move.split(" ").filter(v => parseInt(v, 10)).map(v => parseInt(v, 10));
    for (let i = 0; i < moveFormatted[0]; i++) {
      const n = stacks[moveFormatted[1] - 1].pop();
      if (n) {
        stacks[moveFormatted[2] - 1].push(n);
      }
    }
  });
  let message = "";
  stacks.forEach(s => {
    const block = s.pop();
    if (block) {
      message += block;
    }
  })
  return message.replaceAll(/[[\]]/g, "");
}

export function getSecondMessage(stacks: Stack<string>[], moves: string[]) : string {
  moves.forEach(move => {
    const moveFormatted = move.split(" ").filter(v => parseInt(v, 10)).map(v => parseInt(v, 10));
    const temp = new Stack<string>();
    for (let i = 0; i < moveFormatted[0]; i++) {
      const n = stacks[moveFormatted[1] - 1].pop();
      if (n) {
        temp.push(n);
      }
    }
    for (let i = 0; i < moveFormatted[0]; i++) {
      const n = temp.pop();
      if (n) {
        stacks[moveFormatted[2] - 1].push(n);
      }
    }
  });
  let message = "";
  stacks.forEach(s => {
    const block = s.pop();
    if (block) {
      message += block;
    }
  })
  return message.replaceAll(/[[\]]/g, "");
}

// PART 1
const input = await readLinesIntoStringArray("src/day5/input_structure.txt");
const stacks = createStacks(input);
const moves = await readLinesIntoStringArray("src/day5/input.txt");
console.log("Solution for part 1 is", getMessage(stacks, moves));

// PART 2
const secondInput = await readLinesIntoStringArray("src/day5/input_structure.txt");
const secondStacks = createStacks(secondInput);
const secondMoves = await readLinesIntoStringArray("src/day5/input.txt");
console.log("Solution for part 2 is", getSecondMessage(secondStacks, secondMoves));