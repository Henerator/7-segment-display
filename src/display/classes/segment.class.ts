import { Point, Size } from '../../models';
import { SegmentState } from '../models';


export class Segment {
    private segmentPoints: Point[] = [];

    constructor(
        public position: Point,
        public size: Size,
        public angle: number,
        public state: SegmentState = SegmentState.Off
    ) {
        this.generateSegmentPoints(size);
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();

        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);

        if (this.state === SegmentState.On) {
            context.shadowColor = '#000';
            context.shadowBlur = 12;
            context.fillStyle = '#222';
            // context.shadowColor = '#fff';
            // context.shadowBlur = 3;
            // context.fillStyle = '#eee';
        } else {
            // context.fillStyle = '#262626';
            context.fillStyle = '#e6e6e6';
        }

        context.beginPath();
        const points = this.segmentPoints.slice();
        const startPoint = <Point>points.shift();
        context.moveTo(startPoint.x, startPoint.y);

        while (points.length > 0) {
            const nextPoint = <Point>points.shift();
            context.lineTo(nextPoint.x, nextPoint.y);
        }
        context.fill();

        context.restore();
    }

    private generateSegmentPoints(segmentSize: Size) {
        const width = segmentSize.width;
        const height = segmentSize.height;

        this.segmentPoints = [
            { x: 0, y: 0 },
            { x: height / 2, y: -height / 2 },
            { x: width - height / 2, y: -height / 2 },
            { x: width, y: 0 },
            { x: width - height / 2, y: height / 2 },
            { x: height / 2, y: height / 2 },
            { x: 0, y: 0 },
        ];
    }
}