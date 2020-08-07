import { Point, Size } from '../../helpers/geometric/models';
import { ElementSegmentState } from '../models';


export class ElementSegment {
    private segmentPoints: Point[] = [];

    constructor(
        public position: Point,
        public size: Size,
        public angle: number,
        public state: ElementSegmentState = ElementSegmentState.Off
    ) {
        this.generateSegmentPoints(size);
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();

        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);

        if (this.state === ElementSegmentState.On) {
            context.shadowColor = '#fff';
            context.shadowBlur = 12;
            context.fillStyle = '#eee';
        } else {
            context.fillStyle = '#373737';
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