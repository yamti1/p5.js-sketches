class Tracer2D {
    constructor(tracedObject, maxTraces, traceColor) {
        this.tracedObject = tracedObject;
        this.maxTraces = maxTraces;
        this.traceColor = traceColor;

        this.traces = [];
    }

    trace() {
        this.traces.push({
            x: this.tracedObject.x,
            y: this.tracedObject.y,
        });

        if (this.traces.length > this.maxTraces) {
            this.traces.shift();
        }
    }

    draw() {
        fill(100, 255, 255)
        this.traces.forEach(({x, y}) => {
            ellipse(x, y, 1);
        });
    }
}