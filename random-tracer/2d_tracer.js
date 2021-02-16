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

    _drawCurves() {
        beginShape();
        this.traces.forEach(trace => {
            curveVertex(trace.x, trace.y);
        });
        endShape();
    }

    draw() {
        stroke(100, 255, 255);
        noFill();

        this._drawCurves();
    }
}