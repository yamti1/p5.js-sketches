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
        let width = this.headWidth;

        for (let i = this.traces.length-1; i > 0; i--) {
            const trace = this.traces[i];
            const nextTrace = this.traces[i-1];

            beginShape();
            strokeWeight(width);
            curveVertex(trace.x, trace.y);
            curveVertex(trace.x, trace.y);
            curveVertex(nextTrace.x, nextTrace.y);
            curveVertex(nextTrace.x, nextTrace.y);
            endShape();
            width *= this.widthChangeFactor;
        }
    }

    draw() {
        stroke(this.color.r, this.color.g, this.color.b);
        noFill();
        this._drawCurves();
    }
}