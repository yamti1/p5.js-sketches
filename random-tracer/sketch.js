let mover = new RandomMover(
	200,	// x
	200, 	// y
	50, 	// speed
	0, 		// direction
	0.5,	// randomness
);

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	mover.draw();
}