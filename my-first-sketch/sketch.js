const COLOR = (100, 200, 200);

class Circle
{
	constructor(x, y, r, R, speed) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.R = R;
		this.speed = speed;
	}

	draw(t) {
		this.x += sin(t / this.speed) * this.R;
		// this.y += 1;
		this.y += cos(t / this.speed) * this.R;
		fill(100, 200, 200);
		ellipse(this.x, this.y, this.r*2);
	}
}

let c1 = new Circle(200, 200, 12, 10, 10);
let c2 = new Circle(250, 250, 12, 10, 10);

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	clear();
	c1.draw(frameCount);
	c2.draw(frameCount);

}