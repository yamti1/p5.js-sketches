class Tracer2D {
    constructor(tracedObject, maxTraces, color) {
        this.tracedObject = tracedObject;
        this.maxTraces = maxTraces;
        this.color = color;

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
        stroke(this.color.r, this.color.g, this.color.b);
        noFill();

        this._drawCurves();
    }
}