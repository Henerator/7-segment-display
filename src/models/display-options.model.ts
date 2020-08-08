import { Point } from "./point.model";
import { Size } from "./size.model";

export interface DisplayOptions {
    position: Point;
    segmentSize: Size;
    secondSegmentSize: Size;
    elementPadding: number;
    secondElementPadding: number;
}