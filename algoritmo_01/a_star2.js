class Node {
  constructor(parent = null, position = null) {
    this.parent = parent;
    this.position = position;

    this.g = 0;
    this.h = 0;
    this.f = 0;
  }

  isEqual(other) {
    return this.position[0] === other.position[0] && this.position[1] === other.position[1];
  }
}

function aStar(grid, start, end) {
  const startNode = new Node(null, start);
  const endNode = new Node(null, end);

  const openSet = new Map();
  const closedSet = new Set();

  openSet.set(startNode.position.toString(), startNode);

  while (openSet.size > 0) {
    let current = null;
    let currentF = Infinity;

    for (const [key, node] of openSet) {
      if (node.f < currentF) {
        current = node;
        currentF = node.f;
      }
    }

    openSet.delete(current.position.toString());
    closedSet.add(current.position.toString());

    if (current.isEqual(endNode)) {
      const path = [];
      let temp = current;
      while (temp !== null) {
        path.push(temp.position);
        temp = temp.parent;
      }
      return { path: path.reverse(), expandedNodes: closedSet.size };
    }

    const adjacent = [[0, -1], [0, 1], [-1, 0], [1, 0]];

    for (const dir of adjacent) {
      const nodePosition = [current.position[0] + dir[0], current.position[1] + dir[1]];

      if (
        nodePosition[0] < 0 ||
        nodePosition[0] >= grid.length ||
        nodePosition[1] < 0 ||
        nodePosition[1] >= grid[0].length ||
        grid[nodePosition[0]][nodePosition[1]] !== 0 ||
        closedSet.has(nodePosition.toString())
      ) {
        continue;
      }

      const newNode = new Node(current, nodePosition);
      newNode.g = current.g + 1;
      newNode.h = Math.pow((newNode.position[0] - endNode.position[0]), 6) + Math.pow((newNode.position[1] - endNode.position[1]), 6);
      newNode.f = newNode.g + newNode.h;

      if (!openSet.has(newNode.position.toString()) || newNode.g < openSet.get(newNode.position.toString()).g) {
        openSet.set(newNode.position.toString(), newNode);
      }
    }
  }
  return { path: [], expandedNodes: closedSet.size };
}


let start_time = Date.now();

let grid = [
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,0,0,0],
  [0,0,0,0,0,1,1,1,1,0,0,0],
  [0,0,0,0,0,1,1,1,1,0,0,0],
  [0,0,0,0,0,1,1,1,1,0,0,0],
  [0,0,0,0,0,1,1,1,1,0,0,0],
  [0,0,0,0,0,1,1,1,1,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,0,0,0,0],
  [0,0,0,0,1,1,1,1,0,0,0,0],
  [0,0,0,0,1,1,1,1,0,0,0,0],
  [0,0,0,0,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0]
];

let start = [0, 0];
let end = [16, 5];

let result = aStar(grid, start, end);

let end_time = Date.now();
let processing_time = (end_time - start_time) / 1000; // Converte milissegundos para segundos

console.log(result.path); // Imprime o caminho
console.log(`Tempo: ${processing_time}s`);
console.log(`Expandidos: ${result.expandedNodes}`);
console.log(`Distância: ${result.path.length}`);
