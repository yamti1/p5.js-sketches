const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;
const ROWS = 80;
const COLUMNS = 100;

const SHIFT_FACTOR = 5;

const DEAD_CELL_COLOR = 50;
const LIVING_CELL_COLOR = 200;
const CELL_BORDER_COLOR = 80;
const CELL_BORDER_WIDTH = 1;



class GameOfLife {
  constructor() {
    this.world = [];
  }

  makeAlive(cell) {
    if (this.isAlive(cell)) { return; }
    this.world.push(cell);
  }

  makeDead(cell) {
    let index = this.world.findIndex(c => c.x === cell.x && c.y === cell.y);
    if (index === -1) { return; }
    this.world.splice(index, 1);
  }

  isAlive(cell) {
    return this.world.find(c => c.x === cell.x && c.y === cell.y) !== undefined;
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
    const livingNeighboursCount = this.#countLivingCells(this.#getNeighbours(cell))
    
    if (livingNeighboursCount === 3) { return true; }
    if (livingNeighboursCount === 2 && this.isAlive(cell)) { return true; }
    return false;
  }

  #countLivingCells(cells) {
    return cells.filter(cell => this.isAlive(cell)).length;
  }

  #getNeighbours(cell) {
    return [-1, 0, 1].map(dx => {
      return [-1, 0, 1].map(dy => {
        return {x: cell.x + dx, y: cell.y + dy};
      });
    })
    .flat()
    .filter(c => c.x !== cell.x || c.y !== cell.y);  
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
    this.width = width;
    this.height = height;
    this.cellWidth = width / columns;
    this.cellHeight = height / rows;
  }

  draw(game) {
    background(DEAD_CELL_COLOR);
    strokeWeight(CELL_BORDER_WIDTH);
    stroke(CELL_BORDER_COLOR);
    fill(LIVING_CELL_COLOR);

    for (let row = 1; row < this.rows; row++) {
      const y = row * this.cellHeight;
      line(0, y, this.width, y);
    }

    for (let column = 1; column < this.columns; column++) {
      const x = column * this.cellWidth;
      line(x, 0, x, this.height);
    }

    game.world
    .filter(cell => {
       return cell.x >= this.x && cell.x < this.x + this.columns &&
              cell.y >= this.y && cell.y < this.y + this.rows;
    })
    .forEach(cell => {
      rect(
        (cell.x - this.x) * this.cellWidth, 
        (cell.y - this.y) * this.cellHeight, 
        this.cellWidth, 
        this.cellHeight
      );
    });
  }

  calculateCellFromPosition(x, y) {
    return {
      x: Math.floor(x / this.cellWidth) + this.x,
      y: Math.floor(y / this.cellHeight) + this.y,
    };
  }

  shiftBy(dx, dy) {
    this.x += dx * SHIFT_FACTOR;
    this.y += dy * SHIFT_FACTOR;
  }
}


let view = new GridView(CANVAS_WIDTH, CANVAS_HEIGHT, ROWS, COLUMNS);
let game = new GameOfLife();
let running = false;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  
  view.draw(game);
  if (running) {
    game.nextGeneration();
  }
}

function togglePointedCell(x, y) {
  let cell = view.calculateCellFromPosition(x, y);
  if (game.isAlive(cell)) {
    game.makeDead(cell);
  } else {
    game.makeAlive(cell);
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    togglePointedCell(mouseX, mouseY);
  }
}

function mouseDragged() {
  if (mouseButton === LEFT) {
    togglePointedCell(mouseX, mouseY);
  }
}

function keyPressed() {
  switch (keyCode) {
    case ENTER:
      running = !running;
      break;
    case UP_ARROW:
      view.shiftBy(0, -1);
      break;
    case DOWN_ARROW:
      view.shiftBy(0, 1);
      break;
    case LEFT_ARROW:
      view.shiftBy(-1, 0);
      break;
    case RIGHT_ARROW:
      view.shiftBy(1, 0);
      break;
    default:
      break;
  }
}
