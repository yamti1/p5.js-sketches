const COLOR = {r: 255, g: 255, b: 220};

let random_mover = new RandomStarlikeMover({
	// x and y are initialized in setup()
	speed: 200,
	direction: 0,
	randomness: 0.5,
	archness: 0.02,
	color: COLOR,
	changeDirectionFrameInterval: 35,
	width: 10,
});

let tracer = new Tracer2D(
	random_mover,
	{
		maxTraces: 75,
		color: COLOR,
		headWidth: 9, 
		widthChangeFactor: 0.875,
	}
)

function setup() {
	createCanvas(windowWidth, windowHeight);
	random_mover.x = windowWidth / 2;
	random_mover.y = windowHeight / 2;
}

function draw() {
	background(0);

	if (random_mover.shouldChangeDirection()) {
		random_mover.changeDirectionRandomly();
	}
	random_mover.move();
	tracer.trace();

	random_mover.draw();
	tracer.draw();
}