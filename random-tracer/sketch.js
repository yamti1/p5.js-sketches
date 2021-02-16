const COLOR = {r: 255, g: 238, b: 51};

let random_mover = new RandomStarlikeMover(
	400,	// x
	400, 	// y
	150, 	// speed
	0, 		// direction
	0.5,	// randomness
	0.02, 	// archness
	COLOR,
	50,		// changeDirectionFrameInterval
);

let tracer = new Tracer2D(
	random_mover,
	100,
	COLOR,
)

function setup() {
	createCanvas(windowWidth, windowHeight);
	translate();
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