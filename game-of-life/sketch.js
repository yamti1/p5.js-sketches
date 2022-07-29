class GameOfLife {
  constructor() {
    this.world = new Set();
  }

  nextGeneration() {
    this.world = this.#calculateNextGeneration()
  }

  #calculateNextGeneration() {
    return new Set (
      Array.from(this.#getPotentialAliveCells(this.world))
      .filter(cell => this.#shouldLive(cell))
    );
  }

  #getPotentialAliveCells() {
    return new Set(
        Array.from(this.world)
        .map(cell => this.#getNeighbours(cell))
        .flat()
        .concat(this.world)
      );
  }

  #shouldLive(cell) {
    let livingNeighboursCount = this.#countLivingCells(this.#getNeighbours(cell))
    let isCellAlive = this.#countLivingCells([cell]) === 1;
    
    if (livingNeighboursCount === 3) { return true; }
    if (livingNeighboursCount === 2 && isCellAlive) { return true; }
    return false;
  }

  #countLivingCells(cells) {
    return cells.reduce(cell => this.world.has(cell) ? 1 : 0);
  }

  #getNeighbours(cell) {
    return [-1, 0, 1].map(dx => {
      [-1, 0, 1].map(dy => {
        return {x: cell.x + dx, y: cell.y + dy};
      })
    }).filter(c => c != cell);  
  } 
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
