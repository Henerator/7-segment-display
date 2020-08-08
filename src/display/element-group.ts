import { Size, Point } from '../models';
import { DisplayElement } from './element';

export class ElementGroup {
    elements: DisplayElement[];

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