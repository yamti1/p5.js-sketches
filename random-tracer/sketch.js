const COLOR = {r: 255, g: 238, b: 51};

let random_mover = new RandomStarlikeMover({
	x: 400,
	y: 400,
	speed: 150,
	direction: 0,
	randomness: 0.5,
	archness: 0.02,
	color: COLOR,
	changeDirectionFrameInterval: 50,
	width: 10,
});

let tracer = new Tracer2D(
	random_mover,
	{
		maxTraces: 100,
		color: COLOR,
		headWidth: 10, 
		widthChangeFactor: 0.6,
	}
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