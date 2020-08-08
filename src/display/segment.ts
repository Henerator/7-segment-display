import { Point, Size, SegmentState } from '../models';

export class Segment {
    segmentPoints: Point[] = [];

    constructor(
        public position: Point,
        public size: Size,
        public angle: number,
        public state: SegmentState = SegmentState.Off
    ) {
        this.generateSegmentPoints(size);
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