let random_mover = new RandomMover(
	200,	// x
	200, 	// y
	50, 	// speed
	0, 		// direction
	0.5,	// randomness
);

let tracer = new Tracer2D(
	random_mover,
	100,
	0,
)

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);

	random_mover.changeDirectionRandomly();
	random_mover.move();
	tracer.trace();

	random_mover.draw();
	tracer.draw();
}