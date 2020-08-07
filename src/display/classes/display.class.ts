import { DisplayOptions } from '../models';
import { DisplayElementGroup } from './display-element-group.class';
import { Point } from '../../helpers/geometric/models';


export class Display {
    private groups: DisplayElementGroup[];

    constructor(options: DisplayOptions) {
        const position = options.position;

        const segmentSize = options.segmentSize;
        const secondSegmentSize = options.secondSegmentSize;

        const elementWidth = options.segmentSize.width + options.segmentSize.height;
        const elementHeight = 2 * options.segmentSize.width + options.segmentSize.height;
        const elementPadding = options.elementPadding;
        const elemengGroupWidth = 2 * elementWidth + elementPadding;

        const secondElementHeight = 2 * options.secondSegmentSize.width + options.secondSegmentSize.height;
        const secondElementPadding = options.secondElementPadding;

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
            new DisplayElementGroup(hoursGroupPosition, segmentSize, elementPadding),
            new DisplayElementGroup(minutesGroupPosition, segmentSize, elementPadding),
            new DisplayElementGroup(secondsGroupPosition, secondSegmentSize, secondElementPadding),
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