import { readTextFile } from "../../utils/io.ts";

function checkOrder(first: any[], second: any[]): number {
  const longest: number = first.length > second.length ? first.length : second.length;

  for (let i = 0; i < longest; i++) {
    const l = first[i];
    const r = second[i];

    if (typeof l === 'number' && typeof r === 'number') {
      if (l < r) {
        return -1;
      }
      if (l > r) {
        return 1;
      }
    } else if (typeof l === 'object' && typeof r === 'object') {
      const test = checkOrder(l, r);
      if (test !== 0) {
        return test;
      }
    } else if (typeof l === 'number' && typeof r === 'object') {
      const test = checkOrder([l], r);
      if (test !== 0) {
        return test;
      }
    } else if (typeof l === 'object' && typeof r === 'number') {
      const test = checkOrder(l, [r]);
      if (test !== 0) {
        return test;
      }
    } else if (!l && r) {
      return -1;
    } else if (l && !r) {
      return 1;
    }
  }
  return 0;
}

export function sumOfIndices(input: string) : number {
  let sum = 0;
  const pairs = input.split("\n\n");
  pairs.forEach((pair, id) => {
    const first = JSON.parse(pair.split("\n")[0]);
    const second = JSON.parse(pair.split("\n")[1]);
    if (checkOrder(first, second) === -1) {
      sum += id + 1;
    }
  })
  return sum;
}

export function getDecoderKey (input: string) {
  const i = input.split("\n\n");
  const packets = i.reduce((parsed: any[], pair: string): any[] => {
    const left = pair.split('\n')[0];
    const right = pair.split('\n')[1];
    parsed.push(JSON.parse(left));
    parsed.push(JSON.parse(right));
    return parsed;
  }, [])

  const two = [[2]];
  const six = [[6]];

  const fewertwo = packets.reduce((total: number, packet: any[]) => checkOrder(packet, two) === -1 ? total + 1 : total, 1)
  const fewersix = packets.reduce((total: number, packet: any[]) => checkOrder(packet, six) === -1 ? total + 1 : total, 1)

  return fewertwo * (fewersix + 1)
}


const input = await readTextFile('src/day13/input.txt');
console.log("Solution for part 1 is", sumOfIndices(input));
console.log("Solution for part 2 is", getDecoderKey(input));