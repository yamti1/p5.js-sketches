class RandomStarlikeMover extends RandomMover {
    constructor(config) {
        super(config);
        this.archness = config.archness;
        this.changeDirectionFrameInterval = config.changeDirectionFrameInterval;
        
        console.log(`RandomStarlikeMover configured:
            archness: ${this.archness}, 
            changeDirectionFrameInterval: ${this.changeDirectionFrameInterval},
        `);
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