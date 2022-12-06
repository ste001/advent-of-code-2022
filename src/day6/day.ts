import { readTextFile } from "../../utils/io.ts";

export function isBufferUnique(input: string[]) : boolean {
  for (let j = 0; j < input.length; j++) {
    for (let k = j + 1; k < input.length; k++) {
      if (input[j] === input[k]) {
        return false;
      }
    }
  }
  return true;
}

export function indexOfFirstStartOfPacket(input: string, packetLength: number): number {
  let characters : string[] = [];
  for (let i = packetLength - 1; i < input.length; i++) {
    characters = input.slice(i + 1 - packetLength, i + 1).split("");
    if (isBufferUnique(characters)) {
      return i + 1;
    }
  }
  return 0;
}

const input = await readTextFile("src/day6/input.txt");
console.log("Solution for part 1 is", indexOfFirstStartOfPacket(input, 4));
console.log("Solution for part 2 is", indexOfFirstStartOfPacket(input, 14));
