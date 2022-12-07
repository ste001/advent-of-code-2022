import { readLinesIntoStringArray } from "../../utils/io.ts";

export function createListDirectories(input: string[]) : Map<string, number> {
  const directoryList = new Map();
  let path = "";
  input.forEach((cmd) => {
    if (cmd[0] === "$") {
      const cmdSplit = cmd.split(" ");
      if (cmdSplit[1] === "cd" && cmdSplit[2] === "/") {
        path += ""
      } else if (cmdSplit[1] === "cd" && cmdSplit[2] !== "..") {
        path += `/${cmdSplit[2]}`;
      } else if (cmdSplit[1] === "cd" && cmdSplit[2] === "..") {
        path = path.substring(0, path.lastIndexOf("/"));
      }
    } else {
      const cmdSplit = cmd.split(" ");
      if (cmdSplit[0] === "dir") {
        if (!directoryList.has(`${path}/${cmdSplit[1]}`)) {
          directoryList.set(`${path}/${cmdSplit[1]}`, 0)
        }
      } else {
        const pathSplit = path.split("/").filter(i => i);
        let relativePath = "";
        if (pathSplit.length > 0) {
          pathSplit.forEach(p => {
            directoryList.set(relativePath + "/" + p, directoryList.get(relativePath + "/" + p) + parseInt(cmdSplit[0], 10));
            relativePath += "/" + p;
          });
        }
      }
    }
  })
  return directoryList;
}

export function findSumOfSmallDirectories(directoryList: Map<string, number>) : number {
  let sum = 0;
  directoryList.forEach((size, name) => {
    if (size <= 100000) {
      sum += size;
    }
  })
  return sum;
}

// export function smallestDirectorySizeToDelete(directoryList: Map<string, number>) : number {
//   let totalSpaceAvailable = 70000000;
//   let spaceToFreeUp = 30000000;
//   let spaceUsed = 0;
//   directoryList.forEach((size, name) => {
//     spaceUsed += size;
//   })
//   let spaceDiff = totalSpaceAvailable - spaceUsed;
// }

const input = await readLinesIntoStringArray("src/day7/input.txt");
const dirList = createListDirectories(input);
console.log("Solution of part 1 is", findSumOfSmallDirectories(dirList));
// console.log("Solution of part 2 is", smallestDirectorySizeToDelete(dirList));