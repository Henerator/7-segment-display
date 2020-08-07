import { Size, Point } from '../../helpers/geometric';
import { DisplayElement } from './index';

export class DisplayElementGroup {
    private elements: DisplayElement[];

    constructor(position: Point, segmentSize: Size, elementPadding: number) {

        const firstElement = new DisplayElement(position, segmentSize);
        const secondElement = new DisplayElement({
            x: position.x + firstElement.width + elementPadding,
            y: position.y,
        }, segmentSize);

        this.elements = [
            firstElement, 
            secondElement,
        ];
    }

    draw(context: CanvasRenderingContext2D) {
        this.elements.forEach(element => {
            element.draw(context);
        });
    }

    turnOff() {
        this.elements.forEach(element => element.turnOff());
    }

    setValue(value: number) {
        const digits = this.getValueDigits(value);

        this.elements.forEach((element, index) => {
            element.setValue(digits[index] || 0);
        });
    }

    private getValueDigits(value: number): number[] {
        return `0${value}`.slice(-2)
            .split('')
            .map(digit => Number.parseInt(digit));
    }
}