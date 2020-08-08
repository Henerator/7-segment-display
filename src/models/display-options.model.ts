import { Point } from "./point.model";
import { Size } from "./size.model";
import { DisplayTheme } from "./display-theme";

export interface DisplayOptions {
    position: Point;
    segmentSize: Size;
    secondSegmentSize: Size;
    elementPadding: number;
    secondElementPadding: number;
    theme: DisplayTheme;
}