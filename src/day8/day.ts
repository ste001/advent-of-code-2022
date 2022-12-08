import { readLinesIntoStringArray } from "../../utils/io.ts";

export function createGrid(input: string[]) : number[][] {
  const grid : number[][] = [];
  input.forEach(line => {
    grid.push(line.split("").map(v => parseInt(v, 10)))
  })
  return grid;
}

export function isVisibleFromDirection(direction: number, x: number, y: number, treeHeight: number, grid: number[][]) : boolean {
  if (direction === 0) {
    for (let i = x - 1; i >= 0; i--) {
      if (grid[i][y] >= treeHeight) {
        return false;
      }
    }
    return true;
  } else if (direction === 1) {
    for (let i = y + 1; i < grid.length; i++) {
      if (grid[x][i] >= treeHeight) {
        return false;
      }
    }
    return true;
  } else if (direction === 2) {
    for (let i = x + 1; i < grid.length; i++) {
      if (grid[i][y] >= treeHeight) {
        return false;
      }
    }
    return true;
  } else if (direction === 3) {
    for (let i = y - 1; i >= 0; i--) {
      if (grid[x][i] >= treeHeight) {
        return false;
      }
    }
    return true;
  }
  return true;
}

export function isTreeVisible(x: number, y: number, grid: number[][]) : boolean {
  if (x === 0 || y == 0 || x === grid.length - 1 || y === grid.length - 1) {
    return true;
  }
  const treeHeight = grid[x][y];
  // direction: 0 - north, 1 - east, 2 - south, 3 - west
  for (let direction = 0; direction < 4; direction++) {
    if (isVisibleFromDirection(direction, x, y, treeHeight, grid)) {
      return true;
    }
  }
  return false;
}

export function findVisibleTrees(input: string[]) : number {
  const grid = createGrid(input);
  let numberOfVisibleTrees = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (isTreeVisible(i, j, grid)) {
        numberOfVisibleTrees += 1;
      }
    }
  }
  return numberOfVisibleTrees;
}

export function findDirectionScenicScore(x: number, y: number, grid: number[][], treeHeight: number, direction: number) : number {
  let score = 0;
  if (direction === 0) {
    for (let i = x - 1; i >= 0; i--) {
      if (grid[i][y] < treeHeight) {
        score += 1;
      } else {
        return score += 1;
      }
    }
    return score;
  } else if (direction === 1) {
    for (let i = y + 1; i < grid.length; i++) {
      if (grid[x][i] < treeHeight) {
        score += 1;
      } else {
        return score += 1;
      }
    }
    return score;
  } else if (direction === 2) {
    for (let i = x + 1; i < grid.length; i++) {
      if (grid[i][y] < treeHeight) {
        score += 1;
      } else {
        return score += 1;
      }
    }
    return score;
  } else if (direction === 3) {
    for (let i = y - 1; i >= 0; i--) {
      if (grid[x][i] < treeHeight) {
        score += 1;
      } else {
        return score += 1;
      }
    }
    return score;
  }
  return score;
}

export function findScenicScore(x: number, y: number, grid: number[][]) : number {
  if (x === 0 || y == 0 || x === grid.length - 1 || y === grid.length - 1) {
    return 0;
  }
  const treeHeight = grid[x][y];
  let scenicScore = 1;
  for (let direction = 0; direction < 4; direction++) {
    scenicScore *= findDirectionScenicScore(x, y, grid, treeHeight, direction);
  }
  return scenicScore;
}

export function findTopScenicScore(input: string[]) : number {
  const grid = createGrid(input);
  let topScenicScore = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const scenicScore = findScenicScore(i, j, grid);
      if (scenicScore > topScenicScore) {
        topScenicScore = scenicScore;
      }
    }
  }
  return topScenicScore;
}

const input = await readLinesIntoStringArray("src/day8/input.txt");
console.log("Solution for part 1 is", findVisibleTrees(input));
console.log("Solution for part 2 is", findTopScenicScore(input));