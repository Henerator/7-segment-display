import { Point, Size } from '../../models';

export interface DisplayOptions {
    position: Point;
    segmentSize: Size;
    secondSegmentSize: Size;
    elementPadding: number;
    secondElementPadding: number;
}