const CURVE_END = "Curve End"

class Tracer2D {
    constructor(tracedObject, maxTraces, traceColor) {
        this.tracedObject = tracedObject;
        this.maxTraces = maxTraces;
        this.traceColor = traceColor;

        this.tracedObject.subscribeDirectionChange(this.tracedObjectChangedDirectionCallback);

        this.traces = [];
    }

    trace(directionChanged) {
        this.traces.push({
            x: this.tracedObject.x,
            y: this.tracedObject.y,
            directionChanged: directionChanged,
        });

        if (this.traces.length > this.maxTraces) {
            this.traces.shift();
        }
    }

    tracedObjectChangedDirectionCallback() {
        this.traces.push(CURVE_END);
    }

    _getVertexFactories() {
        let factories = []
        for (let i = 0; i < this.traces.length; i++) {
            const trace = this.traces[i];
            if (trace !== CURVE_END) {
                factories.push(() => {
                    curveVertex(trace.x, trace.y);
                    if (i === 0 || i === this.traces.length - 1) {
                        curveVertex(trace.x, trace.y);
                    }
                });
                continue;
            }
            if (i-1 >= 0) {
                const prevTrace = this.traces[i-1];
                if (prevTrace === CURVE_END) {
                    throw Error("Found two CURVE_ENDs in a row. This is probably due to misuse of the class.");
                }
                factories.push(() => {
                    endShape();
                    curveVertex(prevTrace.x, prevTrace.y);
                });
            }
            if (i+1 < this.traces.length) {
                const nextTrace = this.traces[i+1];
                if (nextTrace === CURVE_END) {
                    throw Error("Found two CURVE_ENDs in a row. This is probably due to misuse of the class.");
                }
                factories.push(() => {
                    beginShape();
                    curveVertex(nextTrace.x, nextTrace.y);
                });
            }
        }

        return factories;
    }

    draw() {
        stroke(100, 255, 255);
        noFill();

        const vertexFactories = this._getVertexFactories();

        beginShape();
        vertexFactories.forEach((vertexFactory) => { vertexFactory(); });
        endShape();
    }
}