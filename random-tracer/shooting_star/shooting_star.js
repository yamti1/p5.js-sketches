class ShootingStar {
    constructor(config) {
        this.random_mover = new RandomStarlikeMover({
            x: config.x,
            y: config.y,
            speed: config.speed,
            direction: config.direction,
            randomness: config.randomness,
            archness: config.archness,
            color: config.color,
            changeDirectionFrameInterval: config.changeDirectionFrameInterval,
            changeDirectionFrameIntervalFactorRange: config.changeDirectionFrameIntervalFactorRange,
            width: config.width,
        });
        this.tracer = new Tracer2D(
            this.random_mover,
            {
                maxTraces: config.maxTraces,
                color: config.color,
                headWidth: config.tailStartWidth,
                widthChangeFactor: config.tailWidthChangeFactor,
            }
        );
    }

    move(mouse) {
        if (mouse.pressed && mouse.button === LEFT) {
            this.random_mover.headTowards(mouse);
        }
        else if (this.random_mover.shouldChangeDirection()) {
            this.random_mover.changeDirectionRandomly();
        }

        this.random_mover.move();
        this.tracer.trace();
    }

    draw() {
        this.random_mover.draw();
        this.tracer.draw();
    }
}