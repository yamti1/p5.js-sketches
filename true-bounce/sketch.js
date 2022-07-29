class Bouncer {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;

		this.vy = 0;
		this.ay = 100;
	}

	update(dt) {
		this.y += this.vy * dt + 0.5 * this.ay * dt * dt;
		this.vy += this.ay * dt;

		if (this.y + this.r >= windowHeight) {
			let overshotY = (this.y + this.r) - windowHeight;
			let collisionTime =  
		}

		// console.debug(`vy=${this.vy}`);
		if (this.vy <= 0.01 && this.vy >= -0.01) {
			console.debug(`Bouncer reached top at y=${this.y}`);
		}
	}

	draw() {
		noFill();
		stroke(255);
		strokeWeight(3);
		ellipse(this.x, this.y, this.r, this.r);
	}
}


let bouncer = new Bouncer(100, 100, 30);

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	bouncer.update(1/60);
	bouncer.draw();
}
