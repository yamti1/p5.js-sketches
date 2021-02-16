class RandomStarlikeMover extends RandomMover {
    constructor(x, y, speed, direction, randomness, archness, color, changeDirectionFrameInterval) {
        super(x, y, speed, direction, randomness, color);
        this.archness = archness;
        this.changeDirectionFrameInterval = changeDirectionFrameInterval;
    }

    shouldChangeDirection() {
        return frameCount % this.changeDirectionFrameInterval == 0;
    }

    changeDirectionRandomly() {
        let directionChange = PI + random(this.randomness * 0.25, this.randomness * 2);
        this.direction += directionChange;
    }

    move() {
        this.direction += this.archness;
        super.move();
    }
}