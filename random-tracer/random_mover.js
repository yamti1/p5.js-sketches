class RandomMover {
	constructor(x, y, speed, direction, randomness) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.direction = direction;
		this.randomness = randomness;

		this.directionChangeSubsribers = []
	}

	shouldChangeDirection() {
		return true;
	}

	subscribeDirectionChange(callback) {
		this.directionChangeSubsribers.push(callback);
	}

	changeDirectionRandomly() {
		let directionChange = random(-this.randomness, this.randomness);
		this.direction += directionChange;

		this.directionChangeSubsribers.forEach(
			(callback) => {callback()}
		);
	}

	move() {
		let dt = 1 / frameRate();
		if (isNaN(dt) || !isFinite(dt)) {
			console.warn(`Invalid dt: ${dt}`);
			return;
		}

		let dx = this.speed * dt * cos(this.direction);
		let dy = this.speed * dt * sin(this.direction);

		this.x += dx;
		this.y += dy;
	}

	draw() {
		noStroke();
		fill(255, 238, 51);
		ellipse(this.x, this.y, 10);
	}
}
