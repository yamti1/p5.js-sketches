const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;
const ROWS = 80;
const COLUMNS = 100;

const SHIFT_FACTOR = 5;

const DEAD_CELL_COLOR = 50;
const LIVING_CELL_COLOR = 200;
const CELL_BORDER_COLOR = 80;
const CELL_BORDER_WIDTH = 1;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  toString() {
    return `${this.x},${this.y}`
  }

  static fromString(str) {
    const splitted = str.split(",");
    return new Cell(parseInt(splitted[0]), parseInt(splitted[1]));
  }
}

class GameOfLife {
  constructor() {
    this.world = new Set();  // Contains string representations of cells
  }

  makeAlive(cell) {
    if (this.isAlive(cell)) { return; }
    this.world.add(cell.toString());
  }

  makeDead(cell) {
    this.world.delete(cell.toString());
  }

  isAlive(cell) {
    return this.#isAliveStr(cell.toString());
  }

  #isAliveStr(cell_str) {
    return this.world.has(cell_str);
  }

  // returns: The current generation
  getWorld() {
    return [...this.world].map(cellStr => Cell.fromString(cellStr));
  }

  nextGeneration() {
    this.world = this.#calculateNextGeneration()
  }

  #calculateNextGeneration() {
    let nextGeneration = this.#getPotentiallyAliveCells(this.world);
    for (const cell of nextGeneration) {
      if (!this.#shouldLive(cell)) {
        nextGeneration.delete(cell);
      }
    }
    return nextGeneration
  }

  #getPotentiallyAliveCells() {
    let result = new Set(this.world);
    for (const cell of this.world) {
      for (const neighbour of this.#getNeighbours(cell)) {
        result.add(neighbour);
      }
    }
    return result;
  }

  // cell: A string representation of a cell
  // returns: True if the cell should live in the next generation, false otherwise.
  #shouldLive(cell) {
    const livingNeighboursCount = this.#countLivingCells(this.#getNeighbours(cell))
    
    if (livingNeighboursCount === 3) { return true; }
    if (livingNeighboursCount === 2 && this.#isAliveStr(cell)) { return true; }
    return false;
  }

  // cells: Array of cells to check
  // returns: Number of living cells
  #countLivingCells(cells) {
    return cells.filter(cell => this.#isAliveStr(cell)).length;
  }

  // cellStr: A string representation of a cell
  // returns: An Array of the string representations of the cell's neighbours
  #getNeighbours(cellStr) {
    const cell = Cell.fromString(cellStr);
    return [-1, 0, 1].map(dx => {
      return [-1, 0, 1].map(dy => {
        return new Cell(cell.x + dx, cell.y + dy).toString();
      });
    })
    .flat()
    .filter(c => c != cell);
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

    game.getWorld()
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
    return new Cell(
      Math.floor(x / this.cellWidth) + this.x,
      Math.floor(y / this.cellHeight) + this.y,
    );
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
  const cell = view.calculateCellFromPosition(x, y);
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
