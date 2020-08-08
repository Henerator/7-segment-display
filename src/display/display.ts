import { Point, DisplayOptions, SegmentState } from '../models';
import { ElementGroup } from './element-group';


export class Display {
    private groups: ElementGroup[] = [];

    constructor(private options: DisplayOptions) {
        this.updatePosition(this.options.position);
    }

    updatePosition(position: Point) {
        const { segmentSize, secondSegmentSize, elementPadding, secondElementPadding } = this.options;

        const elementWidth = segmentSize.width + segmentSize.height;
        const elementHeight = 2 * segmentSize.width + segmentSize.height;
        const elemengGroupWidth = 2 * elementWidth + elementPadding;

        const secondElementHeight = 2 * secondSegmentSize.width + secondSegmentSize.height;

        const hoursGroupPosition = <Point>{
            x: position.x - elemengGroupWidth - 1.5 * elementPadding,
            y: position.y,
        };

        const minutesGroupPosition = <Point>{
            x: position.x + 1.5 * elementPadding,
            y: position.y,
        };
        const secondsGroupPosition = <Point>{
            x: position.x + elemengGroupWidth + 4.5 * elementPadding,
            y: position.y + elementHeight / 2 - secondElementHeight / 2,
        };

        this.groups = [
            new ElementGroup(hoursGroupPosition, segmentSize, elementPadding),
            new ElementGroup(minutesGroupPosition, segmentSize, elementPadding),
            new ElementGroup(secondsGroupPosition, secondSegmentSize, secondElementPadding),
        ];
    }

    draw(context: CanvasRenderingContext2D) {
        this.groups.forEach(group => {
            group.elements.forEach(element => {
                const height = element.segmentSize.height;

                context.save();
                context.translate(element.position.x + height / 2, element.position.y + height / 2);

                const sortedSegments = element.segments.slice().sort((a, b) => a.state - b.state);
                sortedSegments.forEach(segment => {
                    context.save();

                    context.translate(segment.position.x, segment.position.y);
                    context.rotate(segment.angle);

                    if (segment.state === SegmentState.On) {
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
                    const points = segment.segmentPoints.slice();
                    const startPoint = <Point>points.shift();
                    context.moveTo(startPoint.x, startPoint.y);

                    while (points.length > 0) {
                        const nextPoint = <Point>points.shift();
                        context.lineTo(nextPoint.x, nextPoint.y);
                    }
                    context.fill();

                    context.restore();
                });

                context.restore();
            });
        });
    }

    update() {
        this.groups.forEach(group => group.turnOff());

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        this.groups[0].setValue(hours);
        this.groups[1].setValue(minutes);
        this.groups[2].setValue(seconds);
    }
}