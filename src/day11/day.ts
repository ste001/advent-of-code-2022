import { readTextFile } from "../../utils/io.ts";

type Monkey = {
  items: number[],
  itemsInspected: number,
  operation: string[],
  test: string,
}

export function createMonkeysObjects(input: string) : Monkey[] {
  const monkeys : Monkey[] = []
  input.split("\n\n").forEach(monkey => {
    const monkeyInfo = monkey.split("\n").map(v => v.trim());
    const monkeyObject : Monkey = {
      items: [],
      itemsInspected: 0,
      operation: [""],
      test: "",
    };
    monkeyObject.items = monkeyInfo[1].slice(16).split(',').map(v => parseInt(v.trim(), 10));
    monkeyObject.operation = [
      monkeyInfo[2].split(" ")[3],
      monkeyInfo[2].split(" ")[4],
      monkeyInfo[2].split(" ")[5]
    ];
    monkeyObject.test = monkeyInfo[3].split(" ")[3] + "," + monkeyInfo[4].split(" ")[5] + "," + monkeyInfo[5].split(" ")[5];
    monkeys.push(monkeyObject);
  });

  return monkeys;
}

export function findMonkeyBusiness(input : Monkey[], alwaysWorried: boolean, rounds: number) : number {
  let monkeyBusiness = 0;
  const monkeys = input;
  for (let i = 0; i < rounds * monkeys.length; i++) {
    const monkey = monkeys[i % monkeys.length];
    const monkeyItems = monkey.items;
    monkeyItems.forEach(item => {
      const firstOperand = monkey.operation[0] === "old" ? item : parseInt(monkey.operation[0], 10);
      const operation = monkey.operation[1];
      const secondOperand = monkey.operation[2] === "old" ? item : parseInt(monkey.operation[2], 10);
      let newValue = 0;
      monkey.itemsInspected += 1;

      if (operation === '+') {
        newValue = firstOperand + secondOperand;
      } else if (operation === '*') {
        newValue = firstOperand * secondOperand;
      }

      if (!alwaysWorried) {
        newValue = Math.floor(newValue / 3);
      }

      const monkeyTestArray = monkey.test.split(',').map(v => parseInt(v, 10));

      if (newValue % monkeyTestArray[0] === 0) {
        const receivingMonkey = monkeyTestArray[1];
        monkeys[receivingMonkey].items.push(newValue);
      } else {
        const receivingMonkey = monkeyTestArray[2];
        monkeys[receivingMonkey].items.push(newValue);
      }
    })
    monkey.items = [];
  }

  let max = 0;
  let secondMax = 0;
  monkeys.forEach(m => {
    if (m.itemsInspected > max) {
      secondMax = max;
      max = m.itemsInspected;
    } else if (m.itemsInspected > secondMax) {
      secondMax = m.itemsInspected;
    }
  })
  monkeyBusiness = max * secondMax;

  return monkeyBusiness;
} 

const input = await readTextFile("src/day11/input.txt");
let monkeys = createMonkeysObjects(input);
console.log("Solution for part 1 is", findMonkeyBusiness(monkeys, false, 20));
monkeys = createMonkeysObjects(input);
console.log("Solution for part 2 is", findMonkeyBusiness(monkeys, true, 10000));