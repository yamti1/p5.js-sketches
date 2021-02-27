const STAR_COUNT = 2;

let shootingStars = [];

function createShootingStar(x, y) {
	return new ShootingStar({
		x: x != undefined ? x : windowWidth / 2,
		y: y != undefined ? y : windowHeight / 2,
		speed: 400,
		direction: 0,
		randomness: 0.5,
		archness: 0.02,
		color: { r: 255, g: 255, b: 220 },
		changeDirectionFrameInterval: 20,
		changeDirectionFrameIntervalFactorRange: { min: 0.75, max: 1 },
		width: 10,
		maxTraces: 75,
		tailStartWidth: 9,
		tailWidthChangeFactor: 0.875,
	})
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	for (let i = 0; i < STAR_COUNT; i++) {
		shootingStars.push(createShootingStar());
	}
}

function draw() {
	background(0);
	const mouse = {
		pressed: mouseIsPressed,
		button: mouseButton,
		x: mouseX,
		y: mouseY,
	};

	shootingStars.forEach(star => {
		star.move(mouse);
		star.draw();
	});
}

function doubleClicked() {
	const shootingStar = createShootingStar(mouseX, mouseY);
	shootingStars.push(shootingStar);
}
