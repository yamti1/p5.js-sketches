let random_mover = new RandomStarlikeMover(
	200,	// x
	200, 	// y
	100, 	// speed
	0, 		// direction
	0.5,	// randomness
	0.01, 	// archness
	100,	// changeDirectionFrameInterval
);

let tracer = new Tracer2D(
	random_mover,
	1000,
	0,
)

function setup() {
	createCanvas(windowWidth, windowHeight);
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