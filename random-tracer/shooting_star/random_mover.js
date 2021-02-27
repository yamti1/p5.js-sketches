class RandomMover {
	constructor(config) {
		this.x = config.x;
		this.y = config.y;
		this.speed = config.speed;
		this.direction = config.direction;
		this.randomness = config.randomness;
		this.color = config.color;
		this.width = config.width;

		this.directionChangeSubsribers = []

		console.debug(`RandomMover configured: 
            x: ${this.x}, 
			y: ${this.y},
			speed: ${this.speed},
			direction: ${this.direction},
			randomness: ${this.randomness},
			color: (${this.color.r}, ${this.color.g}, ${this.color.b}),
			width: ${this.width},
        `);
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
	}

	headTowards(targetPoint) {
		const directionVector = {
			x: targetPoint.x - this.x,
			y: targetPoint.y - this.y,
		}
		let direction = atan(directionVector.y / directionVector.x);
		if (directionVector.x < 0) { direction += PI; }

		this.direction = direction;
	}

	move() {
		// Assume constant frame rate because otherwise the movement would be effected by it which will cause glitches.
		const frameRate = 60;

		const dt = 1 / frameRate;
		if (isNaN(dt) || !isFinite(dt)) {
			console.warn(`Invalid dt: ${dt}`);
			return;
		}

		const dx = this.speed * dt * cos(this.direction);
		const dy = this.speed * dt * sin(this.direction);

		this.x += dx;
		this.y += dy;
	}

	draw() {
		noStroke();
		fill(this.color.r, this.color.g, this.color.b);
		ellipse(this.x, this.y, this.width);
	}
}
