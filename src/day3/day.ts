import { readLinesIntoStringArray } from "../../utils/io.ts";

type Table<T> = {
  [key: string]: T
}

const priorityTable = createPriorityTable();

export function createPriorityTable() : Table<number> {
  const characters = "abcdefghijklmnopqrstuvwxyz" + "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const table : Table<number> = {};
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    table[character as keyof typeof table] = i + 1;
  }
  return table;
}

export function getSharedItem(first: string, second: string) : string {
  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      if (first[i] === second[j]) {
        return first[i];
      }
    }
  }
  return "";
}

export function getSharedItemGrouped(first: string, second: string, third: string) : string {
  const sharedBetweenFirstAndSecond = [];
  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      if (first[i] === second[j]) {
        sharedBetweenFirstAndSecond.push(first[i]);
      }
    }
  }
  for (let i = 0; i < sharedBetweenFirstAndSecond.length; i++) {
    if (third.includes(sharedBetweenFirstAndSecond[i])) {
      return sharedBetweenFirstAndSecond[i];
    }
  }
  return "";
}

export function sumOfPriorities(input: string[]): number {
  let prioritySum = 0;
  input.forEach(line => {
    const firstComp = line.slice(0, line.length/2);
    const secondComp = line.slice(line.length/2, line.length);
    const sharedItem = getSharedItem(firstComp, secondComp);
    prioritySum += priorityTable[sharedItem];
  });
  return prioritySum;
}

export function sumOfGroupedPriorities(input: string[]): number {
  let prioritySum = 0;
  const groupedInput = [];
  let startGroup = 0;
  for (let i = 0; i < input.length; i++) {
    if ((i + 1) % 3 == 0) {
      const groupOfThree = input.slice(startGroup, i + 1);
      groupedInput.push(groupOfThree);
      startGroup = i + 1;
    }
  }
  groupedInput.forEach(group => {
    const sharedItem = getSharedItemGrouped(group[0], group[1], group[2]);
    prioritySum += priorityTable[sharedItem];
  })
  return prioritySum;
}

const input = await readLinesIntoStringArray('src/day3/input.txt');
console.log("Part 1 solution is", sumOfPriorities(input));
console.log("Part 2 solution is", sumOfGroupedPriorities(input));