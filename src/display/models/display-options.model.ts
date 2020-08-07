import { Point, Size } from '../../helpers/geometric/models';

export interface DisplayOptions {
    position: Point;
    segmentSize: Size;
    secondSegmentSize: Size;
    elementPadding: number;
    secondElementPadding: number;
}