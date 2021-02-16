class Tracer2D {
    constructor(tracedObject, config) {
        this.tracedObject = tracedObject;
        this.maxTraces = config.maxTraces;
        this.color = config.color;
        this.headWidth = config.headWidth;
        this.widthChangeFactor = config.widthChangeFactor;

        this.traces = [];

        console.debug(`Tracer2D configured: 
            tracedObject: ${this.tracedObject},
            maxTraces: ${this.maxTraces},
            color: (${this.color.r}, ${this.color.g}, ${this.color.b}),
            headWidth: ${this.headWidth},
            widthChangeFactor: ${this.widthChangeFactor},
        `);
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

    _drawCurves() {
        beginShape();
        this.traces.forEach(trace => {
            curveVertex(trace.x, trace.y);
        });
        endShape();
    }

    draw() {
        stroke(this.color.r, this.color.g, this.color.b);
        noFill();
        this._drawCurves();
    }
}