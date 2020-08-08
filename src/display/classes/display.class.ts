import { DisplayOptions } from '../models';
import { ElementGroup } from './element-group.class';
import { Point } from '../../models';


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
            y: position.y +  elementHeight / 2 - secondElementHeight / 2,
        };

        this.groups = [
            new ElementGroup(hoursGroupPosition, segmentSize, elementPadding),
            new ElementGroup(minutesGroupPosition, segmentSize, elementPadding),
            new ElementGroup(secondsGroupPosition, secondSegmentSize, secondElementPadding),
        ];
    }

    draw(context: CanvasRenderingContext2D) {
        this.groups.forEach(group => {
            group.draw(context);
        });
    }

    setTime() {
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