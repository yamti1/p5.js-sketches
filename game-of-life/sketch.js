class GameOfLife {
  constructor() {
    this.world = [];
  }

  makeAlive(cell) {
    if (this.isAlive(cell)) { return; }
    this.world.push(cell);
  }

  isAlive(cell) {
    return this.world.find(c => c.x === cell.x && c.y === cell.y);
  }

  nextGeneration() {
    this.world = this.#calculateNextGeneration()
  }

  #calculateNextGeneration() {
    return this.#getPotentialAliveCells(this.world)
      .filter(cell => this.#shouldLive(cell));
  }

  #getPotentialAliveCells() {
    return this.#uniqueCells(
        this.world
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

  #uniqueCells(cells) {
    return cells.filter(
      (cell, i) => i === cells.findLastIndex(
        c => c.x === cell.x && c.y === cell.y
      )
    );
  }
}


class GridView {
  constructor(width, height, rows, columns) {
    this.x = 0;
    this.y = 0;
    this.rows = rows;
    this.columns = columns;
    this.cellWidth = width / columns;
    this.cellHeight = height / rows;
  }

  draw(game) {
    strokeWeight(1);
    stroke(80);
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let isHighlighted = game.isAlive({x: this.x + column, y: this.y + row});
        fill(isHighlighted ? 200 : 50);
        rect(
          column * this.cellWidth, 
          row * this.cellHeight, 
          this.cellWidth, 
          this.cellHeight
        );
      }
    }
  }
}


let view = new GridView(400, 400, 50, 50);
let game = new GameOfLife();

function setup() {
  createCanvas(400, 400);
  game.makeAlive({x: 10, y: 10});
}

function draw() {
  background(220);
  view.draw(game);
}
