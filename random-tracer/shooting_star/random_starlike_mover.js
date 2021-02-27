class RandomStarlikeMover extends RandomMover {
    constructor(config) {
        super(config);
        this.archness = config.archness;
        this.changeDirectionFrameInterval = config.changeDirectionFrameInterval;
        this.changeDirectionFrameIntervalFactorRange = config.changeDirectionFrameIntervalFactorRange;
        
        console.debug(`RandomStarlikeMover configured:
            archness: ${this.archness}, 
            changeDirectionFrameInterval: ${this.changeDirectionFrameInterval},
            changeDirectionFrameIntervalFactorRange: ${this.changeDirectionFrameIntervalFactorRange},
        `);

        this.frameInterval = 1;
    }

    shouldChangeDirection() {
        return frameCount % this.frameInterval == 0;
    }

    changeDirectionRandomly() {
        const directionChange = PI + random(this.randomness * 0.25, this.randomness * 2);
        this.direction += directionChange;

        // Refresh the frame interval to the next direction change
        this.frameInterval = this.getFrameInterval();
    }

    getFrameInterval() {
        const minFactor = this.changeDirectionFrameIntervalFactorRange.min;
        const maxFactor = this.changeDirectionFrameIntervalFactorRange.max;
        const frameInterval = int(this.changeDirectionFrameInterval * random(minFactor, maxFactor));
        return frameInterval;
    }

    move() {
        this.direction += this.archness;
        super.move();
    }
}