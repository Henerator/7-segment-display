import { Display } from './display';
import { Point } from './models';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const context = <CanvasRenderingContext2D>canvas.getContext('2d');

let width: number;
let height: number;
let centerPoint: Point;

let display: Display;

window.addEventListener('resize', resizeCanvas, false);

function createDisplay() {
    display = new Display({
        position: centerPoint,
        segmentSize: { width: 100, height: 25 },
        secondSegmentSize: { width: 25, height: 6 },
        elementPadding: 20,
        secondElementPadding: 5,
    });
}

function update() {
    display.update();
}

function updateCanvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    centerPoint = {
        x: width / 2,
        y: height / 2,
    };
}

function resizeCanvas() {
    updateCanvasSize();
    display.updatePosition(centerPoint);
    update();
    draw();
}

function clear() {
    // context.fillStyle = '#222';
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
}

function drawDisplay() {
    display.draw(context);
}

function draw() {
    clear();
    drawDisplay();
}

function mainLoop() {
    update();
    draw();

    setTimeout(mainLoop, 1000);
}

updateCanvasSize();
createDisplay();

mainLoop();