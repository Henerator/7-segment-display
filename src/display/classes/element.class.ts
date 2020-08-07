import { Point, Size } from '../../helpers/geometric/models';
import { ElementSegment } from './element-segment.class';
import { ElementSegmentState } from '../models/element-segment-state.enum';


export class DisplayElement {
    private position: Point;
    private segmentSize: Size;
    private segments: ElementSegment[] = [];

    private states = [
        {
            value: 0,
            activeSegments: [0, 1, 2, 3, 4, 5],
        },
        {
            value: 1,
            activeSegments: [1, 2],
        },
        {
            value: 2,
            activeSegments: [0, 1, 3, 4, 6],
        },
        {
            value: 3,
            activeSegments: [0, 1, 2, 3, 6],
        },
        {
            value: 4,
            activeSegments: [1, 2, 5, 6],
        },
        {
            value: 5,
            activeSegments: [0, 2, 3, 5, 6],
        },
        {
            value: 6,
            activeSegments: [0, 2, 3, 4, 5, 6],
        },
        {
            value: 7,
            activeSegments: [0, 1, 2],
        },
        {
            value: 8,
            activeSegments: [0, 1, 2, 3, 4, 5, 6],
        },
        {
            value: 9,
            activeSegments: [0, 1, 2, 3, 5, 6],
        },
    ];

    get width(): number {
        return this.segmentSize.width + this.segmentSize.height;
    }

    constructor(position: Point, segmentSize: Size) {
        this.segmentSize = segmentSize;

        const width = segmentSize.width;
        this.position = {
            x: position.x,
            y: position.y - segmentSize.width - segmentSize.height / 2,
        };

        this.segments = [
            new ElementSegment({ x: 0, y: 0 }, segmentSize, 0),
            new ElementSegment({ x: width, y: 0 }, segmentSize, Math.PI / 2),
            new ElementSegment({ x: width, y: width }, segmentSize, Math.PI / 2),
            new ElementSegment({ x: 0, y: 2 * width }, segmentSize, 0),
            new ElementSegment({ x: 0, y: width }, segmentSize, Math.PI / 2),
            new ElementSegment({ x: 0, y: 0 }, segmentSize, Math.PI / 2),
            new ElementSegment({ x: 0, y: width }, segmentSize, 0),
        ];
    }

    draw(context: CanvasRenderingContext2D) {
        const height = this.segmentSize.height;

        context.save();
        context.translate(this.position.x + height / 2, this.position.y + height / 2);

        const sortedSegments = this.segments.slice().sort((a, b) => {
            return (a.state < b.state)
                ? -1
                : 1;
        });

        sortedSegments.forEach(segment => {
            segment.draw(context);
        });

        context.restore();
    }

    setValue(value: number) {
        this.turnOff();

        const state = this.states.find(st => st.value === value)
            || this.states[0];
        state.activeSegments.forEach(index => {
            this.segments[index].state = ElementSegmentState.On;
        });
    }

    turnOff() {
        this.segments.forEach(segment => segment.state = ElementSegmentState.Off);
    }
}